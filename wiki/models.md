---
capability: models
title: Data models
summary: Declaring data models as readonly, behavior-free type aliases.
triggers: [model, type, interface, data shape, dto, entity]
rules:
  - wcs/model-declaration-kind
  - wcs/model-purity
ratings:
  - model-declaration-kind
  - model-purity
---

- Define data models in dedicated `*.model.ts` files
- Declare a model as a `type` alias (preferred); an `interface` is acceptable, but do NOT model plain data as a `class`
- Every model property MUST be `readonly`
- Models are pure data: no methods, getters, or setters
