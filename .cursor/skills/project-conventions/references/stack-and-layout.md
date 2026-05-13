# Stack & bản đồ repo (tổng quan nhanh)

Chi tiết kiến trúc feature-based: [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md).

## Stack

- **Next.js** `^16` — App Router dưới `src/app/`
- **React** 19, **TypeScript** strict
- **TanStack React Query** v5 — `QueryProvider` trong `src/core/providers/query-provider.tsx`
- **Axios** — `src/core/api/client.ts` (interceptors, Bearer token, 401)
- **React Hook Form + Zod** — form / validation
- **Tailwind CSS** v4 — `globals.css`, class `dark` trên `<html>` trong `layout.tsx`

## Cây thư mục quan trọng

```
src/
├── app/                    # Routes: page.tsx theo URL
│   ├── layout.tsx          # Root layout, fonts, Providers
│   ├── page.tsx            # Home
│   ├── login/
│   └── orders/             # Danh sách + create
├── config/                 # env, constants (ROUTES, QUERY_KEYS, API_CONFIG)
├── core/
│   ├── api/                # ApiClient, types
│   └── providers/          # QueryProvider + Providers
├── contexts/               # (legacy có thể còn; auth ưu tiên @/features/auth)
├── features/               # Domain: auth, customers, orders, products
├── services/               # service layer (một số flow vẫn dùng)
├── shared/                 # UI kit, hooks, utils, types dùng chung
└── types/                  # user, order, product, form (overlap một phần features)
```

## Luồng request điển hình

1. Component gọi hook trong `features/<x>/hooks/` (React Query).
2. Hook gọi `*.api.ts` trong cùng feature hoặc `services/*.service.ts` tùy pattern file hiện có.
3. HTTP đi qua `ApiClient` (`@/core/api`) — base URL từ `API_CONFIG` / `env.apiUrl`.

## Env (nhắc nhanh)

- `NEXT_PUBLIC_API_URL` (fallback trong `env.ts`, ví dụ `http://localhost:3000/api`)
- `NEXT_PUBLIC_ENABLE_DEV_TOOLS`, `NEXT_PUBLIC_ENABLE_MOCK_DATA`

## Khi nào đọc file này

- Vào repo lần đầu, onboarding.
- Refactor chạm nhiều layer; trước khi thêm route hoặc feature mới.
- Cần nhớ **stack** và **chỗ đặt** file nhanh — chi tiết alias / barrel / tầng import xem [naming-and-imports.md](naming-and-imports.md) và [architecture-layers.md](architecture-layers.md).

## Skill khác (kết hợp)

| Nhu cầu | Đọc thêm |
|---------|----------|
| Cache, keys, invalidation | `data-fetching` |
| Đơn, role, quyền | `business-rules` |
| Perf React/Next | `react-next-baseline` |
