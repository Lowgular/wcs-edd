import { getBuiltInRatings } from 'web-codegen-scorer';

/** @type {import("web-codegen-scorer").EnvironmentConfig} */
export default {
    displayName: 'Workshop Playground (Angular)',
    clientSideFramework: 'angular',
    sourceDirectory: '../../init-states/angular-starter',
    generationSystemPrompt: './system-instructions.md',
    executablePrompts: ['../../tasks/apps/*.md'],
    packageManager: 'npm',
    ratings: [
        ...getBuiltInRatings(),
    ],
};
