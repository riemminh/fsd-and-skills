---
name: business-rules
description: Business rules and invariants for order-management — order status, payments, user roles (admin/manager/viewer), UI/route permissions. Use when changing order logic, RBAC, cancel, timeline, or role-specific bugs.
---

# Business rules (domain layer)

## When you must read this

- Changes to `OrderStatus`, workflow pending → delivered, **order cancel**, timeline.
- Changes to **roles**, **permission matrix**, buttons hidden by `user.role`, `ProtectedRoute`, `/orders/create`.
- Fields `total`, `tax`, `shipping`, line items — do not break formulas.
- Any behavior affecting **money or legal-ish order state** (per this demo app model).

## Priority

**Correct business logic** beats `react-next-baseline` (framework optimization).

## Detailed docs

- [orders-domain.md](references/orders-domain.md)
- [permissions-and-roles.md](references/permissions-and-roles.md)

## Example prompt

```text
Change shipped logic: read business-rules first, then edit features/orders. Do not optimize perf until logic is correct.
```
