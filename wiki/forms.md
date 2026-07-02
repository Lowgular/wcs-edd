---
capability: forms
title: Forms (Signal Forms)
summary: Build user-input forms with Angular Signal Forms — form() + [formRoot]/[formField], schema validators, submission action, and the built-in field state (errors/touched/invalid/submitting).
triggers: [form, input, submit, validation, login, edit, field, formfield, textarea, checkbox, radio, select, required, email]
rules:
  - wcs/form-strategy
ratings:
  - form-strategy
---

# Signal Forms

Angular **Signal Forms** (`@angular/forms/signals`) are the modern, signals-first way to build
user-input forms. You hold the data in a plain writable `signal()` and wrap it with `form()`; the
form keeps the model and the UI in sync automatically, and it exposes **all** form state — values,
validity, touched/dirty, errors, submitting — as signals. You never hand-roll `success`/`error`/
`loading` flags, and you never reach for the legacy `FormGroup` / `FormControl` / `ngModel` APIs.

> This API is NEW. It is NOT `ReactiveFormsModule` and NOT template-driven forms. Import from
> `@angular/forms/signals`, not `@angular/forms`.

### Essentials — a complete minimal form

Everything you need to build a correct form is right here; the numbered sections below are reference
detail (every input type, the full validator/field-state tables, prefill nuances).

```ts
import { Component, signal, inject } from '@angular/core';
import { form, FormRoot, FormField, required, email, minLength } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormRoot, FormField],            // FormRoot + FormField are DIRECTIVES — add to imports
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly #auth = inject(AuthService);

  // 1. model = a WRITABLE signal mirroring the form shape (never computed() — the form writes back)
  protected readonly model = signal({ email: '', password: '' });

  // 2. form() = model + schema (validators declared ONCE) + submission action
  protected readonly loginForm = form(
    this.model,
    (path) => {
      required(path.email, { message: 'Email is required' });
      email(path.email, { message: 'Enter a valid email' });
      required(path.password, { message: 'Password is required' });
      minLength(path.password, 8, { message: 'At least 8 characters' });
    },
    {
      submission: {
        action: async (field) => {                         // runs ONLY when the form is valid
          try {
            await firstValueFrom(this.#auth.login(field().value()));
            return;                                         // success (do side effects like navigate here)
          } catch {
            return { kind: 'serverError', message: 'Login failed' };
          }
        },
      },
    },
  );
}
```

```html
<form [formRoot]="loginForm">                               <!-- owns submit; NO (submit)/(ngSubmit) -->
  <label>Email <input type="email" [formField]="loginForm.email" /></label>
  @if (loginForm.email().touched() && loginForm.email().invalid()) {
    @for (err of loginForm.email().errors(); track err) {
      <p class="text-red-600 text-sm">{{ err.message }}</p>
    }
  }

  <label>Password <input type="password" [formField]="loginForm.password" /></label>

  <button type="submit" [disabled]="loginForm().invalid() || loginForm().submitting()">
    @if (loginForm().submitting()) { Signing in… } @else { Sign in }
  </button>
</form>
```

**Non-negotiables:** import from `@angular/forms/signals` · model is a writable `signal()` · validators
live in the schema callback · submission via `submission.action`, never a `(submit)` handler · render
the built-in state (`.invalid()`, `.touched()`, `.errors()`, `.submitting()`) — never hand-rolled
`loading`/`error` flags · no `FormGroup`/`FormControl`/`ngModel`/`ReactiveFormsModule` · don't annotate
the `form()` return type, and there is no `field`/`FormSignal` export.

**Editing existing data (prefill):** create the model with empty defaults and `.set()` the whole object
**once**, inside an `effect()`, when the fetched data arrives (see §2) — do NOT make the model a
`computed()` and do NOT assign field-by-field.

## The mental model

1. **Model** — a writable `signal()` holding a plain object that mirrors the form's shape.
2. **Field tree** — `form(model, schema?, options?)` returns a tree whose nodes match the model keys
   (`loginForm.email`, `loginForm.password`, …). Call a node as a function to get its `FieldState`.
3. **Bindings** — `[formRoot]` on the `<form>`, `[formField]` on each control. Two-way sync is wired
   for you (including native attributes like `required` / `disabled` / `readonly`).
