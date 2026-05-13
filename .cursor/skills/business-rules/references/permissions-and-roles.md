# Quyền & role user (chi tiết theo code)

## Kiểu role (`UserRole`)

Định nghĩa thống nhất (trùng nhau ở nhiều file):

- `src/types/user.ts` — `export type UserRole = "admin" | "manager" | "viewer"`
- `src/features/auth/types/index.ts` — cùng enum

Ba role: **`admin`**, **`manager`**, **`viewer`**.

## Tài khoản demo (`src/data/mock-users.ts`)

| Email | Role | Ghi chú |
|-------|------|--------|
| `admin@example.com` | `admin` | Trang login có gợi ý placeholder |
| `manager@example.com` | `manager` | |
| `viewer@example.com` | `viewer` | Chỉ xem (theo rule UI dưới đây) |

Mật khẩu / flow đăng nhập: xem `src/app/login/page.tsx` và `auth.api` (demo có thể mock).

## Ma trận quyền (theo chỗ đang check trong code)

| Hành động | `admin` | `manager` | `viewer` | Nguồn trong repo |
|-----------|---------|-----------|----------|------------------|
| Vào `/orders` (danh sách) | Có | Có | Có | Chỉ cần đăng nhập (`orders/page.tsx`) |
| Nút **Create order** (UI list) | Có | Có | Không | `order-list.tsx`: `canCreateOrder = role === "admin" \|\| role === "manager"` |
| Trang **`/orders/create`** | Có | Có | Không (redirect + toast) | `orders/create/page.tsx` |
| **Sửa đơn** trong drawer | Có | Có | Không | `order-detail-drawer.tsx`: `canEdit` |
| **Hủy đơn** trong drawer | Có | Có* | Không | `canCancel = canEdit && status in pending|processing` — *chỉ khi đủ điều kiện trạng thái |

**Viewer:** xem danh sách/chi tiết; không tạo đơn, không sửa/hủy trong drawer (theo điều kiện `canEdit` hiện tại).

## `ProtectedRoute` (`src/shared/components/common/protected-route.tsx`)

- Props: `allowedRoles?: string[]` (chuỗi role, nên truyền đúng `UserRole`).
- Chưa login → redirect `/login`.
- Đã login nhưng **role không nằm trong `allowedRoles`** → redirect **`/orders`** (không phải forbidden page riêng).
- Không truyền `allowedRoles` → chỉ kiểm tra đã đăng nhập.

Khi thêm route mới: dùng pattern này hoặc guard tương đương; cập nhật bảng trên.

## Auth kỹ thuật (token)

- Token: `localStorage` key `auth_token`; user: key `user`.
- API: `ApiClient` gắn `Authorization: Bearer` (`src/core/api/client.ts`).
- **Không** log token / dán token vào chat.

## Trạng thái đơn vs hủy/sửa (tầng domain, khác với chỉ role)

- Helper `canEditOrder` / `canCancelOrder` / chuyển trạng thái hợp lệ: `src/features/orders/utils/order-status.ts`.
- **Drawer UI** (`order-detail-drawer.tsx`) đang **chặt hơn** util: `canCancel` chỉ khi `pending` hoặc `processing` (dù `canCancelOrder` trong util cho phép thêm trường hợp khác). Khi sửa nghiệp vụ, **thống nhất** util vs UI hoặc ghi rõ lý do lệch.

## Hook role

- `useUserRole()` trong `src/features/auth/hooks/use-auth.ts` — trả `user?.role \|\| null`.

## Việc cần làm khi mở rộng RBAC

- Bổ sung cột / hàng vào bảng trên và file check mới (middleware, server actions, v.v.).
- Nếu backend thật có permission granular hơn `admin|manager|viewer`, thay thế bảng bằng spec API và link vào đây.
