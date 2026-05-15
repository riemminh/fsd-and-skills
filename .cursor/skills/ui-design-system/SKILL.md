---
name: ui-design-system
description: UI for order-management — Tailwind, dark mode, components in shared/components/ui, typography. Use when adjusting layout, form controls, tables, dialogs; pair with project-conventions for import paths.
---

# UI & design system (repo)

## When to use

- Add/edit screens under `src/app/**`, components in `src/features/**/components`, or `src/shared/components/ui/**`.
- Adjust spacing, typography, theme (`dark` class on `<html>` in `layout.tsx`).

## Conventions

- Use primitives from `@/shared/components/ui/*` when they exist (shadcn-style Button, Card, Tabs, Sheet, etc.).
- `cn()` from `@/shared/utils` to merge Tailwind classes.
- Fonts: Geist + Inter in `layout.tsx` — keep consistent when adding headings.

## Details

- [spacing-and-typography.md](references/spacing-and-typography.md)

## Pair with

- `forms-and-validation` — complex forms (RHF + Zod).
- `react-next-baseline` — if the issue is large lists / dynamic import (rare for small UI tweaks).

## Example prompt

```text
Add empty state for order list per ui-design-system; do not invent raw components if they already exist under shared/components/ui.
```
