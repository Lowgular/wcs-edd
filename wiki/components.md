---
capability: components
title: Component authoring
summary: Single-responsibility standalone components with signal-based inputs/outputs, computed state, lifecycle interfaces, and optimized images. (Decorator-metadata conventions live in component-decorator.)
triggers: [component, input, output, viewchild, lifecycle, image, computed]
rules:
  - "@angular-eslint/prefer-inject"
  - "@angular-eslint/prefer-signal-model"
  - "@angular-eslint/prefer-output-emitter-ref"
  - "@angular-eslint/prefer-output-readonly"
  - "@angular-eslint/computed-must-return"
  - "@angular-eslint/use-lifecycle-interface"
  - "@angular-eslint/no-empty-lifecycle-method"
  - "@angular-eslint/prefer-ngsrc"
  - "@angular-eslint/template/prefer-class-binding"
  - "@angular-eslint/template/no-inline-styles"
  - wcs/no-decorator-inputs-outputs
ratings:
  - angular-eslint
  - input-output
---

- Keep components small and focused on a single responsibility
- Always use standalone components over NgModules
- Use the signal functions — `input()`, `output()`, `model()` (two-way), `viewChild()` / `contentChild()` — never the `@Input()` / `@Output()` / `@ViewChild()` decorators or `inputs:` / `outputs:` in the `@Component` metadata. Declare them `readonly`; do not rename them, do not prefix an output with `on`, and do not name an output after a native DOM event (e.g. `click`)
- Use `computed()` for derived state — a `computed()` callback MUST `return` a value
- Implement the matching lifecycle interface (`OnInit`, `OnDestroy`, …) for any lifecycle hook you add, and never leave one empty. Do NOT add an `ngOnInit` just to fetch data — fetch at field initialization with `toSignal()` instead
- On every `<img>` use `[ngSrc]` (import `NgOptimizedImage`; add `width` + `height`, or `fill`) — never `src` / `[src]` / `[attr.src]`. `NgOptimizedImage` does not work for inline base64 images
- Do NOT use `ngClass` (use `[class]` / `[class.x]` bindings) or `ngStyle` (use `[style.x]` bindings)
- For `@Component({...})` decorator metadata conventions (standalone, changeDetection, host, relative URLs), see component-decorator
