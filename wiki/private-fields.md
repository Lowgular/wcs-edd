---
capability: private-fields
title: Class member visibility
summary: Use ECMAScript `#private` for non-public class members — but keep anything the template reads public/protected.
triggers: [private, visibility, encapsulation, class member, field, method, hash private, ecmascript private, inject, service, dependency]
rules:
  - wcs/hash-private
ratings:
  - hash-private
---

- Use ECMAScript `#private` fields/methods for class-member privacy — NOT the TypeScript `private`
  keyword: `readonly #http = inject(HttpClient);` (referenced as `this.#http`). `#` privacy is real at
  runtime, not just erased by the compiler.
- Do NOT use the `private` keyword, and never combine the two (`private #http`) — pick ONE, and it's `#`.
- **Angular templates CANNOT read `#private` members** — `@if (#loading())` is a hard template parse
  error. So any member the template binds to (a `signal()`, a `computed()`, a method called from the
  template) MUST be `public` or `protected` — never `#`. Reserve `#` for things the template never
  touches: injected dependencies, internal constants, and private helper methods.
- Examples — injected dep (not template-bound): `readonly #http = inject(HttpClient);` ✓.
  Template-bound state: `protected readonly items = signal<Item[]>([]);` ✓ (never `#items` when the
  template reads it). Wrong: `private readonly http = inject(HttpClient);` (uses the keyword).
