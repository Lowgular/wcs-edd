---
capability: formatting
title: Display formatting
summary: Format data with built-in pipes, not component methods.
triggers: [format, currency, date, number, pipe, percent, uppercase]
rules:
  - wcs/prefer-built-in-pipe
ratings:
  - prefer-built-in-pipes
---

- Formatting in templates MUST prioritize the built-in pipes (`currency`, `number`, `date`, `percent`, `uppercase`/`lowercase`, …) or a custom pure pipe (a class implementing `PipeTransform`)
- Do NOT bloat components with pure methods whose only job is to format a value for display (`toFixed`, `toLocaleDateString`, `toUpperCase`, …) — that belongs in a pipe
