---
name: data-fetching
description: React Query and API client in order-management — QueryProvider defaults, feature hooks, axios client, API URL env. Use when fixing cache, loading, refetch, or mutations after order actions.
---

# Data fetching (React Query + Axios)

## When to use

- Add/edit `use*` hooks under `src/features/*/hooks/`.
- Change `staleTime`, `gcTime`, `retry`, devtools.
- Errors after mutation (invalidate query), double fetch, hydration (if SSR data is added later).

## Architecture (existing)

- `QueryClient` created in `QueryProvider` with defaults:
  - `staleTime: 60_000`, `gcTime: 5 * 60_000`, `refetchOnWindowFocus: false`, `retry: 1`
- Devtools: enabled when `env.isDevelopment && env.enableDevTools`
- HTTP: `src/core/api/client.ts` + `API_CONFIG` from `@/config`

## Details

- [cache-and-keys.md](references/cache-and-keys.md)

## Pair with

- `react-next-baseline` — waterfall, parallel fetch, serialized props: `react-next-baseline/references/vercel-SKILL-excerpt.md` then only `vendor/rules/<rule>.md` that apply (do not read all of `vendor/`).
- `business-rules` — after mutations, order state must be correct on server/client.
- `security-frontend` — token header; do not log sensitive responses.

## Example prompt

```text
Fix useOrders: after cancel order refetch list; read data-fetching + business-rules. Do not change global QueryClient defaults unless asked.
```
