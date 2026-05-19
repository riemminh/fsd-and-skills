---
name: data-fetching
description: React Query hooks, QUERY_KEYS, invalidate after mutations. Use for cache/stale/refetch/mutation bugs — not business rules.
disable-model-invocation: true
priority: medium
triggerKeywords: [query, cache, fetch, refetch, loading, mutation, api, axios, invalidate]
---

# Data Fetching

## Defaults (`query-provider.tsx`)

`staleTime` 60s · `gcTime` 5m · `refetchOnWindowFocus: false` · `retry: 1` · devtools if `env.isDevelopment && env.enableDevTools`

## Keys (`@/config` constants)

`QUERY_KEYS.ORDERS` — `ALL`, `LIST(filters)`, `DETAIL(id)`; same for PRODUCTS, CUSTOMERS. Include filters in key segments.

## After mutations

`invalidateQueries` or `setQueryData` (optimistic needs `business-rules`)

## Avoid

Broad invalidation · `refetchOnWindowFocus: true` without reason · hardcoded URLs (use `ApiClient`)

HTTP: `core/api/client.ts` · Pair: `security-frontend` (Bearer)
