# Tầng phụ thuộc (theo ARCHITECTURE.md)

Nguồn: [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md) (mục **Clear Dependencies**).

## Thứ tự cho phép import

```
app/ → features/ → shared/ → core/ → config/
```

- Tầng **trên** được import từ tầng **dưới**.
- Tầng **dưới** không import từ tầng **trên** (ví dụ `config/` không import `features/`).
- **Feature không import trực tiếp feature khác** — dùng `shared/`, callback props, hoặc nâng logic lên `shared/` / `core/` khi thật sự dùng chung.

## Khi nào phá vỡ (cần hỏi / ghi rõ PR)

- Import ngang giữa hai `features/*` (ví dụ `orders` import `products`) — tránh; nếu bắt buộc, team phải thống nhất.

## Khác với cây file thực tế (để agent không bối rối)

| ARCHITECTURE.md ghi | Repo hiện tại |
|---------------------|----------------|
| `config/routes.ts` | **`ROUTES` + `QUERY_KEYS` nằm trong `src/config/constants.ts`**, export qua `src/config/index.ts`. Chưa có file `routes.ts` tách riêng. |
| `core/middleware/` | Thư mục **có thể chưa có** — tạo khi cần middleware dùng chung; đừng giả định đã tồn tại. |

Cập nhật bảng này nếu sau này tách `routes.ts` hoặc thêm `core/middleware/`.
