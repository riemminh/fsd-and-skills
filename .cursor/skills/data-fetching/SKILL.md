---
name: data-fetching
description: React Query và API client trong order-management — QueryProvider defaults, hooks trong features, axios client, env API URL. Dùng khi bug/sửa cache, loading, refetch, mutation sau thao tác đơn.
---

# Data fetching (React Query + Axios)

## Khi nào dùng

- Thêm/sửa hook `use*` trong `src/features/*/hooks/`.
- Đổi `staleTime`, `gcTime`, `retry`, devtools.
- Lỗi sau mutation (invalidate query), double fetch, hydration (nếu sau này có SSR data).

## Kiến trúc (đã có)

- `QueryClient` tạo trong `QueryProvider` với defaults:
  - `staleTime: 60_000`, `gcTime: 5 * 60_000`, `refetchOnWindowFocus: false`, `retry: 1`
- Devtools: bật khi `env.isDevelopment && env.enableDevTools`
- HTTP: `src/core/api/client.ts` + `API_CONFIG` từ `@/config`

## Chi tiết

- [cache-and-keys.md](references/cache-and-keys.md)

## Kết hợp

- `react-next-baseline` — waterfall, parallel fetch, serialize props: `react-next-baseline/references/vercel-SKILL-excerpt.md` rồi chỉ `vendor/rules/<rule>.md` liên quan (không đọc hết `vendor/`).
- `business-rules` — sau mutation phải đúng trạng thái đơn trên server/client.
- `security-frontend` — token header, không log response nhạy cảm.

## Ví dụ prompt

```text
Sửa useOrders: sau khi cancel order refetch list; đọc data-fetching + business-rules. Không đổi default QueryClient global trừ khi được yêu cầu.
```
