# Utility Map

Open this before writing inline money, status, stock, or fulfillment logic.

## Order Money

- `src/features/orders/utils/order-calculations.ts`
- Use for `items[].subtotal`, `subtotal`, `tax`, `shipping`, `total`, and order summaries.

## Order Status

- `src/features/orders/utils/order-status.ts`
- Use for edit/cancel checks, next statuses, labels, and status transitions.

## Order Stock Integration

- `src/features/orders/utils/order-stock-integration.ts`
- Use for order creation stock update, cancellation restore, and fulfillment checks.

## Product Stock

- `src/features/products/utils/stock-management.ts`
- Use for stock status, availability, low/out-of-stock filtering, and stock add/subtract.

## Guardrail

Prefer these helpers over new inline calculations in API, hooks, or components.
