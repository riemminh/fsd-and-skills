---
name: react-next-baseline
description: Baseline React và Next.js (hiệu năng, bundle, fetch, re-render) theo Vercel Engineering. Dùng khi viết/review component Next, tối ưu load, data fetching, hoặc refactor có rủi ro perf. Upstream vercel-labs/agent-skills skill vercel-react-best-practices (react-best-practices).
---

# React / Next baseline (Vercel)

## Vai trò trong repo này

Đây là **chuẩn framework**, không thay thế `project-conventions` (alias, folder feature) hay `business-rules`.

**Ưu tiên khi mâu thuẫn:** `business-rules` và `project-conventions` của team **thắng** nếu khác với tài liệu Vercel.

## Cách đồng bộ nội dung gốc (khuyến nghị)

Repo upstream: [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), thư mục skill: `skills/react-best-practices` (trong metadata skill tên là `vercel-react-best-practices`).

**Cách A — CLI (nếu bạn đã dùng `npx skills add`):**

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

(Skill ID trên CLI có thể map tới gói `react-best-practices`; nếu lệnh báo tên khác, dùng tên skill mà CLI liệt kê.)

**Cách B — Đọc trực tiếp khi cần:**

- SKILL + mục lục rule: [SKILL.md raw](https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/SKILL.md)
- Toàn bộ bản mở rộng: [AGENTS.md raw](https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/AGENTS.md) (file lớn — chỉ đọc khi task perf/review sâu)

## Khi nào mở skill này

- Nghi ngờ **waterfall** `await` tuần tự không cần thiết.
- **Bundle** phình (dynamic import, barrel imports).
- **Re-render** thừa, memo/useMemo sai chỗ.
- Tối ưu **Server vs Client** component, giảm props serialize xuống client.

## Tệp trong thư mục `references/`

| File | Mục đích |
|------|-----------|
| `upstream-links.md` | URL và ghi chú đồng bộ. |
| `vercel-SKILL-excerpt.md` | Trích phần đầu SKILL upstream (mục lục rule) để tra cứu offline nhẹ. |

## Kết hợp

- Với **`data-fetching`**: baseline nói pattern client/server chung; repo nói React Query keys, `QueryProvider`, staleTime.
- Tối ưu **bảng / list** (ví dụ `features/orders/components/order-table.tsx`): dùng trực tiếp các rule **`rerender-*`**, **`rendering-*`**, **`bundle-*`** trong baseline (không cần skill perf riêng trong repo).
