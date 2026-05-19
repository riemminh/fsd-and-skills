---
name: ui-design-system
description: Shared UI primitives, Tailwind/dark mode, mutation loading+toast. Use for screens/components under app, features, shared/ui — not API logic.
disable-model-invocation: true
priority: medium
triggerKeywords: [ui, button, form, dialog, toast, loading, style, tailwind, component, design]
---

# UI & Design System

- Primitives: `@/shared/components/ui/*` · `cn()` from `@/shared/utils`
- Fonts: Geist + Inter (`layout.tsx`) · dark: `dark` on `<html>`

## Async actions

`disabled={mutation.isPending}` · spinner · `toast.success/error` (sonner)

Detail: `async-ux.md` · Example: `cancel-order-dialog.tsx`

Pair: `forms-and-validation` · `data-fetching`
