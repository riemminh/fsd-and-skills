# Feature: orders

Root: `src/features/orders`  
Public API: `src/features/orders/index.ts`

## When To Open This

- Prompt mentions `orders`.
- Route ownership table in `.repo-knowledge/AGENT_MAP.md` points here.
- A flow file lists this feature as related context.

## Read First

- `src/features/orders/index.ts`
- `src/features/orders/types/index.ts`
- `src/features/orders/schemas/create-order.schema.ts`
- `src/features/orders/api/orders.api.ts`
- `src/features/orders/hooks/use-orders.ts`
- `src/features/orders/components/order-list.tsx`
- `src/features/orders/utils/order-calculations.ts`

## Segments

- `_root`: 1 files
- `api`: 2 files
- `components`: 23 files
- `hooks`: 4 files
- `schemas`: 2 files
- `types`: 1 files
- `utils`: 4 files

## Routes Using This Feature

- `/dashboard` -> `src/app/dashboard/page.tsx`
- `/orders` -> `src/app/orders/page.tsx`
- `/orders/create` -> `src/app/orders/create/page.tsx`

## External Feature Imports

- `auth`
- `customers`
- `products`

## Architecture Debt Notes

These replace the old `violations.json`. They exist so agents know which current imports are migration debt and should not be copied into new work.

- `cross-feature-import`: 10
  - `src/features/orders/api/orders.api.ts` imports `@/features/products/api`
  - `src/features/orders/components/customer-combobox.tsx` imports `@/features/customers`
  - `src/features/orders/components/order-detail-drawer.tsx` imports `@/features/auth`
  - `src/features/orders/components/order-items-field.tsx` imports `@/features/products`
  - `src/features/orders/components/order-list.tsx` imports `@/features/auth`
  - `src/features/orders/components/order-operations-dashboard.tsx` imports `@/features/products`
  - `src/features/orders/components/product-combobox.tsx` imports `@/features/products`
  - `src/features/orders/components/stock-availability-indicator.tsx` imports `@/features/products`
  - ...2 more
- `feature-self-deep-import`: 1
  - `src/features/orders/utils/order-stock-integration.ts` imports `@/features/orders/types`
- `legacy-import`: 1
  - `src/features/orders/components/order-items-field.tsx` imports `@/types/form`

## Import Guidance

- Outside this feature, import from `src/features/orders/index.ts`.
- Inside this feature, prefer relative imports.
- Do not add new legacy imports from `@/components`, `@/hooks`, `@/services`, `@/types`, or `@/lib`.
