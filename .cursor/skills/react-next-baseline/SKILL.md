---
name: react-next-baseline
description: Baseline React và Next.js (hiệu năng, bundle, fetch, re-render) theo Vercel Engineering. Dùng khi viết/review component Next, tối ưu load, data fetching, hoặc refactor có rủi ro perf. Upstream vercel-labs/agent-skills skill vercel-react-best-practices (react-best-practices).
---

# React / Next baseline (Vercel)

## Vai trò trong repo này

Đây là **chuẩn framework**, không thay thế `project-conventions` (alias, folder feature) hay `business-rules`.

**Ưu tiên khi mâu thuẫn:** `business-rules` và `project-conventions` của team **thắng** nếu khác với tài liệu Vercel.

## Cách đồng bộ nội dung gốc

**Đã có bản đầy đủ trong repo:** xem thư mục **`vendor/`** (bản copy từ `vercel-labs/agent-skills` / `skills/react-best-practices`: `AGENTS.md`, `rules/*.md`, `SKILL.md`, …). Chi tiết và lệnh cập nhật lại: [references/upstream-links.md](references/upstream-links.md).

**Tuỳ chọn — CLI:** nếu muốn cài song song bằng công cụ:

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

## Khi nào mở skill này

- Nghi ngờ **waterfall** `await` tuần tự không cần thiết.
- **Bundle** phình (dynamic import, barrel imports).
- **Re-render** thừa, memo/useMemo sai chỗ.
- Tối ưu **Server vs Client** component, giảm props serialize xuống client.

## Tệp trong thư mục `references/`

| File | Mục đích |
|------|-----------|
| `upstream-links.md` | Nguồn GitHub + **lệnh cập nhật** thư mục `vendor/`. |
| `vercel-SKILL-excerpt.md` | Trích mục lục rule (nhẹ); bản đầy đủ nằm trong **`vendor/SKILL.md`** và **`vendor/AGENTS.md`**. |

## Thư mục `vendor/` (bản copy upstream)

- Đọc rule chi tiết: `vendor/rules/<tên-rule>.md`.
- Mục lục + hướng dẫn gốc Vercel: `vendor/SKILL.md`.

## Kết hợp

- Với **`data-fetching`**: baseline nói pattern client/server chung; repo nói React Query keys, `QueryProvider`, staleTime.
- Tối ưu **bảng / list** (ví dụ `features/orders/components/order-table.tsx`): dùng trực tiếp các rule **`rerender-*`**, **`rendering-*`**, **`bundle-*`** trong baseline (không cần skill perf riêng trong repo).
