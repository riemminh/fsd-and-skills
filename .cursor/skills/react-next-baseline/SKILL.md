---
name: react-next-baseline
description: React/Next baseline (Vercel). Agent reads references/vercel-SKILL-excerpt.md then only 1–3 files under vendor/rules/<rule>.md — not the whole vendor/. Use for perf, bundle, fetch, re-render, RSC boundary. Upstream: vercel-react-best-practices.
---

# React / Next baseline (Vercel)

## Role in this repo

This is the **framework baseline**; it does not replace `project-conventions` (aliases, feature folders) or `business-rules`.

**When they conflict:** team `business-rules` and `project-conventions` **win** over Vercel docs.

## Save tokens — required reading flow

**Do not** (unless the user explicitly asks to “read the full baseline” / full audit):

- Read `vendor/AGENTS.md` or all of `vendor/SKILL.md`.
- `list_dir` / `glob` all of `vendor/rules/` and open many files.
- Treat “open react-next-baseline skill” as loading all upstream content.

**Correct flow:**

1. Read **this skill file** (`react-next-baseline/SKILL.md`) — role + table below only.
2. Read **[references/vercel-SKILL-excerpt.md](references/vercel-SKILL-excerpt.md)** — pick prefix / rule matching symptoms (index lists files under `vendor/rules/`).
3. Open **only** the chosen `vendor/rules/<rule>.md` files (usually **1–3** per change).

Per-rule detail **only** lives in `vendor/rules/*.md`. `vendor/SKILL.md` and `vendor/AGENTS.md` are long upstream compilations — **not** the default agent step in this repo.

## How to sync upstream content

**Full copy already in repo:** **`vendor/`** (from `vercel-labs/agent-skills` / `skills/react-best-practices`). Update commands and URLs: [references/upstream-links.md](references/upstream-links.md).

**Optional — CLI:**

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

## When to open this skill

- Suspected unnecessary sequential `await` **waterfall**.
- **Bundle** bloat (dynamic import, barrel imports).
- Extra **re-renders**, wrong memo/useMemo placement.
- **Server vs Client** component tuning, fewer serialized props to the client.

## Files under `references/`

| File | Purpose |
|------|---------|
| `vercel-SKILL-excerpt.md` | **Always read first** when you need a rule: index + token policy + symptom hints. |
| `upstream-links.md` | Refresh `vendor/` from GitHub; not day-to-day business docs. |

## `vendor/` directory (upstream copy)

- **Per-rule detail (read on purpose):** `vendor/rules/<rule-name>.md`.
- `vendor/SKILL.md`, `vendor/AGENTS.md`: for humans / full audits; agent skips by default (see “Save tokens”).

## Pair with

- **`data-fetching`**: baseline covers generic client/server patterns; repo adds React Query keys, `QueryProvider`, staleTime.
- **Tables / lists** (e.g. `features/orders/components/order-table.tsx`): pick rule names in `references/vercel-SKILL-excerpt.md`, then open matching `vendor/rules/<rule>.md` (groups **`rerender-*`**, **`rendering-*`**, **`bundle-*`** — no separate perf-only skill in repo).
