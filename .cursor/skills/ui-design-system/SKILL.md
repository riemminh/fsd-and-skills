---
name: ui-design-system
description: >-
  UI and UX for order-management — Tailwind, dark mode, shared/components/ui, typography, layout, dialogs.
  Async-action UX (submit/confirm + API): loading on control and success/error feedback — see references/async-action-ux.md.
  Triggers (EN): button, dialog, form, mutation, loading, toast.
  Triggers (VI): nút, dialog, form, gọi API, loading, thông báo.
  Pair with project-conventions for import paths.
---

# UI & design system (repo)

## When to use

- Add/edit screens under `src/app/**`, components in `src/features/**/components`, or `src/shared/components/ui/**`.
- Adjust spacing, typography, theme (`dark` class on `<html>` in `layout.tsx`).
- Submit / Save / Confirm that calls an API — read [async-action-ux.md](references/async-action-ux.md) for checklist and repo patterns.

## Conventions

- Use primitives from `@/shared/components/ui/*` when they exist (shadcn-style Button, Card, Tabs, Sheet, etc.).
- `cn()` from `@/shared/utils` to merge Tailwind classes.
- Fonts: Geist + Inter in `layout.tsx` — keep consistent when adding headings.

## Details

- [spacing-and-typography.md](references/spacing-and-typography.md)
- [async-action-ux.md](references/async-action-ux.md) — UX baseline for mutations / async submit (loading, `sonner` success/error).

## Pair with

- `forms-and-validation` — complex forms (RHF + Zod).
- `data-fetching` — mutations and invalidation; keep feedback aligned with `async-action-ux.md`.
- `react-next-baseline` — if the issue is large lists / dynamic import (rare for small UI tweaks).

## Example prompt

```text
Add empty state for order list per ui-design-system; do not invent raw components if they already exist under shared/components/ui.
```

```text
Save button POSTs order: read references/async-action-ux.md + data-fetching.
```
