/**
 * eval-retrieval.mjs — a PROGRAMMATIC eval for the RAG retrieval problem itself.
 *
 * The WCS ratings score the generated CODE. This scores the step BEFORE that: did the retriever
 * fetch the RIGHT wiki partials for each task? We define a gold set per task (the capabilities that
 * genuinely drive that task's ratings), run the actual qmd retrieval, and compute precision / recall
 * / F1 — plus the injected size, so you see BOTH failure axes (relevance AND tokens) in one table.
 *
 * The query STRATEGIES themselves live in agents/tools/wiki.tools.mjs (RETRIEVAL_STRATEGIES) — this
 * script only scores them. Add/tune a strategy there and it shows up here automatically; the winner is
 * whatever you then set as DEFAULT_STRATEGY (which the RagRunner uses). This file owns ONLY the rubric
 * (GOLD) and the reporting.
 *
 * Run:  node scripts/eval-retrieval.mjs        (needs qmd on PATH; ~1–2 min — one qmd call per query)
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { RETRIEVAL_STRATEGIES, readWikiPage } from "../agents/tools/wiki.tools.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const TASKS = ROOT + "/tasks";

// ── GOLD SETS ──────────────────────────────────────────────────────────────────────────────────
// The partials whose guidance MATERIALLY drives each task's ratings. `project-setup`, `typescript`,
// `accessibility`, `private-fields` are near-universal build/quality baseline — excluded from the
// discriminating gold so precision/recall reflect the CAPABILITY match, not the universals. The
// point of contention this eval exposes: `forms` is gold ONLY for the two form tasks.
const GOLD = {
  "content-tabs":      ["components", "templates", "state-management", "component-decorator", "models", "services"],
  "user-list":         ["components", "templates", "state-management", "component-decorator", "models", "services", "formatting"],
  "product-detail":    ["components", "templates", "component-decorator", "models", "services", "formatting"],
  "login-form":        ["components", "templates", "component-decorator", "forms", "services", "state-management"],
  "edit-comment-form": ["components", "templates", "component-decorator", "forms", "services", "models", "state-management"],
};

// Always-acceptable build/quality baseline: retrieving these is never WRONG, so they don't count
// against precision (excluded from the denominator). This isolates the real decision — did it pull a
// genuinely IRRELEVANT task-specific doc (e.g. `forms` for a task with no form)?
const NEUTRAL = new Set(["project-setup", "typescript", "accessibility", "private-fields"]);

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const injectedWords = (names) => names.reduce((a, n) => a + words(readWikiPage(n)), 0);

/** precision / recall / F1 of `got` against `gold`; NEUTRAL baseline docs excluded from precision. */
function score(got, gold) {
  const G = new Set(gold);
  const scored = got.filter((n) => !NEUTRAL.has(n)); // only task-specific picks count for precision
  const hit = scored.filter((n) => G.has(n));
  const precision = scored.length ? hit.length / scored.length : 1; // no risky picks → precision 1
  const recall = gold.length ? gold.filter((n) => got.includes(n)).length / gold.length : 0;
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;
  return {
    precision, recall, f1,
    falsePos: scored.filter((n) => !G.has(n)),
    falseNeg: gold.filter((n) => !got.includes(n)),
  };
}

const pct = (x) => (x * 100).toFixed(0).padStart(3) + "%";

console.log("\nRETRIEVAL EVAL — precision/recall/F1 vs per-task gold set, + injected size\n");
const agg = {}; // strategy → summed metrics
for (const sName of Object.keys(RETRIEVAL_STRATEGIES)) {
  agg[sName] = { p: 0, r: 0, f: 0, w: 0, n: 0 };
}

for (const task of Object.keys(GOLD)) {
  const src = readFileSync(join(TASKS, `${task}.md`), "utf8");
  console.log(`\n### ${task}   gold: [${GOLD[task].join(", ")}]`);
  for (const [sName, run] of Object.entries(RETRIEVAL_STRATEGIES)) {
    let got;
    try { got = run(src); } catch (e) { console.log(`  ${sName}: qmd failed — ${e.message.slice(0, 60)}`); continue; }
    const s = score(got, GOLD[task]);
    const w = injectedWords(got);
    const a = agg[sName];
    a.p += s.precision; a.r += s.recall; a.f += s.f1; a.w += w; a.n += 1;
    console.log(
      `  ${sName.padEnd(20)} P:${pct(s.precision)} R:${pct(s.recall)} F1:${pct(s.f1)}  ${String(w).padStart(4)}w  ` +
      `got[${got.join(",")}]`,
    );
    if (s.falsePos.length) console.log(`  ${" ".repeat(16)}  ✗ irrelevant: ${s.falsePos.join(", ")}`);
    if (s.falseNeg.length) console.log(`  ${" ".repeat(16)}  ✗ missed:     ${s.falseNeg.join(", ")}`);
  }
}

console.log("\n\n════ AGGREGATE (mean across the 5 tasks) ════\n");
console.log("strategy           precision  recall     F1     avg injected");
for (const [sName, a] of Object.entries(agg)) {
  console.log(
    `${sName.padEnd(18)} ${pct(a.p / a.n)}     ${pct(a.r / a.n)}    ${pct(a.f / a.n)}    ${Math.round(a.w / a.n)}w`,
  );
}
console.log("");
