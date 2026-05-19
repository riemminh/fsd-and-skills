# Feature: products

Root: `src/features/products`  
Public API: `src/features/products/index.ts`

## When To Open This

- Prompt mentions `products`.
- Route ownership table in `.repo-knowledge/AGENT_MAP.md` points here.
- A flow file lists this feature as related context.

## Read First

- `src/features/products/index.ts`
- `src/features/products/types/index.ts`
- `src/features/products/api/products.api.ts`
- `src/features/products/hooks/use-products.ts`
- `src/features/products/components/ProductList.tsx`
- `src/features/products/utils/stock-management.ts`

## Segments

- `_root`: 1 files
- `api`: 2 files
- `components`: 4 files
- `hooks`: 3 files
- `types`: 1 files
- `utils`: 2 files

## Routes Using This Feature

- `/products` -> `src/app/products/page.tsx`
- `/products/[id]/edit` -> `src/app/products/[id]/edit/page.tsx`
- `/products/create` -> `src/app/products/create/page.tsx`

## External Feature Imports

- none

## Architecture Debt Notes

These replace the old `violations.json`. They exist so agents know which current imports are migration debt and should not be copied into new work.

- none

## Import Guidance

- Outside this feature, import from `src/features/products/index.ts`.
- Inside this feature, prefer relative imports.
- Do not add new legacy imports from `@/components`, `@/hooks`, `@/services`, `@/types`, or `@/lib`.
