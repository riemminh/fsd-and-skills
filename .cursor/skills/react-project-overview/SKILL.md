---
name: react-project-overview
description: Bản đồ kiến trúc ứng dụng order-management — Next App Router, providers, features, API client, env. Dùng khi vào repo lần đầu, đặt file mới, hoặc cần hiểu luồng dữ liệu tổng thể.
---

# Tổng quan kiến trúc (order-management)

## Stack

- **Next.js** `^16` — App Router dưới `src/app/`
- **React** 19, **TypeScript** strict
- **TanStack React Query** v5 — `QueryProvider` trong `src/core/providers/query-provider.tsx`
- **Axios** — `src/core/api/client.ts` (interceptors, Bearer token, 401)
- **React Hook Form + Zod** — form/validation
- **Tailwind CSS** v4 — `globals.css`, class `dark` trên `<html>` trong `layout.tsx`

## Cây thư mục quan trọng

```
src/
├── app/                    # Routes: page.tsx theo URL
│   ├── layout.tsx          # Root layout, fonts, Providers
│   ├── page.tsx            # Home
│   ├── login/
│   └── orders/             # Danh sách + create
├── config/                 # env, constants, API_CONFIG
├── core/
│   ├── api/                # ApiClient, types
│   └── providers/        # QueryProvider + Providers
├── contexts/               # AuthContext
├── features/               # Domain: auth, customers, orders, products
├── services/               # auth.service, order.service, product.service
├── shared/                 # UI kit, utils, shared types
└── types/                  # user, order, product, form (một phần overlap với features)
```

## Luồng request điển hình

1. Component gọi hook trong `features/<x>/hooks/` (React Query).
2. Hook gọi `*.api.ts` trong cùng feature hoặc `services/*.service.ts` tùy pattern file hiện có.
3. HTTP đi qua `ApiClient` (`@/core/api`) — base URL từ `API_CONFIG` / `env.apiUrl`.

## Env

- `NEXT_PUBLIC_API_URL` (mặc định fallback trong `env.ts`: `http://localhost:3000/api`)
- `NEXT_PUBLIC_ENABLE_DEV_TOOLS`, `NEXT_PUBLIC_ENABLE_MOCK_DATA`

## Khi nào đọc skill này

- Onboarding, refactor chạm nhiều layer.
- Trước khi tạo route mới hoặc feature mới.

## Kết hợp

| Cần thêm | Khi |
|----------|-----|
| `project-conventions` | Chi tiết alias & chỗ đặt file. |
| `data-fetching` | Sửa cache, keys, staleTime, invalidation. |
| `business-rules` | Đơn, trạng thái, quyền. |