4. **Validation** — declared once in the schema callback with validators (`required`, `email`, …).
5. **Submission** — handled by `[formRoot]` via the `submission.action` option. No `(submit)` handler.

## Imports — exactly these, nothing invented

```ts
import { form, FormRoot, FormField, required, email, minLength, maxLength, min, max, pattern }
  from '@angular/forms/signals';
```

- Import ONLY `form`, `FormRoot`, `FormField`, and the validators you actually use.
- There is **NO** `field` export and **NO** `FormSignal` export. Do NOT annotate the `form()` result
  type — let it infer. `FormRoot` and `FormField` are directives; add them to the component `imports`.

## 1 — Model and form

The model MUST be a **writable `signal()`** — never a `computed()`, because the form writes back into
it. Start with sensible empty defaults matching your data shape:

```ts
interface LoginData {
  email: string;
  password: string;
}

protected readonly model = signal<LoginData>({ email: '', password: '' });
protected readonly loginForm = form(this.model, (path) => {
  required(path.email, { message: 'Email is required' });
  email(path.email, { message: 'Enter a valid email address' });
  required(path.password, { message: 'Password is required' });
  minLength(path.password, 8, { message: 'At least 8 characters' });
});
```

## 2 — Reading and writing field values

Call a field to get its `FieldState`; read `.value()`, write with `.value.set(...)`. Writing the
field updates the model signal too (and vice-versa):

```ts
const currentEmail = this.loginForm.email().value();      // read
this.loginForm.email().value.set('alice@example.com');    // write — model updates automatically
```

### Editing existing data (prefill)

For an edit form, create the signal with empty defaults and `.set()` the whole model **once** the
fetched data arrives — do NOT make the model a `computed()`, and do NOT `.subscribe()` + assign
field-by-field:

```ts
private readonly service = inject(CommentService);
private readonly id = /* route param as a signal */;

protected readonly model = signal({ title: '', content: '' });
protected readonly editForm = form(this.model, (path) => {
  required(path.title);
  required(path.content);
});

constructor() {
  // when the fetched comment resolves, seed the model once
  effect(() => {
    const comment = this.comment(); // e.g. a toSignal() of the GET
    if (comment) this.model.set({ title: comment.title, content: comment.content });
  });
}
```

## 3 — Binding the template

Put `[formRoot]` on the `<form>` and `[formField]` on every control. `[formRoot]` sets `novalidate`,
prevents the default browser submit, and runs the form's `submission.action` **only when the form is
valid**. Do NOT add your own `(submit)` / `(ngSubmit)` handler.

```html
<form [formRoot]="loginForm">
  <label>
    Email
    <input type="email" [formField]="loginForm.email" />
  </label>
  @if (loginForm.email().touched() && loginForm.email().invalid()) {
    <ul class="text-red-600 text-sm">
      @for (err of loginForm.email().errors(); track err) {
        <li>{{ err.message }}</li>
      }
    </ul>
  }

  <label>
    Password
    <input type="password" [formField]="loginForm.password" />
  </label>

  <button type="submit" [disabled]="loginForm().invalid() || loginForm().submitting()">
    @if (loginForm().submitting()) { Signing in… } @else { Sign in }
  </button>
</form>
```

## 4 — Every input type

`[formField]` adapts to the control. Bind it the same way on all of them:

```html
<!-- text / email / password -->
<input type="text"     [formField]="form.name" />
<input type="email"    [formField]="form.email" />
<input type="password" [formField]="form.password" />

<!-- number: value is coerced to a number automatically -->
<input type="number" [formField]="form.age" />

<!-- date (stores "YYYY-MM-DD") and time (stores "HH:mm") as strings -->
<input type="date" [formField]="form.eventDate" />
<input type="time" [formField]="form.eventTime" />

<!-- textarea (multi-line, e.g. a comment body) -->
<textarea [formField]="form.content" rows="4"></textarea>

<!-- single checkbox: field is a boolean -->
<label>
  <input type="checkbox" [formField]="form.agreeToTerms" />
  I agree to the terms
</label>

<!-- multiple independent checkboxes: one field each -->
<label><input type="checkbox" [formField]="form.emailNotifications" /> Email</label>
<label><input type="checkbox" [formField]="form.smsNotifications" /> SMS</label>

<!-- radio group: same [formField] on each; the chosen input's `value` becomes the field value -->
<label><input type="radio" value="free"    [formField]="form.plan" /> Free</label>
<label><input type="radio" value="premium" [formField]="form.plan" /> Premium</label>

<!-- select: static or dynamic options -->
<select [formField]="form.country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</select>
<select [formField]="form.productId">
  <option value="">Select a product</option>
  @for (product of products(); track product.id) {
    <option [value]="product.id">{{ product.name }}</option>
  }
</select>
```

