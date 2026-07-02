---
capability: component-decorator
title: Component decorator metadata
summary: What to put — and omit — in the @Component({...}) decorator: never write the standalone or changeDetection keys, host bindings in the host object, no duplicate metadata entries, relative template/style URLs.
triggers: [component, decorator, metadata, change detection, changedetection, onpush, standalone, host, hostbinding, hostlistener, selector, templateurl, styleurl]
rules:
  - wcs/component-decorator-strategy
  - "@angular-eslint/no-duplicates-in-metadata-arrays"
  - "@angular-eslint/prefer-host-metadata-property"
  - "@angular-eslint/relative-url-prefix"
ratings:
  - change-detection-strategy
  - standalone-declaration
  - angular-eslint
---

Conventions for the `@Component({...})` (and `@Directive` / `@Pipe`) decorator metadata block:

- Do NOT set the `standalone` property at all — components/directives/pipes are standalone by default in Angular v20+. Never write `standalone: true` OR `standalone: false`.
- Do NOT set the `changeDetection` property — `OnPush` is the default in Angular v20+. Never set it to `Default` or `Eager` (that opts out of OnPush).
- Do not repeat entries in `@Component` metadata arrays (`imports`, `providers`).
- Do NOT use the `@HostBinding` / `@HostListener` decorators — put host bindings in the `host` object of the decorator instead.
- When using external templates/styles, use paths relative to the component TS file (`templateUrl: './x.html'`, `styleUrl: './x.scss'`).
