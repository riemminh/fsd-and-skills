# Cache & query keys

## Query keys có sẵn (`src/config/constants.ts`)

- `QUERY_KEYS.ORDERS` — `ALL`, `LIST(filters)`, `DETAIL(id)` (tương tự `PRODUCTS`, `CUSTOMERS`).
- Ưu tiên **tái sử dụng** các factory này thay vì string rời trong hook.

## Quy ước key (gợi ý — bám theo hook hiện có)

- Gom theo domain: ví dụ `["orders"]`, `["orders", filters]`, `["order", id]` — **nhất quán** trong `features/orders/hooks`.
- Khi thêm filter mới: đưa vào phần key ảnh hưởng cache để tránh hiển thị dữ liệu cũ.

## Sau mutation

- `invalidateQueries` hoặc `setQueryData` tùy UX (optimistic cần business-rules).

## Axios

- Base URL từ config — không hardcode URL đầy đủ trong hook nếu đã có `ApiClient`.

## Tránh

- Key quá rộng làm invalidate toàn app.
- `refetchOnWindowFocus: true` mà không có lý do (hiện tại repo đang `false`).
