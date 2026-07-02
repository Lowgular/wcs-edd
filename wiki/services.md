---
capability: services
title: Services & dependency injection
summary: Single-responsibility services declared with the custom @Service decorator, injected with inject().
triggers: [service, injectable, dependency injection, http client, api, provider]
rules:
  - "wcs/service-decorator-strategy"
  - "@angular-eslint/prefer-inject"
ratings:
  - service-decorator
  - angular-eslint
---

- Design services around a single responsibility
- Decorate every service with the project's house decorator **`@Service()`** imported from `./service` —
  NOT `@Injectable`. `@Service` bakes in root, tree-shakable provision, so you never write `providedIn`.
  It IS provided by the project — import it from `./service`, and never create your own `./service` file.
- ALWAYS use the `inject()` function and NEVER use constructor parameters for dependency injection
- Inject dependencies into `readonly` `#private` fields (see private-fields — injected deps are never template-bound, so `#` is correct)

How a service declaration is graded (worst → best):

| declaration | score |
| --- | --- |
| `@Injectable()` — no `providedIn` (not tree-shakable) | 0% — strictly avoid |
| `@Injectable({ providedIn: 'platform' \| 'any' \| <module> })` | 50% |
| `@Injectable({ providedIn: 'root' })` | 75% |
| `@Service()` | 100% |

```ts
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';

@Service()
export class UserService {
  readonly #http = inject(HttpClient);

  readonly users = () => this.#http.get<User[]>('/api/users');
}
```
