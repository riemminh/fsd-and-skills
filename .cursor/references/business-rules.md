---
name: business-rules
description: Order status transitions, money fields, RBAC admin/manager/viewer. Use for cancel, timeline, roles, totals — not generic UI.
disable-model-invocation: true
priority: high
triggerKeywords:
  [order, status, payment, cancel, role, permission, admin, manager, viewer, money, total, tax]
---

# Business Rules

**Correctness over optimization** for order state and money.

## When

`OrderStatus` transitions · roles/`ProtectedRoute` · `total`/`tax`/`items[]` consistency

## Core invariants

- Status: `pending` → `processing` → `shipped` → `delivered`; `cancelled` is terminal
- Money must match line items; don't skip workflow steps

## On demand

Matrix, demo accounts, auth keys, cancel rules: `orders-rbac.md`

Sources: `src/features/orders/types/`, `order-status.ts`, `order-calculations.ts`
