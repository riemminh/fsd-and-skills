---
name: ui-design-system
description: Tailwind, dark mode, UI components, async action UX (loading/toast). Use for screens, components, forms.
priority: medium
triggerKeywords: [ui, button, form, dialog, toast, loading, style, tailwind, component, design]
---

**🔹 Load:** When adding/editing screens, components, or async actions (submit/confirm + API).

# UI & Design System

## Use When

- Add/edit screens (`src/app/**`), components (`src/features/**/components`), or `src/shared/components/ui/**`
- Adjust spacing, typography, theme
- Submit/Save/Confirm that calls API

## Conventions

- Use primitives from `@/shared/components/ui/*` (shadcn-style Button, Card, Tabs, Sheet)
- `cn()` from `@/shared/utils` to merge Tailwind classes
- Fonts: Geist + Inter in `layout.tsx`
- Dark mode: `dark` class on `<html>` (default)

## Async Action UX (Submit/Confirm + API)

**Pattern for buttons/dialogs calling backend:**

1. **Loading** - While request in flight:
   - Disable control: `disabled={mutation.isPending}`
   - Show pending state: `Loader2` + `animate-spin`
   - Use React Query `mutation.isPending`

2. **Success** - After successful response:
   - `toast.success(...)` from `sonner`
   - Optionally close dialogs/reset forms

3. **Failure** - On error:
   - `toast.error(...)` for global failures
   - Field-level errors for RHF + Zod

**Reference:** `src/features/orders/components/cancel-order-dialog.tsx`

## Spacing & Typography

- Tailwind v4 (PostCSS)
- Standard scale: `p-4`, `gap-2`, etc.
- Body: `inter.className`
- Sans: Geist (`--font-sans`)

## Pair With

- `forms-and-validation` (RHF + Zod)
- `data-fetching` (mutations, invalidation)

## Example

"Add empty state for order list per ui-design-system; don't invent raw components if they exist under shared/components/ui."

"Save button POSTs order: read ui-design-system + data-fetching."
