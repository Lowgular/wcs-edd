#!/usr/bin/env node
/**
 * qmd-context — the context-engineering pre-step (CLI, no MCP).
 *
 * For each task prompt, asks qmd which wiki partials are relevant, then bakes ONLY those
 * partials' bodies into a generated copy of the prompt. WCS then runs its normal single-shot
 * structured generation over the generated prompt with NO tools — sidestepping the
 * "function calling + application/json output is unsupported" wall on the ai-sdk+Google path.
 *
 * Split of responsibilities:
 *   - qmd        = the SELECTOR (semantic ranking of partials for the task)
 *   - wiki/*.md  = the CONTENT (bodies read straight from disk, frontmatter stripped)
 *
 * Usage:
 *   node scripts/qmd-context.mjs [task.md ...] [--top 3] [--min 0.4] [--mode query|search] [--out tasks/generated]
 *   (no task args → processes every tasks/*.md)
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, basename } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, '..');
const WIKI = join(REPO, 'wiki');
const INDEX = join(REPO, '.qmd', 'index.sqlite'); // pin the index regardless of cwd

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const TOP = parseInt(opt('--top', '3'), 10);
const MIN = parseFloat(opt('--min', '0.4'));
const MODE = opt('--mode', 'query'); // 'query' = semantic+rerank (best), 'search' = BM25 (fast/deterministic)
const OUT = resolve(REPO, opt('--out', 'tasks/generated'));
// Universal HOW that every Angular component task needs but rarely *mentions* — so pure
// semantic retrieval misses it (e.g. nobody writes "change detection" in a task). Always
// injected as a base layer; qmd adds the task-specific partials on top. `--base ''` disables.
const BASE = opt('--base', 'project-setup,components').split(',').map((s) => s.trim()).filter(Boolean);
// Meta files in the collection that are not guidance and must never be served as context.
const EXCLUDE = new Set(['index']);

const taskArgs = args.filter((a) => a.endsWith('.md'));
const TASKS = taskArgs.length
  ? taskArgs.map((t) => resolve(REPO, t))
  : readdirSync(join(REPO, 'tasks'))
      .filter((f) => f.endsWith('.md'))
      .map((f) => join(REPO, 'tasks', f));

/** Turn a task prompt into a clean retrieval query: drop handlebars, code, urls, md punctuation. */
function buildQuery(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/{{[^}]*}}/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[#>`*_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 600);
}

/** Run qmd and return ranked [{name, score}] of wiki partials (deduped, best score, desc). */
function rankPartials(queryText) {
  const out = execFileSync('qmd', [MODE, queryText, '-n', '8'], {
    encoding: 'utf8',
    env: { ...process.env, INDEX_PATH: INDEX },
    maxBuffer: 16 * 1024 * 1024,
  });
  const lines = out.split('\n');
  const best = new Map();
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/qmd:\/\/wiki\/([\w-]+)\.md/);
    if (!m || EXCLUDE.has(m[1])) continue;
    let score = 0;
    for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
      const s = lines[j].match(/Score:\s+(\d+)%/);
      if (s) {
        score = parseInt(s[1], 10) / 100;
        break;
      }
    }
    if (!best.has(m[1]) || score > best.get(m[1])) best.set(m[1], score);
  }
  return [...best.entries()].map(([name, score]) => ({ name, score })).sort((a, b) => b.score - a.score);
}

/** Read a wiki partial body from disk with its YAML frontmatter stripped. */
function partialBody(name) {
  const raw = readFileSync(join(WIKI, `${name}.md`), 'utf8');
  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
  // WCS renders prompts through Handlebars. Partials carry Angular template `{{ ... }}`
  // (e.g. forms.md's `{{ err.message }}`), which Handlebars would parse as expressions and
  // choke on ("message" not defined). Escape the opening mustache so it's emitted literally.
  // (The original task's `{{> contextFiles}}` is untouched — we only escape injected guidance.)
  return body.replace(/\{\{/g, '\\{{');
}

mkdirSync(OUT, { recursive: true });
for (const taskPath of TASKS) {
  const task = readFileSync(taskPath, 'utf8');
  const retrieved = rankPartials(buildQuery(task))
    .filter((h) => h.score >= MIN && !BASE.includes(h.name))
    .slice(0, TOP);

  // Base layer (always) first, then qmd-retrieved task-specific partials.
  const selected = [
    ...BASE.map((name) => ({ name, tag: 'base' })),
    ...retrieved.map((h) => ({ name: h.name, tag: `qmd ${MODE} ${(h.score * 100).toFixed(0)}%` })),
  ];

  const guidance = selected
    .map((s) => `<!-- wiki:${s.name} (${s.tag}) -->\n${partialBody(s.name)}`)
    .join('\n\n---\n\n');

  const assembled =
    `${task.trim()}\n\n---\n\n` +
    `## Relevant Angular guidance (retrieved for this task)\n\n` +
    `${guidance || '_No partial scored above the threshold._'}\n`;

  const outFile = join(OUT, basename(taskPath));
  writeFileSync(outFile, assembled);
  const tag = selected.map((s) => (s.tag === 'base' ? `${s.name}*` : `${s.name} ${s.tag.split(' ').pop()}`)).join(', ');
  console.log(`${basename(taskPath).padEnd(24)} ← [${tag}]   (* = base)`);
}
