# Vercel rules index (lightweight for agents in this repo)

## Save tokens — required

1. **Read this file first** to pick a rule (prefix / filename).
2. **Only open** detail files:  
   `.cursor/skills/react-next-baseline/vendor/rules/<rule-name>.md`  
   (e.g. `rerender-memo.md`) — **max 1–3 rules** per change unless the user asks for a full perf audit.
3. **Forbidden** for normal tasks:
   - Read all of `vendor/AGENTS.md`
   - Read all of `vendor/SKILL.md`
   - List / read every file in `vendor/rules/` (no `list_dir` / `glob` of the whole folder then open each unless the user requests an audit).
4. **Per-rule detail** only lives in `vendor/rules/*.md` — no upstream URL needed for daily work.

Path from repo root:  
`.cursor/skills/react-next-baseline/vendor/rules/<rule>.md`

## Rule Categories by Priority

| Priority | Category | Prefix |
|----------|----------|--------|
| 1 | Eliminating Waterfalls | `async-` |
| 2 | Bundle Size Optimization | `bundle-` |
| 3 | Server-Side Performance | `server-` |
| 4 | Client-Side Data Fetching | `client-` |
| 5 | Re-render Optimization | `rerender-` |
| 6 | Rendering Performance | `rendering-` |
| 7 | JavaScript Performance | `js-` |
| 8 | Advanced Patterns | `advanced-` |

## Index of files in `vendor/rules/` (keep in sync with vendor)

**`async-`:** `async-api-routes.md`, `async-cheap-condition-before-await.md`, `async-defer-await.md`, `async-dependencies.md`, `async-parallel.md`, `async-suspense-boundaries.md`

**`bundle-`:** `bundle-analyzable-paths.md`, `bundle-barrel-imports.md`, `bundle-conditional.md`, `bundle-defer-third-party.md`, `bundle-dynamic-imports.md`, `bundle-preload.md`

**`server-`:** `server-after-nonblocking.md`, `server-auth-actions.md`, `server-cache-lru.md`, `server-cache-react.md`, `server-dedup-props.md`, `server-hoist-static-io.md`, `server-no-shared-module-state.md`, `server-parallel-fetching.md`, `server-parallel-nested-fetching.md`, `server-serialization.md`

**`client-`:** `client-event-listeners.md`, `client-localstorage-schema.md`, `client-passive-event-listeners.md`, `client-swr-dedup.md`

**`rerender-`:** `rerender-defer-reads.md`, `rerender-dependencies.md`, `rerender-derived-state-no-effect.md`, `rerender-derived-state.md`, `rerender-functional-setstate.md`, `rerender-lazy-state-init.md`, `rerender-memo-with-default-value.md`, `rerender-memo.md`, `rerender-move-effect-to-event.md`, `rerender-no-inline-components.md`, `rerender-simple-expression-in-memo.md`, `rerender-split-combined-hooks.md`, `rerender-transitions.md`, `rerender-use-deferred-value.md`, `rerender-use-ref-transient-values.md`

**`rendering-`:** `rendering-activity.md`, `rendering-animate-svg-wrapper.md`, `rendering-conditional-render.md`, `rendering-content-visibility.md`, `rendering-hoist-jsx.md`, `rendering-hydration-no-flicker.md`, `rendering-hydration-suppress-warning.md`, `rendering-resource-hints.md`, `rendering-script-defer-async.md`, `rendering-svg-precision.md`, `rendering-usetransition-loading.md`

**`js-`:** `js-batch-dom-css.md`, `js-cache-function-results.md`, `js-cache-property-access.md`, `js-cache-storage.md`, `js-combine-iterations.md`, `js-early-exit.md`, `js-flatmap-filter.md`, `js-hoist-regexp.md`, `js-index-maps.md`, `js-length-check-first.md`, `js-min-max-loop.md`, `js-request-idle-callback.md`, `js-set-map-lookups.md`, `js-tosorted-immutable.md`

**`advanced-`:** `advanced-effect-event-deps.md`, `advanced-event-handler-refs.md`, `advanced-init-once.md`, `advanced-use-latest.md`

## Symptom → rule hints (short)

| Symptom | Prefer opening (examples) |
|---------|---------------------------|
| Many sequential `await` / slow serial fetch | `async-parallel.md`, `async-defer-await.md`, `server-parallel-fetching.md` |
| Large bundle, heavy icon/lib imports | `bundle-barrel-imports.md`, `bundle-dynamic-imports.md` |
| Table/list re-renders too much | `rerender-memo.md`, `rerender-no-inline-components.md`, `rendering-content-visibility.md` |
| Heavy data serialized to client | `server-serialization.md`, `server-dedup-props.md` |

## Upstream (only to compare versions)

https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
