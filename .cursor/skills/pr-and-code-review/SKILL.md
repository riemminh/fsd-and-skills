---
name: pr-and-code-review
description: PR review checklist for order-management — scope, lint, types, business logic, security. Use when reviewing a diff or before merge.
---

# PR & code review

## When to use

- “Review changes”, “any risks”, before merging a PR.

## Short checklist

- [ ] Diff **matches** PR description / request (no drive-by refactors).
- [ ] `pnpm lint` / `pnpm type-check` if TS changed.
- [ ] Touches `business-rules`? — order / money invariants.
- [ ] Token / PII / `NEXT_PUBLIC` — `security-frontend`.
- [ ] React Query keys & invalidation — `data-fetching`.
- [ ] UI consistency — `ui-design-system`.

## Pair with

- `agent-coding-discipline` — surgical diffs, simplification.
- `react-next-baseline` — if the PR is a large perf change.

## Example prompt

```text
Review current branch with pr-and-code-review + business-rules for the orders parts.
```
