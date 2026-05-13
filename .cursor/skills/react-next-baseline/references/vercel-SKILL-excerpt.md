# Mục lục rule Vercel (bản nhẹ cho agent trong repo này)

## Tiết kiệm token — bắt buộc

1. **Đọc file này trước** để chọn rule (prefix / tên file).
2. **Chỉ mở thêm** các file chi tiết:  
   `.cursor/skills/react-next-baseline/vendor/rules/<tên-rule>.md`  
   (ví dụ `rerender-memo.md`) — **tối đa 1–3 rule** cho một lượt sửa, trừ khi user yêu cầu rà soát perf toàn phạm vi.
3. **Cấm** vì mục đích làm task thường:
   - Đọc toàn bộ `vendor/AGENTS.md`
   - Đọc toàn bộ `vendor/SKILL.md`
   - Liệt kê / đọc hàng loạt mọi file trong `vendor/rules/` (không `list_dir` / `glob` cả thư mục rồi mở dần từng file trừ khi user chỉ định audit).
4. **Chi tiết từng rule** chỉ nằm trong `vendor/rules/*.md` — không cần URL upstream cho luồng làm việc hằng ngày.

Đường dẫn từ root repo:  
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

## Chỉ mục file có trong `vendor/rules/` (đồng bộ vendor)

**`async-`:** `async-api-routes.md`, `async-cheap-condition-before-await.md`, `async-defer-await.md`, `async-dependencies.md`, `async-parallel.md`, `async-suspense-boundaries.md`

**`bundle-`:** `bundle-analyzable-paths.md`, `bundle-barrel-imports.md`, `bundle-conditional.md`, `bundle-defer-third-party.md`, `bundle-dynamic-imports.md`, `bundle-preload.md`

**`server-`:** `server-after-nonblocking.md`, `server-auth-actions.md`, `server-cache-lru.md`, `server-cache-react.md`, `server-dedup-props.md`, `server-hoist-static-io.md`, `server-no-shared-module-state.md`, `server-parallel-fetching.md`, `server-parallel-nested-fetching.md`, `server-serialization.md`

**`client-`:** `client-event-listeners.md`, `client-localstorage-schema.md`, `client-passive-event-listeners.md`, `client-swr-dedup.md`

**`rerender-`:** `rerender-defer-reads.md`, `rerender-dependencies.md`, `rerender-derived-state-no-effect.md`, `rerender-derived-state.md`, `rerender-functional-setstate.md`, `rerender-lazy-state-init.md`, `rerender-memo-with-default-value.md`, `rerender-memo.md`, `rerender-move-effect-to-event.md`, `rerender-no-inline-components.md`, `rerender-simple-expression-in-memo.md`, `rerender-split-combined-hooks.md`, `rerender-transitions.md`, `rerender-use-deferred-value.md`, `rerender-use-ref-transient-values.md`

**`rendering-`:** `rendering-activity.md`, `rendering-animate-svg-wrapper.md`, `rendering-conditional-render.md`, `rendering-content-visibility.md`, `rendering-hoist-jsx.md`, `rendering-hydration-no-flicker.md`, `rendering-hydration-suppress-warning.md`, `rendering-resource-hints.md`, `rendering-script-defer-async.md`, `rendering-svg-precision.md`, `rendering-usetransition-loading.md`

**`js-`:** `js-batch-dom-css.md`, `js-cache-function-results.md`, `js-cache-property-access.md`, `js-cache-storage.md`, `js-combine-iterations.md`, `js-early-exit.md`, `js-flatmap-filter.md`, `js-hoist-regexp.md`, `js-index-maps.md`, `js-length-check-first.md`, `js-min-max-loop.md`, `js-request-idle-callback.md`, `js-set-map-lookups.md`, `js-tosorted-immutable.md`

**`advanced-`:** `advanced-effect-event-deps.md`, `advanced-event-handler-refs.md`, `advanced-init-once.md`, `advanced-use-latest.md`

## Gợi ý chọn rule theo triệu chứng (rút gọn)

| Triệu chứng | Ưu tiên mở (ví dụ) |
|-------------|-------------------|
| Nhiều `await` nối tiếp / chậm do fetch tuần tự | `async-parallel.md`, `async-defer-await.md`, `server-parallel-fetching.md` |
| Bundle lớn, import icon/thư viện nặng | `bundle-barrel-imports.md`, `bundle-dynamic-imports.md` |
| Bảng/list re-render thừa | `rerender-memo.md`, `rerender-no-inline-components.md`, `rendering-content-visibility.md` |
| Dữ liệu serialize xuống client quá nặng | `server-serialization.md`, `server-dedup-props.md` |

## Upstream (chỉ khi đối chiếu phiên bản mới)

https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
