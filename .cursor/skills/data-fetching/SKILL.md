---
name: data-fetching
description: React Query + Axios - QueryProvider, hooks, cache, mutations. Use for cache, loading, refetch issues.
priority: medium
triggerKeywords: [query, cache, fetch, refetch, loading, mutation, api, axios, invalidate]
---

**🔹 Load:** When fixing cache, loading, refetch, or mutations after order actions.

# Data Fetching (RQ + Axios)

## Use When

- Add/edit `use*` hooks under `src/features/*/hooks/`
- Change `staleTime`, `gcTime`, `retry`, devtools
- Errors after mutation (invalidate query), double fetch, hydration

## Architecture

**QueryClient** (`src/core/providers/query-provider.tsx`):

- `staleTime: 60_000` (1 min)
- `gcTime: 5 * 60_000` (5 min)
- `refetchOnWindowFocus: false`
- `retry: 1`
- Devtools: enabled when `env.isDevelopment && env.enableDevTools`

**HTTP:** `src/core/api/client.ts` + `API_CONFIG` from `@/config`

## Query Keys

**Existing:** `src/config/constants.ts`

- `QUERY_KEYS.ORDERS` - `ALL`, `LIST(filters)`, `DETAIL(id)`
- Same pattern for `PRODUCTS`, `CUSTOMERS`

**Conventions:**

- Group by domain: `["orders"]`, `["orders", filters]`, `["order", id]`
- Include filters in key segment to avoid stale UI
- Reuse factories, not loose strings

## After Mutations

- `invalidateQueries` or `setQueryData` (optimistic needs `business-rules`)

## Avoid

- Keys too broad (invalidate whole app)
- `refetchOnWindowFocus: true` without reason
- Hardcoded URLs (use `ApiClient`)

## Pair With

- `business-rules` (order state correctness)
- `security-frontend` (token header)

## Example

"Fix useOrders: after cancel order refetch list; read data-fetching + business-rules. Don't change global QueryClient defaults unless asked."
