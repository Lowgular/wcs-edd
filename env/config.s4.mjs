// Stage 4 — + OUT-OF-WEIGHTS capability. Signal Forms + the custom @Service decorator: telling failed,
// so the prompt now SHOWS each by example.
import base from "./config.base.mjs";
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

/** @type {import("web-codegen-scorer").EnvironmentConfig} */
export default {
  ...base,
  displayName: "Stage 4",
  generationSystemPrompt: "./system-instructions.s4.md",
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
    // ── + few shot examples ──
    formsRating, // graded tiers: signal 100 > reactive 75 > template 50 > manual 0
    serviceDecoratorRating, // graded tiers: @Service 100 > Injectable+root 75 > scoped 50 > empty 0
  ],
};
