# wcs-edd — from eval-driven prompts to a hand-coded agent harness

Workshop repo. We use **web-codegen-scorer (WCS)** to generate an Angular app from a task, then score
it with deterministic ratings — measuring AI code generation, one scoreboard at a time.

## Quickstart

> ~a few minutes. One task, one model, deterministic ratings — your first scoreboard.

**1 · Install**

```bash
git clone https://github.com/Lowgular/wcs-edd
cd wcs-edd
npm install
```

**2 · Get a Gemini API key**

Open **[aistudio.google.com/apikey](https://aistudio.google.com/apikey)** → create a key. Then copy
the example env file and paste your key in — this is the recommended, cross-platform way (no shell
`export` juggling, works the same on macOS, Linux, and Windows):

```bash
cp .env.example .env          # macOS / Linux
Copy-Item .env.example .env   # Windows PowerShell
```

Open `.env` and set your key:

```ini
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

That's it — the stage configs auto-load `.env`, and it's gitignored so your key stays local.

<details>
<summary>Prefer an environment variable instead?</summary>

A real env var, if set, takes precedence over `.env`. Set it in the **same terminal** you run from:

```bash
export GOOGLE_GENERATIVE_AI_API_KEY=your_key_here   # macOS / Linux (bash/zsh)
```

```powershell
$env:GOOGLE_GENERATIVE_AI_API_KEY = "your_key_here"  # Windows PowerShell (current session)
setx GOOGLE_GENERATIVE_AI_API_KEY "your_key_here"    # Windows, persisted (reopen terminal after)
```

```cmd
set GOOGLE_GENERATIVE_AI_API_KEY=your_key_here       :: Windows Command Prompt (current session)
```

</details>

**3 · Run one baseline eval** — one command from the repo root:

```bash
./run-task.sh 0
```

> **On Windows?** `.sh` is a bash script — run it in **Git Bash** (ships with Git for Windows) or WSL
> exactly as above. In native **PowerShell**, use the twin script instead: `.\run-task.ps1 0`
> (first time only, if scripts are blocked: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`).

That's the whole demo. `run-task.sh <stage>` hides the boilerplate — it fixes the runner (`ai-sdk`),
the model (`gemini-2.5-flash`), and the `--skip-*` flags, and the only knob you ever pick is the
**stage number** (`0` is the basic baseline prompt). Stages `1`–`4` come later in the workshop.

<details>
<summary>What it runs under the hood</summary>

```bash
npx wcs eval \
  --env env/config.s0.mjs \
  --runner ai-sdk --model gemini-2.5-flash \
  --skip-screenshots --skip-ai-summary --skip-axe-testing --skip-lighthouse
```

- `--env env/config.s0.mjs` — the basic environment: the Angular starter + the deterministic
  ratings + the system instructions.
- `--runner ai-sdk --model gemini-2.5-flash` — a single-shot Gemini generation.
- `--skip-screenshots --skip-ai-summary --skip-axe-testing --skip-lighthouse` — keep the run fast,
  free, and deterministic (no browser shots, no LLM summary, no axe, no lighthouse).

</details>

**4 · Open the report**

WCS writes the run into `.web-codegen-scorer/` (in the repo root). Open the report it prints at the
end to see the generated app, the per-rating breakdown, and the **0–100 score**.

---

## Other ways to run it (later in the workshop)

Angular MCP tools (needs an agentic runner, e.g. gemini-cli):

```bash
npm install -D @google/gemini-cli
npx wcs eval --mcp --env env/config.s4.mjs --runner gemini-cli --model gemini-2.5-flash --prompt-filter login-form --skip-screenshots --skip-ai-summary --skip-axe-testing --skip-lighthouse
```

Custom wiki via the QMD CLI:

```bash
export INDEX_PATH=/Users/grzegorz.radzio/Desktop/projects/agents/wcs-edd/.qmd/index.sqlite
```
