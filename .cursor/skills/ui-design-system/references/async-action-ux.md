# Async actions — UX (submit / confirm + API)

Patterns for buttons or dialog actions that **call the backend**. Applies across forms, sheets, alert dialogs, inline actions.

## Baseline

1. **Loading** — While the request is in flight:
   - Disable repeat submits on the **primary** control (`disabled={mutation.isPending}` or equivalent).
   - Show a visible pending state (e.g. `Loader2` + `animate-spin` beside label — match sibling components).
   - Prefer React Query `mutation.isPending` when the action uses `useMutation`.

2. **Success** — After a successful response:
   - Show an explicit success message: `toast.success(...)` from `sonner` (already wired via `Toaster` in app providers).
   - Optionally close dialogs or reset forms — **follow the nearest existing flow** in the same feature so behavior stays consistent.

3. **Failure** — On error:
   - Use `toast.error(...)` for blocking/global failures, or field-level errors when using RHF + Zod (`forms-and-validation`).
   - Implementation (axios, mapping errors) lives in `data-fetching`; **what the user sees** still follows this doc.

## Repo reference

`src/features/orders/components/cancel-order-dialog.tsx`:

- `cancelOrderMutation.isPending` on `disabled`
- `Loader2` inside confirm action
- `toast.success` after `mutateAsync` resolves
- `toast.error` in `catch`

## Pair with

- `data-fetching` — hooks, invalidation after mutation.
- `forms-and-validation` — submit handlers and resolver errors vs toast.
