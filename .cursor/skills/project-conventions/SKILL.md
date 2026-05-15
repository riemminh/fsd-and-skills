---
name: project-conventions
description: Conventions and map for order-management — stack (Next/React Query), folder tree, data flow, import aliases, feature layout, ESLint/Prettier. Use for onboarding, new routes/features, or edits under src. Pair with react-next-baseline for general React/Next patterns.
---

# Project conventions (order-management)

## Canonical sources

- **[docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md)** — feature structure, barrel imports, dependency layers, naming; Resources links [Feature-Sliced Design](https://feature-sliced.design/). This skill **follows** that file and adds **repo drift** in `references/architecture-layers.md` (includes FSD comparison).

## When to use

- Any change under `src/`.
- **Onboarding / unfamiliar codebase** — also read [stack-and-layout.md](references/stack-and-layout.md) (stack, tree, request flow).
- When unsure **where to put a new file** or **how to import**.

**Does not** contain all React best practices — see **`react-next-baseline`**.

## Priority vs other skills

1. `business-rules` — if touching order business / permissions.  
2. **This file + `references/`** — repo conventions.  
3. `react-next-baseline` — framework optimization when it does not violate (1)(2).

## Links

- [stack-and-layout.md](references/stack-and-layout.md) — stack, `src/` tree, data flow, env (quick overview)
- [architecture-layers.md](references/architecture-layers.md) — `app → features → shared → core → config`, no feature→feature imports
- [naming-and-imports.md](references/naming-and-imports.md) — aliases, barrels, file naming
- [components-and-hooks.md](references/components-and-hooks.md) — `ui` / `common` / `layout`, shared hooks, auth via `@/features/auth`
- [testing-conventions.md](references/testing-conventions.md)

## Example prompt

```text
Follow project-conventions (add references/stack-and-layout.md if you need the map); add react-next-baseline for perf. Do not change the features/ structure.
```
