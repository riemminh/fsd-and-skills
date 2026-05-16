# Static verify (once at end)

Shared by `workflows/fix-bug-default` and `workflows/feature-shipping`. **Do not duplicate this table** inside those files — link here.

**Goal:** one verification pass at the end. Repeated `pnpm type-check` / `pnpm lint` inflate context (shell output) and cost tokens without improving quality.

| Phase               | Do                                                                                 | Do not                                                              |
| ------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **While editing**   | Use IDE **ReadLints** on files you changed                                         | Run `tsc` / `eslint` after every small edit                         |
| **After all edits** | Run **`pnpm type-check` once**, then **`pnpm lint` once** (only if scripts exist)  | Full project lint **and** per-file eslint in the same task          |
| **On failure**      | Fix **all** reported issues in scope, then retry — **at most 1 retry per command** | Fix one line → type-check → fix one line → type-check               |
| **On success**      | Stop — do not re-run "to be sure"                                                  | Re-run because sandbox failed earlier if a later run already passed |

**Order:** finish code → `type-check` → `lint` (not interleaved with partial fixes).

**User override:** if the prompt says `skip lint` / `skip type-check`, skip those commands and say what was skipped in the closing summary.

**Checklist**

- [ ] `pnpm type-check` pass (once at end, + ≤1 retry only if it failed)
- [ ] `pnpm lint` pass (once at end, + ≤1 retry only if it failed)
