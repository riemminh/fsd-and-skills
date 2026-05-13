---
name: forms-and-validation
description: React Hook Form, Zod, resolver, message lỗi trong order-management. Dùng khi tạo/sửa form (login, create order, edit dialog), schema, submit async.
---

# Form & validation

## Khi nào dùng

- File dùng `useForm`, `z.object`, `@hookform/resolvers/zod`.
- Thông báo lỗi hiển thị cho user (field-level vs form-level).

## Stack repo

- `react-hook-form`, `zod`, `@hookform/resolvers`

## Quy ước

- Schema Zod gần form hoặc trong `types`/`schemas` nếu tái sử dụng — **một nguồn sự thật** cho type inference khi có thể.
- Submit async: xử lý lỗi API (toast `sonner` đã có trong deps — dùng nếu pattern hiện có).

## Kết hợp

- `ui-design-system` — Input, Label, layout form.
- `business-rules` — validate business (ví dụ không submit order rỗng items nếu domain cấm).
- `data-fetching` — invalidate sau submit thành công.

## Ví dụ prompt

```text
Thêm field notes vào create order: forms-and-validation + business-rules; giữ message lỗi song ngữ nếu project yêu cầu (hiện chưa ghi — hỏi user).
```
