---
name: pr-and-code-review
description: Checklist review PR cho order-management — đúng scope, lint, type, nghiệp vụ, security. Dùng khi user nhờ review diff hoặc trước merge.
---

# PR & code review

## Khi nào dùng

- “Review thay đổi”, “có rủi ro gì không”, trước merge PR.

## Checklist ngắn

- [ ] Diff **khớp** mô tả PR / yêu cầu (không drive-by refactor).
- [ ] `pnpm lint` / `pnpm type-check` nếu đổi TS.
- [ ] Đụng `business-rules`? — invariant đơn hàng / tiền.
- [ ] Token / PII / `NEXT_PUBLIC` — `security-frontend`.
- [ ] React Query keys & invalidation — `data-fetching`.
- [ ] UI nhất quán — `ui-design-system`.

## Kết hợp

- `agent-coding-discipline` — diff phẫu thuật, đơn giản hóa.
- `react-next-baseline` — nếu PR là tối ưu perf lớn.

## Ví dụ prompt

```text
Review nhánh hiện tại theo pr-and-code-review + business-rules cho phần orders.
```
