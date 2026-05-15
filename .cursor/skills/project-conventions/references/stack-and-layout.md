# Stack & repo map (quick overview)

Feature-based architecture detail: [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md).

## Stack

- **Next.js** `^16` — App Router under `src/app/`
- **React** 19, **TypeScript** strict
- **TanStack React Query** v5 — `QueryProvider` in `src/core/providers/query-provider.tsx`
- **Axios** — `src/core/api/client.ts` (interceptors, Bearer token, 401)
- **React Hook Form + Zod** — forms / validation
- **Tailwind CSS** v4 — `globals.css`, `dark` class on `<html>` in `layout.tsx`

## Important directory tree

```
src/
├── app/                    # Routes: page.tsx per URL
│   ├── layout.tsx          # Root layout, fonts, Providers
│   ├── page.tsx            # Home
│   ├── login/
│   └── orders/             # List + create
├── config/                 # env, constants (ROUTES, QUERY_KEYS, API_CONFIG)
├── core/
│   ├── api/                # ApiClient, types
│   └── providers/          # QueryProvider + Providers
├── contexts/               # (legacy may remain; prefer @/features/auth)
├── features/               # Domains: auth, customers, orders, products
├── services/               # service layer (some flows still use it)
├── shared/                 # UI kit, hooks, utils, shared types
└── types/                  # user, order, product, form (partial overlap with features)
```

## Typical request flow

1. Component calls a hook in `features/<x>/hooks/` (React Query).
2. Hook calls `*.api.ts` in the same feature or `services/*.service.ts` depending on existing pattern.
3. HTTP goes through `ApiClient` (`@/core/api`) — base URL from `API_CONFIG` / `env.apiUrl`.

## Env (quick reminder)

- `NEXT_PUBLIC_API_URL` (fallback in `env.ts`, e.g. `http://localhost:3000/api`)
- `NEXT_PUBLIC_ENABLE_DEV_TOOLS`, `NEXT_PUBLIC_ENABLE_MOCK_DATA`

## When to read this file

- First time in the repo, onboarding.
- Refactors across layers; before adding a route or feature.
- Need **stack** and **where files live** fast — alias / barrel / import layers: [naming-and-imports.md](naming-and-imports.md) and [architecture-layers.md](architecture-layers.md).

## Other skills (combine)

| Need | Read also |
|------|-----------|
| Cache, keys, invalidation | `data-fetching` |
| Orders, roles, permissions | `business-rules` |
| React/Next perf | `react-next-baseline` |
