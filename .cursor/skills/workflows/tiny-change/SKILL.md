---
name: tiny-change
description: Trivial edits in order-management — typo, one constant, one import, single obvious line. Skip long workflow Step 0; skip extra skills unless domain (orders, auth, payments).
---

# Workflow: Tiny change

## When to use

- **Single obvious edit** in known file(s): typo, rename one symbol, one constant, fix one import path.
- User says: quick / one line / trivial / just fix … (and scope is clear).

## Do not use

- Need **repro steps**, multi-file hunt, or unclear root cause → `workflows/fix-bug-default`.
- **New or changed product behavior** (column, filter, flow) → `workflows/feature-shipping`.

## Rules

- Touch **only** files the user named; no drive-by formatting or cleanup.
- **Do not** read `react-next-baseline` vendor files unless the user asks perf/bundle/React baseline.
- **Do not** read `ui-design-system/references/async-action-ux.md` unless the edit is a **submit / confirm / mutation** control.
- **Do not** read `react-next-baseline/references/vercel-SKILL-excerpt.md` unless the user mentions **perf, re-render, bundle, waterfall, RSC**.

If the touched file is under **orders, payments, cancel, timeline, roles** → quickly skim `business-rules` _before_ editing.

## Verify

- **ReadLints** on changed files.
- Run **`pnpm type-check` once** then **`pnpm lint` once** only when TypeScript/logic changed or the repo’s CI always expects it; **pure copy/typo** may skip full commands if lints are clean — say what you skipped.
