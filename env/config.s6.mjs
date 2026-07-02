// Stage 6 — HARNESS: PLAN-AND-EXECUTE AGENTIC RAG. Two shots, no reactive loop: the model reads the
// wiki INDEX and PLANS which pages it needs (agency — it picks the context, not stage-5's regex), we
// fetch them, then it writes every file at once (RAG-style, no write_file loop). More tokens than RAG
// (the extra planning call) but higher agency at similar accuracy — and far fewer tokens than the
// single-loop agent (single-tool-agent.runner.mjs), which re-billed written files every step.
import { agenticConfig } from "./config.agentic-base.mjs";
import { AgentAdvancedToolRunner } from "../agents/agent-advanced-tool.runner.mjs";
import { angularEslintRating } from "./ratings/angular-eslint.rating.mjs";
import { changeDetectionRating } from "./ratings/change-detection.rating.mjs";
import { formattingRating } from "./ratings/formatting.rating.mjs";
import { formsRating } from "./ratings/forms.rating.mjs";
import { inputOutputRating } from "./ratings/input-output.rating.mjs";
import { modelDeclarationKindRating } from "./ratings/model-declaration-kind.rating.mjs";
import { modelPurityRating } from "./ratings/model-purity.rating.mjs";
import { noMutateOnSignalsRating } from "./ratings/no-mutate-on-signals.rating.mjs";
import { noRouteSnapshotRating } from "./ratings/no-route-snapshot.rating.mjs";
import { pureStateTransformationsRating } from "./ratings/pure-state-transformations.rating.mjs";
import { reactiveRating } from "./ratings/reactive.rating.mjs";
import { serviceDecoratorRating } from "./ratings/service-decorator.rating.mjs";
import { standaloneRating } from "./ratings/standalone.rating.mjs";
import { AgentSingleToolRunner } from "../agents/agent-single-tool.runner.mjs";

export default agenticConfig({
  displayName: "Stage 6",
  runner: new AgentSingleToolRunner(),
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
