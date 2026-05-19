# Directory tree & flow

```
src/
├── app/              # Routes (page.tsx per URL)
├── config/           # env, constants (ROUTES, QUERY_KEYS, API_CONFIG)
├── core/
│   ├── api/          # ApiClient, types
│   └── providers/    # QueryProvider + <Toaster />
├── features/         # auth, customers, orders, products
├── services/         # service layer (legacy)
├── shared/           # UI kit, layout, hooks, utils
└── types/            # user, order, product, form
```

## Request flow

1. Component → hook in `features/<x>/hooks/` (RQ)
2. Hook → `*.api.ts` or `services/*.service.ts`
3. HTTP → `ApiClient` (`@/core/api`)

## Env

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_ENABLE_DEV_TOOLS`
- `NEXT_PUBLIC_ENABLE_MOCK_DATA`

## Global UI

- Toast: `<Toaster />` in `core/providers/index.tsx`
- QueryClient: `core/providers/query-provider.tsx`

Full doc: `docs/ARCHITECTURE.md`
