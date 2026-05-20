# Feature: customers

Root: `src/features/customers`  
Public API: `src/features/customers/index.ts`

## When To Open This

- Prompt mentions `customers`.
- Route ownership table in `.repo-knowledge/AGENT_MAP.md` points here.
- A flow file lists this feature as related context.

## Read First

- `src/features/customers/index.ts`
- `src/features/customers/types/index.ts`
- `src/features/customers/api/customers.api.ts`
- `src/features/customers/hooks/use-customers.ts`

## Segments

- `_root`: 1 files
- `api`: 2 files
- `hooks`: 2 files
- `types`: 1 files

## Routes Using This Feature

- `/orders/create` -> `src/app/orders/create/page.tsx`

## External Feature Imports

- none

## Architecture Debt Counts

- none

## Import Guidance

- Outside this feature, import from `src/features/customers/index.ts`.
- Inside this feature, prefer relative imports.
- Do not add new legacy imports from `@/components`, `@/contexts`, `@/hooks`, `@/lib`, `@/services`, `@/types`.
- Search only this feature/root files unless a flow file says otherwise.
- Skip grep/read/edit for out-of-scope legacy roots unless named: `src/components`, `src/contexts`, `src/hooks`, `src/lib`, `src/services`, `src/types`.
