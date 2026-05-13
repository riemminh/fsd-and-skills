---
name: fix-bug-default
description: Quy trình sửa bug tối thiểu cho repo order-management. Dùng khi user báo lỗi, regression, hành vi sai trên trang hoặc API client. Kết hợp agent-coding-discipline, debugging-and-bugfix, business-rules (nếu đụng nghiệp vụ), project-conventions, react-next-baseline khi cần.
---

# Workflow: Fix bug (mặc định)

## Mục đích

Chuẩn hóa cách agent sửa bug: **ít đụng file**, **có tiêu chí xong việc**, **ưu tiên đúng nghiệp vụ**, không refactor lan.

## Thứ tự đọc / áp dụng skill (ưu tiên xung đột)

1. **`agent-coding-discipline`** — không đoán mò; diff nhỏ; có bước verify.
2. **`debugging-and-bugfix`** — reproduce → isolate → fix.
3. **`business-rules`** — chỉ khi bug liên quan trạng thái đơn, quyền, tính tiền, hủy đơn, lịch sử đơn.
4. **`project-conventions`** — alias `@/`, cấu trúc feature, ESLint/Prettier của repo.
5. **`react-next-baseline`** (Vercel) — khi nghi ngờ waterfall fetch, bundle, re-render, Server/Client boundary.

**Quy tắc xung đột:** đúng nghiệp vụ & an toàn dữ liệu > convention repo > baseline Vercel (baseline không được phá logic đúng của domain).

## Cách dùng trong prompt (ví dụ)

**Ví dụ 1 — Bug UI danh sách đơn**

```text
Dùng workflow fix-bug-default. Phạm vi: chỉ src/features/orders/components/order-table.tsx và hook liên quan.
Triệu chứng: sort theo total sai. Reproduce: vào /orders, bấm sort.
Chỉ đọc thêm `react-next-baseline` nếu có bằng chứng re-render/bundle (rule `rerender-*`, `bundle-*`).
```

**Ví dụ 2 — Bug sau khi đổi trạng thái đơn**

```text
fix-bug-default + business-rules. Bug: shipped nhưng timeline vẫn pending.
Chỉ sửa features/orders và types/order; không đổi auth.
```

**Ví dụ 3 — Lỗi 401 / token**

```text
fix-bug-default + security-frontend (không log token) + data-fetching nếu cần invalidation query sau login.
```

## Checklist ngắn cho agent

- [ ] Viết lại **giả định** và **tiêu chí xong** (ví dụ: sort đúng thứ tự desc/asc với cùng bộ dữ liệu).
- [ ] Reproduce tối thiểu (route, bước bấm).
- [ ] Fix **trong phạm vi** user cho; không chỉnh file không liên quan.
- [ ] Chạy `pnpm lint` / test nếu repo có (theo `project-conventions`).

## Liên kết skill khác trong cây

| Skill | Khi nào thêm vào cùng workflow này |
|-------|-----------------------------------|
| `data-fetching` | Sai dữ liệu do cache, staleTime, invalidation sau mutation. |
| `forms-and-validation` | Bug ở form tạo/sửa đơn, Zod schema, message lỗi. |
| `security-frontend` | XSS, token, env lộ, `dangerouslySetInnerHTML`. |
| `pr-and-code-review` | Khi user yêu cầu review patch trước khi merge. |

Xem thêm: `workflows/feature-shipping` cho luồng tính năng mới.
