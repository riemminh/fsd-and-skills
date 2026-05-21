---
name: data-fetching
description: Use for React Query, query keys, cache, stale/refetch behavior, loading states, mutations, API calls, axios, and invalidateQueries bugs in this repo. Not for business rules.
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
