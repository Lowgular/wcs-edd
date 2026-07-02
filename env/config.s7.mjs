// Stage 7 — HARNESS: THE CLOSED LOOP. The agent gets the wiki AND a verify(lint) tool: write → verify
// → fix, iterating until the checks pass. The rubric stops being just a scoreboard and becomes part of
// the generation loop.
import { agenticConfig } from "./config.agentic-base.mjs";
import { AgentVerifyRunner } from "../agents/agent-verify.runner.mjs";
import { angularEslintRating } from "./ratings/angular-eslint.rating.mjs";
import { changeDetectionRating } from "./ratings/change-detection.rating.mjs";
import { formsRating } from "./ratings/forms.rating.mjs";
import { inputOutputRating } from "./ratings/input-output.rating.mjs";
import { modelDeclarationKindRating } from "./ratings/model-declaration-kind.rating.mjs";
import { modelPurityRating } from "./ratings/model-purity.rating.mjs";
import { noMutateOnSignalsRating } from "./ratings/no-mutate-on-signals.rating.mjs";
import { noRouteSnapshotRating } from "./ratings/no-route-snapshot.rating.mjs";
import { pureStateTransformationsRating } from "./ratings/pure-state-transformations.rating.mjs";
import { reactiveRating } from "./ratings/reactive.rating.mjs";
import { standaloneRating } from "./ratings/standalone.rating.mjs";
import { serviceDecoratorRating } from "./ratings/service-decorator.rating.mjs";
import { formattingRating } from "./ratings/formatting.rating.mjs";

// The Stage-7 scoreboard — the white-box convention rules. Exported so the later harness stages
// (s8–s10) reuse the SAME set and just layer the wcs build + axe gates on top: one source of truth,
// no shared kitchen-sink scoreboard imported everywhere.
export const stage7Ratings = [
  angularEslintRating,
  inputOutputRating,
  noMutateOnSignalsRating,
  pureStateTransformationsRating,
  reactiveRating,
  noRouteSnapshotRating,
  formattingRating,
  changeDetectionRating,
  standaloneRating,
  modelDeclarationKindRating,
  modelPurityRating,
  formsRating,
  serviceDecoratorRating,
];

export default agenticConfig({
  displayName: "Stage 7",
  runner: new AgentVerifyRunner(),
  ratings: stage7Ratings,
});
