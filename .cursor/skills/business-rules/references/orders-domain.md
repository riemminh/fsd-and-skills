# Domain đơn hàng (tóm từ code)

Nguồn chính: `src/features/orders/types/index.ts` và utils `order-status`, `order-calculations`.

## Trạng thái (`OrderStatus`)

`pending` | `processing` | `shipped` | `delivered` | `cancelled`

**Invariant gợi ý (cần xác nhận với PM):**

- Chuyển trạng thái không nên **bỏ qua** bước trung gian nếu UI/ báo cáo phụ thuộc thứ tự.
- `cancelled` không được “hồi sinh” thành active mà không có luồng rõ ràng.

## Tiền tệ trên `Order`

- `subtotal`, `tax`, `shipping`, `total` — mọi thay đổi phải **nhất quán** với `items[]` (quantity × price, subtotal dòng).
- Khi sửa `order-calculations` hoặc chỗ aggregate: kiểm tra lại **làm tròn** và đơn vị tiền (app demo thường dùng số thô).

## Tạo / cập nhật đơn

- `CreateOrderInput`: `customerId`, `items` (productId + quantity), `shippingAddress`, `paymentMethod`, optional `notes`.
- `UpdateOrderInput`: có thể đổi `status`, `items`, địa chỉ, ghi chú — không xóa field bắt buộc API nếu backend giả định tồn tại.

## Lịch sử (`OrderHistoryEntry`)

- Mỗi bước đổi status nên ghi nhận `timestamp`, `user`, optional `note` nếu UI/API hỗ trợ.

Cập nhật file này khi spec sản phẩm thay đổi.
