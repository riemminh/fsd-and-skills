---
name: business-rules
description: Use for order business rules in this repo, including status transitions, payment, cancellation, timeline, roles, permissions, admin/manager/viewer RBAC, money, totals, and tax. Not for generic UI.
---

# Business Rules

**Correctness over optimization** for order state and money.

## When

`OrderStatus` transitions · roles/`ProtectedRoute` · `total`/`tax`/`items[]` consistency

## Core invariants

- Status: `pending` → `processing` → `shipped` → `delivered`; `cancelled` is terminal
- Money must match line items; don't skip workflow steps

## On demand

Matrix, demo accounts, auth keys, cancel rules: `references/project/orders-rbac.md`

Sources: `src/features/orders/types/`, `order-status.ts`, `order-calculations.ts`
