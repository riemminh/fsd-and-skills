---
name: feature-shipping
description: Luồng triển khai tính năng mới (thiết kế ngắn → code theo convention → hook data → test/lint) cho order-management. Dùng khi user thêm màn, API client, form, hoặc refactor có phạm vi rõ.
---

# Workflow: Ship tính năng

## Thứ tự skill gợi ý

1. **`agent-coding-discipline`** — làm rõ scope, không mở rộng tính năng không được hỏi.
2. **`project-conventions`** — nếu chưa rõ chỗ đặt file (app route vs feature); đọc [stack-and-layout.md](../../project-conventions/references/stack-and-layout.md) cho bản đồ nhanh.
3. **`business-rules`** — nếu thêm/đổi luồng đơn, quyền, trạng thái.
4. **`project-conventions`** — import `@/`, barrel `index.ts`, cấu trúc `features/<domain>/`.
5. **`ui-design-system`** — khi chạm UI dùng `shared/components/ui`, Tailwind, dark class ở layout.
6. **`data-fetching`** — React Query hooks trong `features/*/hooks`, API trong `features/*/api`.
7. **`forms-and-validation`** — RHF + Zod theo pattern repo.
8. **`react-next-baseline`** — khi chạm performance hoặc boundary Server/Client.

## Ví dụ prompt

**Thêm filter mới trên /orders**

```text
Workflow feature-shipping. Scope: orders list only.
Đọc project-conventions + data-fetching. UI theo ui-design-system.
Không đổi payment domain.
```

**Trang login UX**

```text
feature-shipping + forms-and-validation + security-frontend (không hardcode secret).
```

## Kết hợp với fix-bug-default

- Tính năng mới xong nhưng còn bug → chuyển prompt sang **`fix-bug-default`** và thu hẹp phạm vi file.
