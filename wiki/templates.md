---
capability: templates
title: Template syntax
summary: Native control flow, correct bindings, and clean template expressions.
triggers: [template, html, control flow, for, if, binding, button, class binding]
rules:
  - "@angular-eslint/template/prefer-control-flow"
  - "@angular-eslint/template/button-has-type"
  - "@angular-eslint/template/prefer-self-closing-tags"
  - "@angular-eslint/template/no-duplicate-attributes"
  - "@angular-eslint/template/banana-in-box"
  - "@angular-eslint/template/eqeqeq"
  - "@angular-eslint/template/no-any"
  - "@angular-eslint/template/prefer-contextual-for-variables"
  - "@angular-eslint/template/prefer-at-empty"
  - "@angular-eslint/template/prefer-at-else"
  - "@angular-eslint/template/no-negated-async"
  - wcs/no-globals-in-template
ratings:
  - angular-eslint
  - no-globals-in-templates
---

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the `async` pipe to handle observables; do not negate an async pipe directly (`!(data$ | async)`) — bind it once with `@if (data$ | async; as data)`
- With `@for`, always give a `track`, use the contextual variables (`$index`, `$count`, `$first`, …), and add an `@empty` block; use `@else` / `@else if` with `@if`
- Every `<button>` MUST have an explicit `type` — use `type="button"` for buttons that do not submit a form (tabs, toggles, action buttons)
- Use self-closing tags for elements with no content (e.g. `<input />`, `<img …/>`, `<router-outlet />`, `<app-foo />`)
- Put always-on classes in the static `class` attribute and conditional ones in individual `[class.<name>]="condition"` bindings. Do NOT put both a static `class="…"` and a `[class]="…"` binding on the same element
- Two-way bindings use the `[(x)]` syntax (the box goes inside the banana); use `===` / `!==` (never `==` / `!=`) in expressions and never use `$any(...)`
- Do not reference JS globals (`new Date()`, `Math`, `window`, `document`, …) in template expressions — compute them in the component
- Do not write arrow functions or regular expressions in templates (not supported)
