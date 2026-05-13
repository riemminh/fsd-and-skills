---
name: react-next-baseline
description: Baseline React/Next (Vercel). Agent đọc references/vercel-SKILL-excerpt.md rồi chỉ 1–3 file vendor/rules/<rule>.md — không đọc hết vendor/. Dùng khi perf, bundle, fetch, re-render, RSC boundary. Upstream vercel-react-best-practices.
---

# React / Next baseline (Vercel)

## Vai trò trong repo này

Đây là **chuẩn framework**, không thay thế `project-conventions` (alias, folder feature) hay `business-rules`.

**Ưu tiên khi mâu thuẫn:** `business-rules` và `project-conventions` của team **thắng** nếu khác với tài liệu Vercel.

## Tiết kiệm token — luồng đọc bắt buộc

**Không** (trừ khi user yêu cầu rõ “đọc toàn bộ baseline” / audit toàn diện):

- Đọc `vendor/AGENTS.md` hoặc toàn bộ `vendor/SKILL.md`.
- `list_dir` / `glob` cả `vendor/rules/` rồi mở dần nhiều file.
- Coi “mở skill react-next-baseline” là phải nạp hết upstream.

**Luồng đúng:**

1. Đọc **file skill này** (`react-next-baseline/SKILL.md`) — chỉ phần vai trò + bảng dưới.
2. Đọc **[references/vercel-SKILL-excerpt.md](references/vercel-SKILL-excerpt.md)** — chọn prefix / rule khớp triệu chứng (có chỉ mục đủ file trong `vendor/rules/`).
3. Mở **đúng** `vendor/rules/<rule>.md` đã chọn (thường **1–3** file cho một thay đổi).

Chi tiết từng rule **chỉ** nằm trong `vendor/rules/*.md`. `vendor/SKILL.md` và `vendor/AGENTS.md` là bản biên soạn dài của upstream — **không** dùng làm bước mặc định của agent trong repo này.

## Cách đồng bộ nội dung gốc

**Đã có bản đầy đủ trong repo:** thư mục **`vendor/`** (copy từ `vercel-labs/agent-skills` / `skills/react-best-practices`). Lệnh cập nhật và URL đối chiếu: [references/upstream-links.md](references/upstream-links.md).

**Tuỳ chọn — CLI:**

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
| `vercel-SKILL-excerpt.md` | **Luôn đọc trước** khi cần rule: chỉ mục + chính sách token + gợi ý theo triệu chứng. |
| `upstream-links.md` | Cập nhật `vendor/` từ GitHub; không phải tài liệu nghiệp vụ hằng ngày. |

## Thư mục `vendor/` (bản copy upstream)

- **Chi tiết từng rule (đọc có chủ đích):** `vendor/rules/<tên-rule>.md`.
- `vendor/SKILL.md`, `vendor/AGENTS.md`: dành cho người / tình huống audit; agent bỏ qua mặc định (xem phần “Tiết kiệm token”).

## Kết hợp

- Với **`data-fetching`**: baseline nói pattern client/server chung; repo nói React Query keys, `QueryProvider`, staleTime.
- Tối ưu **bảng / list** (ví dụ `features/orders/components/order-table.tsx`): chọn tên rule trong `references/vercel-SKILL-excerpt.md`, rồi mở đúng `vendor/rules/<rule>.md` (nhóm **`rerender-*`**, **`rendering-*`**, **`bundle-*`** — không cần skill perf riêng trong repo).
