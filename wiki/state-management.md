---
capability: state-management
title: State management & reactivity
summary: Signals for state, computed for derivation, correct RxJS↔signal interop, reactive route params.
triggers: [state, signal, computed, rxjs, observable, subscribe, tosignal, route param, snapshot]
rules:
  - wcs/require-subscription-teardown
  - wcs/prefer-to-signal
  - wcs/no-mutate-on-signals
  - wcs/pure-state-transformations
  - wcs/no-activated-route-snapshot
ratings:
  - reactive-practices
  - no-mutate-on-signals
  - pure-state-transformations
  - no-route-snapshot
---

- Use signals for local component state and `computed()` for derived state
- Keep state transformations pure and predictable; inside `computed()` / `update()` callbacks do not assign to `this.<x>`
- Do NOT use `mutate` on signals — use `update` or `set`
- For data you DISPLAY, use `toSignal()` or the `async` pipe — never hand-pipe a stream into a signal (`stream$.subscribe(v => this.sig.set(v))`): that leaks the subscription and reimplements reactivity. For a one-shot action (a login/save POST/PUT), a `.subscribe()` that `.set()`s a flag/result on completion is fine — just don't leak it (`take(1)` / `firstValueFrom` / component teardown)
- Signals are NOT observables: NEVER call `.pipe()` or `.subscribe()` on a `signal()` / `computed()` / `toSignal()` result. Derive with `computed()`; do any RxJS chaining on the Observable BEFORE `toSignal()`, and use `toObservable()` only if you genuinely need a stream from a signal
- `toSignal()`'s source must ALWAYS be an Observable — never a conditional like `cond ? obs : null`. To fetch based on a route param or other value, pipe that value through `switchMap` into the request and call `toSignal()` on the single resulting Observable
- Read route parameters reactively — `route.paramMap` / `route.params` / `route.queryParamMap` (piped or via `toSignal`). NEVER use `route.snapshot`; it reads once and does not update when navigation reuses the component
