---
capability: typescript
title: TypeScript best practices
summary: Strict typing, inference, and avoiding any.
triggers: [typescript, type, any, generics]
rules:
  - "@typescript-eslint/no-explicit-any"
  - "@typescript-eslint/no-inferrable-types"
ratings:
  - angular-eslint
---

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Do not assume globals like `new Date()` are available
