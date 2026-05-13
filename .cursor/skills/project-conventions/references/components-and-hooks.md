# Components & hooks

Nguồn: **[docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md)** (mục Component Organization + Data Flow).

## `"use client"`

- Đặt ở đầu file khi dùng hooks, event handlers, React Query trong component đó.
- `src/core/providers/*` là client (đã có `"use client"`).
- `src/app/layout.tsx` là Server Component — bọc `Providers` từ `@/core/providers`.

## Providers

- `QueryClientProvider` trong `src/core/providers/query-provider.tsx`, gộp trong `Providers` (`src/core/providers/index.tsx`).

## Shared UI (theo ARCHITECTURE)

- **`src/shared/components/ui/`** — base (shadcn-style): button, input, dialog, …
- **`src/shared/components/common/`** — component dùng lại mang tính “business UI” chung (empty state, error boundary, spinner, …).
- **`src/shared/components/layout/`** — layout dùng chung (nếu có).

## Shared hooks

- **`src/shared/hooks/`** — hook tái sử dụng (`use-debounce`, `use-local-storage`, …). Import ví dụ: `import { useDebounce } from "@/shared/hooks"` (hoặc qua barrel nếu project export tập trung).

## Hooks & API trong feature

- React Query hooks: `src/features/<domain>/hooks/use-*.ts`.
- API object: `src/features/<domain>/api/*.api.ts`.

Luồng gợi ý (ARCHITECTURE): định nghĩa API → hook `useQuery` / `useMutation` → dùng trong component feature.

## Auth (ưu tiên kiến trúc feature)

- **Chuẩn theo ARCHITECTURE:** dùng public API **`@/features/auth`** (hooks như `useLogin`, `useCurrentUser`, …).
- **`src/contexts/auth-context.tsx`:** có thể còn trong repo nhưng **ưu tiên không mở rộng** pattern Context song song với React Query auth — khi sửa auth, kiểm tra page/layout đang dùng nhánh nào rồi thống nhất.

## Tiện ích

- `cn()` và formatter: `@/shared/utils`.