Notes: number inputs convert between string and number for you; date inputs store `YYYY-MM-DD` and
time inputs `HH:mm` strings (`new Date(form.eventDate().value())` to get a `Date`); `<select multiple>`
is not supported by `[formField]`.

## 5 — Validation

Declare validation ONCE in the schema callback (the `form()` second argument). Do NOT hand-roll
validation logic in the component or template.

| Validator | Purpose |
|-----------|---------|
| `required(path.x)` | field must have a value |
| `email(path.x)` | valid email format |
| `min(path.x, n)` / `max(path.x, n)` | numeric range |
| `minLength(path.x, n)` / `maxLength(path.x, n)` | string / collection length |
| `pattern(path.x, /regex/)` | matches a regular expression |

Add a custom message with the options object; you can also `debounce` a field's validation:

```ts
form(model, (path) => {
  debounce(path.email, 500);
  required(path.email, { message: 'Email is required' });
  email(path.email,    { message: 'Please enter a valid email address' });
  min(path.age, 18,    { message: 'Must be 18 or older' });
  pattern(path.zip, /^\d{5}$/, { message: 'Enter a 5-digit ZIP' });
});
```

## 6 — Field state (all signals)

Each field's `FieldState` exposes read-only signals — render directly from these, never from your own
flags:

| Signal | Meaning |
|--------|---------|
| `.value()` | current value |
| `.valid()` / `.invalid()` | passes / fails all validators |
| `.touched()` | focused then blurred |
| `.dirty()` | value changed by the user |
| `.disabled()` / `.readonly()` | control disabled / read-only |
| `.pending()` | async validation in progress |
| `.errors()` | array of `{ kind, message }` validation errors |

The form root itself (`form()`) exposes the aggregate: `loginForm().invalid()`, `loginForm().valid()`,
`loginForm().submitting()`, and `loginForm().errors()` for server-level errors.

Typical error display — show a field's errors only after it's been touched:

```html
@if (form.title().touched() && form.title().invalid()) {
  @for (err of form.title().errors(); track err) {
    <p class="text-red-600 text-sm">{{ err.message }}</p>
  }
}
```

## 7 — Submission

Put submission on the `submission.action` option. `[formRoot]` runs it only when the form is valid.
Inside the action make the ONE-SHOT backend call with `await firstValueFrom(...)` (never `.subscribe()`
+ `.set()`); `return` nothing on success (run side effects like navigation there), and
`return { kind, message }` on failure so the error surfaces in `form().errors()`.

```ts
protected readonly editForm = form(
  this.model,
  (path) => {
    required(path.title, { message: 'Title is required' });
    required(path.content, { message: 'Content is required' });
  },
  {
    submission: {
      action: async (field) => {
        try {
          await firstValueFrom(this.service.save(field().value()));
          this.router.navigate(['/']); // success side effect
          return;                       // success
        } catch {
          return { kind: 'serverError', message: 'Could not save. Try again.' };
        }
      },
    },
  },
);
```

Server errors then render from the form root:

```html
@if (editForm().errors().length) {
  @for (err of editForm().errors(); track err) {
    <p class="text-red-600">{{ err.message }}</p>
  }
}
```

## Do NOT

- Do NOT use `FormGroup` / `FormControl` / `FormBuilder` / `formControlName`, `ReactiveFormsModule`,
  `ngModel`, or `FormsModule`.
- Do NOT wire inputs manually with `[value]` + `(input)` / `(change)`.
- Do NOT add a `(submit)` / `(ngSubmit)` handler — `[formRoot]` owns submission.
- Do NOT hand-roll `loading` / `submitting` / `error` / `success` signals — read the built-in state.
- Do NOT annotate the `form()` return type, and do NOT import a non-existent `field` / `FormSignal`.
- Do NOT `.subscribe()` inside the submission action — use `await firstValueFrom(...)`.
