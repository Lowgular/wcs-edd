---
title: Angular generation wiki
summary: Capability-scoped guidance partials, each linked to the evals that enforce it.
---

# wiki

The full generation guidance, decomposed into **one markdown partial per capability** — the slim
core (`system-instructions.static.md`) plus these partials, served on demand by an MCP (retrieve only
the partials a task needs) instead of shipping the whole ~2.6k-token prompt on every generation.

## Frontmatter schema

```yaml
capability: <slug>          # unique id
title: <human title>
summary: <one line — for retrieval relevance>
triggers: [<keyword>, …]    # match against the task to decide which partials to serve
rules: [<eslint-rule-id>, …]   # the lint rules that ENFORCE this partial (detection)
ratings: [<wcs-rating-id>, …]  # the WCS ratings that SCORE this capability
```

The body below the frontmatter is the guidance text (verbatim from the prompt).

## Capabilities

| partial | covers | ratings |
| --- | --- | --- |
| `project-setup.md` | file layout, standalone bootstrap, HttpClient, protected files | angular-eslint |
| `typescript.md` | strict typing, no `any`, no assumed globals | angular-eslint |
| `models.md` | data models: type-alias > interface > class, readonly, no behavior | model-declaration-kind, model-purity |
| `components.md` | standalone + OnPush components, signal inputs/outputs, DI, host, images | angular-eslint, input-output |
| `component-decorator.md` | `@Component` metadata: omit standalone/changeDetection, host object, relative URLs | change-detection-strategy, standalone-declaration, angular-eslint |
| `state-management.md` | signals/computed, RxJS↔signal interop, reactive route params | reactive-practices, no-mutate-on-signals, pure-state-transformations, no-route-snapshot |
| `templates.md` | native control flow, bindings, clean expressions | angular-eslint, no-globals-in-templates |
| `accessibility.md` | alt/labels/keyboard/ARIA | angular-eslint |
| `formatting.md` | built-in pipes over manual formatting | prefer-built-in-pipes |
| `forms.md` | Signal Forms (form/[formRoot]/[formField], submission action) | form-strategy |
| `services.md` | the custom `@Service` decorator, single-responsibility services, `inject()` | service-decorator, angular-eslint |
| `private-fields.md` | class member visibility: `#private` (keep template-bound members public/protected) | hash-private |

The `rules` / `ratings` frontmatter is the guidance↔eval link: an agent can serve a partial,
then check the matching ratings to verify the generated code actually followed it.
