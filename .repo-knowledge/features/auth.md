# Feature: auth

Root: `src/features/auth`  
Public API: `src/features/auth/index.ts`

## When To Open This

- Prompt mentions `auth`.
- Route ownership table in `.repo-knowledge/AGENT_MAP.md` points here.
- A flow file lists this feature as related context.

## Read First

- `src/features/auth/index.ts`
- `src/features/auth/types/index.ts`
- `src/features/auth/api/auth.api.ts`
- `src/features/auth/hooks/use-auth.ts`

## Segments

- `_root`: 1 files
- `api`: 2 files
- `hooks`: 2 files
- `types`: 1 files

## Routes Using This Feature

- `/` -> `src/app/page.tsx`
- `/dashboard` -> `src/app/dashboard/page.tsx`
- `/login` -> `src/app/login/page.tsx`
- `/orders` -> `src/app/orders/page.tsx`
- `/orders/create` -> `src/app/orders/create/page.tsx`

## External Feature Imports

- none

## Architecture Debt Notes

These replace the old `violations.json`. They exist so agents know which current imports are migration debt and should not be copied into new work.

- none

## Import Guidance

- Outside this feature, import from `src/features/auth/index.ts`.
- Inside this feature, prefer relative imports.
- Do not add new legacy imports from `@/components`, `@/hooks`, `@/services`, `@/types`, or `@/lib`.
