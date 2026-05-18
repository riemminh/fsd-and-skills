---
name: project-conventions
description: Stack, folder tree, import aliases, feature layout. Use for onboarding, new routes/features, edits under src.
disable-model-invocation: true
priority: high
triggerKeywords: [structure, folder, import, alias, convention, architecture, where, organize]
---

**🔹 Load:** For any change under `src/`, onboarding, or when unsure where to put files.

# Project Conventions

## Stack

- **Next.js** 16 - App Router (`src/app/`)
- **React** 19, **TS** strict
- **React Query** v5 - `QueryProvider` in `src/core/providers/query-provider.tsx`
- **Axios** - `src/core/api/client.ts` (Bearer token, 401)
- **RHF + Zod** - forms/validation
- **Tailwind** v4 - `globals.css`, `dark` class in `layout.tsx`

## Directory Tree

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

## Dependency Layers

```
app/ → features/ → shared/ → core/ → config/
```

- Higher imports lower only
- **Features don't import other features** (use `shared/` or lift logic)

## Request Flow

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

## Import Aliases

- `@/` → `src/`
- `@/features/auth` → auth feature
- `@/shared/components/ui` → UI kit
- `@/config` → constants

## Priority

1. `business-rules` (domain logic)
2. This skill (repo conventions)

## Canonical Source

See `docs/ARCHITECTURE.md` for full details.

## Pair With

- `business-rules` (orders, roles, permissions)
- `data-fetching` (cache, keys, invalidation)
