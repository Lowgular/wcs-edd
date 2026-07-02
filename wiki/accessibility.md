---
capability: accessibility
title: Accessibility (a11y)
summary: Alt text, labels, keyboard support, and valid ARIA.
triggers: [accessibility, a11y, aria, label, alt, keyboard, focus]
rules:
  - "@angular-eslint/template/alt-text"
  - "@angular-eslint/template/label-has-associated-control"
  - "@angular-eslint/template/click-events-have-key-events"
  - "@angular-eslint/template/mouse-events-have-key-events"
  - "@angular-eslint/template/interactive-supports-focus"
  - "@angular-eslint/template/valid-aria"
  - "@angular-eslint/template/role-has-required-aria"
  - "@angular-eslint/template/no-autofocus"
  - "@angular-eslint/template/no-distracting-elements"
  - "@angular-eslint/template/elements-content"
  - "@angular-eslint/template/table-scope"
ratings:
  - angular-eslint
---

- **Page structure (the two an empty app fails by default):** wrap the page's content in a single
  **`<main>`** landmark, and give the page a top-level **`<h1>`**. The axe audit flags every page that
  has no `main` landmark (`landmark-one-main`) or no level-one heading (`page-has-heading-one`), so put
  the feature inside `<main>` with a real `<h1>` heading — don't rely on a bare `<div>` root.
- Every `<img>` needs an `alt` (use `alt=""` for purely decorative images)
- Every form control has an associated `<label>` (wrap the control, or link with `for` / `id`)
- Every `<button>` / `<a>` needs discernible text (visible text or an `aria-label`) — an icon-only
  control with no text fails `button-name` / `link-name`
- Prefer real `<button>` / `<a>` for interactions. If you put `(click)` on a non-interactive element, also add a keyboard handler (`(keydown)` / `(keyup)`), a `role`, and `tabindex`
- Use only valid ARIA: correct `aria-*` names and values, plus the ARIA required by any `role` you set
- Do not use `autofocus`, `<marquee>` / `<blink>`, or empty headings/anchors; give every `<th>` a `scope`
