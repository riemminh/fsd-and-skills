---
name: forms-and-validation
description: React Hook Form, Zod, resolver, error messages in order-management. Use when creating/editing forms (login, create order, edit dialog), schemas, async submit.
---

# Forms & validation

## When to use

- Files using `useForm`, `z.object`, `@hookform/resolvers/zod`.
- User-visible errors (field-level vs form-level).

## Stack in repo

- `react-hook-form`, `zod`, `@hookform/resolvers`

## Conventions

- Keep Zod schema next to the form or under `types`/`schemas` if reused — **single source of truth** for type inference when possible.
- Async submit: handle API errors (toast `sonner` is in deps — follow existing patterns).

## Pair with

- `ui-design-system` — Input, Label, form layout.
- `business-rules` — business validation (e.g. do not submit empty items if domain forbids it).
- `data-fetching` — invalidate after successful submit.

## Example prompt

```text
Add notes field to create order: forms-and-validation + business-rules; keep bilingual error messages only if the project requires it (not documented — ask user).
```
