# Components & hooks

Source: **[docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md)** (Component Organization + Data Flow).

## `"use client"`

- At top of file when using hooks, event handlers, or React Query in that component.
- `src/core/providers/*` are client (already have `"use client"`).
- `src/app/layout.tsx` is a Server Component — wrap with `Providers` from `@/core/providers`.

## Providers

- `QueryClientProvider` in `src/core/providers/query-provider.tsx`, composed in `Providers` (`src/core/providers/index.tsx`).

## Shared UI (per ARCHITECTURE)

- **`src/shared/components/ui/`** — primitives (shadcn-style): button, input, dialog, …
- **`src/shared/components/common/`** — reusable “business UI” (empty state, error boundary, spinner, …).
- **`src/shared/components/layout/`** — shared layout (if present).

## Shared hooks

- **`src/shared/hooks/`** — reusable hooks (`use-debounce`, `use-local-storage`, …). Example: `import { useDebounce } from "@/shared/hooks"` (or via barrel if the project centralizes exports).

## Hooks & API inside a feature

- React Query hooks: `src/features/<domain>/hooks/use-*.ts`.
- API module: `src/features/<domain>/api/*.api.ts`.

Suggested flow (ARCHITECTURE): define API → `useQuery` / `useMutation` hook → use in feature components.

## Auth (prefer feature architecture)

- **Per ARCHITECTURE:** use public API **`@/features/auth`** (hooks like `useLogin`, `useCurrentUser`, …).
- **`src/contexts/auth-context.tsx`:** may still exist but **avoid growing** a parallel Context pattern alongside React Query auth — when editing auth, check which path pages/layouts use and consolidate.

## Utilities

- `cn()` and formatters: `@/shared/utils`.
