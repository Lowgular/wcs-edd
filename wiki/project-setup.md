---
capability: project-setup
title: Project setup & scaffolding
summary: How the generated app is structured — file layout, standalone bootstrap, HttpClient, and the files you must not touch.
triggers: [setup, scaffold, structure, bootstrap, http, fetch, file layout]
rules:
  - "@angular-eslint/prefer-standalone"
ratings:
  - angular-eslint
---

- Code MUST be implemented in Angular.
- Put the component code inside `src/app/app.ts`
- Component class MUST always be named `App`
- Component's selector MUST always be `app-root` (the `selector: 'app-root'` MUST be present in the `@Component` decorator)
- Use standalone components, do NOT generate NgModules
- Generate the template code inside a separate HTML file and link it in the `templateUrl` field of the `App` component
- Generate the styling code inside a separate CSS file and link it in the `styleUrl` field of the `App` component
- Use Tailwind CSS
- Include all necessary code to run independently; the generated code must be **complete** and **runnable**, with a complete implementation of the `App` class
- Use comments sparingly and only for complex parts of the code
- Do NOT generate `bootstrapApplication` calls
- If the task fetches data with `HttpClient`, register `provideHttpClient()` in the app providers
- Do NOT modify `src/main.ts` or `src/mock-backend.ts`. The mock backend already responds to every endpoint these tasks use (including `/comments/:id`) — reach it through `HttpClient`, and never edit it
