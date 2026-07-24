// Base environment — the fields every stage and runner share. Each config spreads this and
// overrides only what differs: `ratings`, `displayName`, `generationSystemPrompt` (and `executor`
// for the agentic runner). Relative paths resolve against this file's directory (env/), which is
// the same directory every config lives in — so spreading the strings keeps them valid.
import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Load the repo-root .env so GOOGLE_GENERATIVE_AI_API_KEY (and friends) are available no matter
// which shell or OS you launch from — no manual `export` / `$env:` / `set` needed. Every stage
// config imports this file, so this runs before any runner reads the key. Path is resolved
// relative to THIS file (env/../.env), so it works regardless of the current working directory.
// A real environment variable, if already set, wins — dotenv never overrides existing vars.
loadEnv({ path: join(dirname(fileURLToPath(import.meta.url)), "..", ".env") });

/** @type {Partial<import("web-codegen-scorer").EnvironmentConfig>} */
export default {
  clientSideFramework: "angular",
  sourceDirectory: "./project",
  packageManager: "npm",
  executablePrompts: ["../tasks/*.md"],
};
