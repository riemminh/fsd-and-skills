---
name: business-rules
description: Order status, payments, RBAC (admin/manager/viewer), permissions. Use for order logic, cancel, timeline, role bugs.
disable-model-invocation: true
priority: high
triggerKeywords:
  [order, status, payment, cancel, role, permission, admin, manager, viewer, money, total, tax]
---

**🔹 Load:** When changing order logic, RBAC, money calculations, or status workflows.

# Business Rules

## Use When

- `OrderStatus` changes (pending → delivered, cancel, timeline)
- Roles/permissions (`user.role`, `ProtectedRoute`, `/orders/create`)
- Money fields (`total`, `tax`, `shipping`, line items)
- Any behavior affecting money or order state

## Priority

**Correct business logic** beats framework optimization.

---

## Order Domain

**Status:** `pending` | `processing` | `shipped` | `delivered` | `cancelled`

**Invariants:**

- Don't skip intermediate steps in transitions
- `cancelled` can't return to active without explicit flow

**Money Fields:** `subtotal`, `tax`, `shipping`, `total`

- Must stay consistent with `items[]` (quantity × price)
- Check rounding and currency units

**Create/Update:**

- `CreateOrderInput`: `customerId`, `items`, `shippingAddress`, `paymentMethod`, optional `notes`
- `UpdateOrderInput`: can change `status`, `items`, address, notes

**History:** Each status change records `timestamp`, `user`, optional `note`

**Sources:** `src/features/orders/types/`, `order-status.ts`, `order-calculations.ts`

---

## Permissions & Roles

**Roles:** `admin` | `manager` | `viewer`

**Demo Accounts:**

- `admin@example.com` - Full access
- `manager@example.com` - Create/edit orders
- `viewer@example.com` - Read-only

**Permission Matrix:**

| Action         | admin | manager | viewer |
| -------------- | ----- | ------- | ------ |
| View `/orders` | ✓     | ✓       | ✓      |
| Create order   | ✓     | ✓       | ✗      |
| Edit order     | ✓     | ✓       | ✗      |
| Cancel order   | ✓     | ✓\*     | ✗      |

\*Only when status is `pending` or `processing`

**ProtectedRoute:** `src/shared/components/common/protected-route.tsx`

- Not logged in → `/login`
- Wrong role → `/orders`
- Omit `allowedRoles` → auth check only

**Auth:**

- Token: `localStorage.auth_token`
- User: `localStorage.user`
- API: `Authorization: Bearer` header
- Hook: `useUserRole()` from `@/features/auth/hooks/use-auth`

**Cancel/Edit Logic:**

- Utils: `src/features/orders/utils/order-status.ts`
- UI stricter than utils: drawer only allows cancel for `pending|processing`

---

## Example

"Fix order cancel: read business-rules first, then edit features/orders. Don't optimize perf until logic is correct."
