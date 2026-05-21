---
name: ui-design-system
description: Use for UI, buttons, forms, dialogs, toast, loading states, styling, Tailwind, components, shared UI primitives, and design-system work under app, features, or shared/ui in this repo. Not for API logic.
---

# UI & Design System

- Primitives: `@/shared/components/ui/*` · `cn()` from `@/shared/utils`
- Fonts: Geist + Inter (`layout.tsx`) · dark: `dark` on `<html>`

## Async actions

`disabled={mutation.isPending}` · spinner · `toast.success/error` (sonner)

Detail: `references/project/async-ux.md` · Example: `cancel-order-dialog.tsx`

Pair: `forms-and-validation` · `data-fetching`
