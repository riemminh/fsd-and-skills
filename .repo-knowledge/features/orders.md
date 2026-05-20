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

## Architecture Debt Counts

- `cross-feature-import`: 10
- `feature-self-deep-import`: 1
- `legacy-import`: 1

## Import Guidance

- Outside this feature, import from `src/features/orders/index.ts`.
- Inside this feature, prefer relative imports.
- Do not add new legacy imports from `@/components`, `@/contexts`, `@/hooks`, `@/lib`, `@/services`, `@/types`.
- Search only this feature/root files unless a flow file says otherwise.
- Skip grep/read/edit for out-of-scope legacy roots unless named: `src/components`, `src/contexts`, `src/hooks`, `src/lib`, `src/services`, `src/types`.
