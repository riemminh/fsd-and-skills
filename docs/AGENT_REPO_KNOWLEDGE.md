# Agent Repo Knowledge

This repo has a generated knowledge cache for coding agents. It is meant to answer:

- Which route or feature owns a prompt?
- Which files should the agent read first?
- Which imports are current architecture debt rather than patterns to copy?
- Which flow-specific business rules are relevant before editing?

## Generate The Cache

```bash
pnpm repo:index
```

The command writes:

```txt
.repo-knowledge/
  AGENT_MAP.md
  features/
    README.md
    orders.md
    products.md
    customers.md
    auth.md
  flows/
    create-order.md
```

Run it after changing routes, feature boundaries, or major imports.

## How Agents Should Use It

1. Start with `.repo-knowledge/AGENT_MAP.md`.
2. If the prompt matches a flow trigger, open only that flow file.
3. If the prompt names a route or domain, open only the matching `.repo-knowledge/features/<feature>.md`.
4. Use the feature file's `Read First` list before editing source.
5. Treat `Architecture Debt Notes` as guardrails: they show current migration debt, not patterns to copy.
6. If generated context conflicts with a hand-written doc, inspect the source file and update the cache.

## Why Debt Notes Exist

Older versions generated `violations.json`. That was useful but too noisy. The same signal now lives inside each feature as `Architecture Debt Notes`.

They answer one question: "is this import/path a pattern to follow or existing debt to avoid?"

Examples:

- Cross-feature import: useful to know current coupling, but avoid adding more unless the boundary is intentionally redesigned.
- Legacy import: useful to avoid copying `@/components`, `@/types`, `@/services`, or `@/hooks` into new feature work.
- Feature self deep import: use relative imports inside the same feature.

## Practical Example

Prompt:

```txt
Fix create order total and status.
```

Use:

```txt
.repo-knowledge/flows/create-order.md
.repo-knowledge/features/orders.md
```

Then inspect:

```txt
src/app/orders/create/page.tsx
src/features/orders/hooks/use-orders.ts
src/features/orders/api/orders.api.ts
src/features/orders/utils/order-calculations.ts
src/features/orders/schemas/create-order.schema.ts
src/features/orders/types/index.ts
```

Expected agent behavior:

- Keep the route thin.
- Prefer canonical feature files over legacy `src/types` or `src/components` imports for new work.
- Use order calculation helpers for subtotal, tax, shipping, and total.
- Keep new order status aligned with business rules.
- Avoid introducing new cross-feature imports unless the architecture decision is explicit.

## Current Scope

The first generated flow is `create-order` because it crosses route, auth, form validation, orders API, customers, products, and money rules. Add more flows when the same pattern is useful for `orders-list`, `products-stock`, or auth.
