// Stage 5 — CONTEXT ENGINEERING. Same slim-core prompt + same scoreboard as the agentic stages, but
// the runner retrieves the task-relevant wiki partials (qmd) and injects them into the prompt up front.
// Single-shot RAG: no tools, no loop — just personalized context. The lift over a bare slim core is
// the whole point.
import { agenticConfig } from "./config.agentic-base.mjs";
import { RagRunner } from "../agents/rag.runner.mjs";
import { angularEslintRating } from "./ratings/angular-eslint.rating.mjs";
import { inputOutputRating } from "./ratings/input-output.rating.mjs";
import { noMutateOnSignalsRating } from "./ratings/no-mutate-on-signals.rating.mjs";
import { pureStateTransformationsRating } from "./ratings/pure-state-transformations.rating.mjs";
import { reactiveRating } from "./ratings/reactive.rating.mjs";
import { noRouteSnapshotRating } from "./ratings/no-route-snapshot.rating.mjs";
import { formattingRating } from "./ratings/formatting.rating.mjs";
import { changeDetectionRating } from "./ratings/change-detection.rating.mjs";
import { standaloneRating } from "./ratings/standalone.rating.mjs";
import { modelDeclarationKindRating } from "./ratings/model-declaration-kind.rating.mjs";
import { modelPurityRating } from "./ratings/model-purity.rating.mjs";
import { formsRating } from "./ratings/forms.rating.mjs";
import { serviceDecoratorRating } from "./ratings/service-decorator.rating.mjs";

export default agenticConfig({
  displayName: "Stage 5",
  runner: new RagRunner(),
  ratings: [
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
  ],
});
