---
name: business-rules
description: Luật nghiệp vụ và invariant cho order-management — trạng thái đơn, thanh toán, role user (admin/manager/viewer), quyền UI/route. Dùng khi đổi logic đơn, phân quyền, hủy, timeline, hoặc bug hành vi theo role.
---

# Quy tắc nghiệp vụ (tầng domain)

## Khi nào bắt buộc đọc

- Thay đổi `OrderStatus`, workflow pending → delivered, **hủy đơn**, timeline.
- Thay đổi **role**, **matrix quyền**, nút ẩn/hiện theo `user.role`, `ProtectedRoute`, `/orders/create`.
- Field `total`, `tax`, `shipping`, line items — không làm sai công thức.
- Bất kỳ hành vi nào ảnh hưởng **tiền hoặc trạng thái pháp lý** của đơn (theo mô hình app demo).

## Ưu tiên

**Đúng nghiệp vụ** quan trọng hơn `react-next-baseline` (tối ưu framework).

## Tài liệu chi tiết

- [orders-domain.md](references/orders-domain.md)
- [permissions-and-roles.md](references/permissions-and-roles.md)

## Ví dụ prompt

```text
Đổi logic shipped: đọc business-rules trước, sau đó sửa features/orders. Không tối ưu perf trước khi logic đúng.
```
