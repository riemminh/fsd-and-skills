# Orders & RBAC (detail)

## Order domain

**Status:** `pending` | `processing` | `shipped` | `delivered` | `cancelled`

**Invariants:**

- Don't skip intermediate steps in transitions
- `cancelled` can't return to active without explicit flow

**Money:** `subtotal`, `tax`, `shipping`, `total` — consistent with `items[]` (qty × price); watch rounding.

**Inputs:** `CreateOrderInput` — `customerId`, `items`, `shippingAddress`, `paymentMethod`, optional `notes`. `UpdateOrderInput` — `status`, `items`, address, notes.

**History:** status change → `timestamp`, `user`, optional `note`

**Sources:** `src/features/orders/types/`, `order-status.ts`, `order-calculations.ts`

## Roles & permissions

**Roles:** `admin` | `manager` | `viewer`

| Action | admin | manager | viewer |
| ------ | ----- | ------- | ------ |
| View `/orders` | ✓ | ✓ | ✓ |
| Create order | ✓ | ✓ | ✗ |
| Edit order | ✓ | ✓ | ✗ |
| Cancel order | ✓ | ✓* | ✗ |

\*Cancel only when `pending` or `processing`

**Demo:** `admin@example.com` (full), `manager@example.com` (create/edit), `viewer@example.com` (read)

**ProtectedRoute:** `src/shared/components/common/protected-route.tsx` — no auth → `/login`; wrong role → `/orders`; omit `allowedRoles` → auth only.

**Auth:** token `localStorage.auth_token`, user `localStorage.user`, Bearer header, `useUserRole()` from `@/features/auth/hooks/use-auth`

**Cancel/edit:** `src/features/orders/utils/order-status.ts` — UI drawer stricter (cancel only `pending|processing`)
