# Async action UX

For Submit/Save/Confirm calling backend:

1. **Loading** — `disabled={mutation.isPending}`, `Loader2` + `animate-spin`
2. **Success** — `toast.success(...)`; close dialog / reset form if needed
3. **Failure** — `toast.error(...)` global; field errors for RHF+Zod

**Reference:** `src/features/orders/components/cancel-order-dialog.tsx`

## Spacing & typography

- Tailwind v4 (PostCSS), scale `p-4`, `gap-2`
- Body: `inter.className`; sans: Geist (`--font-sans`)
