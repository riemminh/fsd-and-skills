# Naming & imports (order-management)

Nguồn chuẩn: **[docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md)** — skill này tóm tắt và ghi lệch thực tế.

## Alias TypeScript (`tsconfig.json`)

| Alias | Thư mục |
|-------|---------|
| `@/*` | `./src/*` |
| `@/app/*` | `./src/app/*` |
| `@/features/*` | `./src/features/*` |
| `@/shared/*` | `./src/shared/*` |
| `@/core/*` | `./src/core/*` |
| `@/config/*` | `./src/config/*` |

Ưu tiên alias phù hợp nhất (UI chung → `@/shared/...`, domain → `@/features/<name>/...`).

## Cấu trúc feature (đủ các thư mục theo ARCHITECTURE)

Mỗi domain dưới `src/features/<name>/`:

- `api/` — `*.api.ts` + `index.ts`
- `components/` — component chỉ thuộc feature + `index.ts`
- `hooks/` — `use-*.ts` + `index.ts`
- `types/` — `index.ts` (hoặc file type theo team)
- `utils/` — tính toán / validator riêng feature + `index.ts`
- **`index.ts` — public API (barrel)** của feature

## Barrel exports (bắt buộc theo kiến trúc)

```typescript
// Đúng — import từ public API feature
import { useOrders, type Order } from "@/features/orders";

// Tránh — import sâu trừ khi đang sửa chính file đó hoặc team cho phép ngoại lệ
import { useOrders } from "@/features/orders/hooks/use-orders";
```

## Mẫu import (theo ARCHITECTURE.md)

```typescript
// Config (ROUTES, API_CONFIG, QUERY_KEYS, … từ barrel @/config)
import { ROUTES, API_CONFIG } from "@/config";

// Core
import { apiClient } from "@/core/api";
import { Providers } from "@/core/providers";

// Shared
import { cn, formatCurrency } from "@/shared/utils";
import { useDebounce } from "@/shared/hooks";

// Features — luôn ưu tiên barrel
import { useOrders, type Order } from "@/features/orders";
import { useProducts } from "@/features/products";
import { useLogin, useCurrentUser } from "@/features/auth";
```

## Quy ước đặt tên file (ARCHITECTURE)

| Loại | Quy ước | Ví dụ |
|------|-----------|--------|
| Component | PascalCase + `.tsx` | `OrderList.tsx` |
| Hook | kebab-case + `.ts` | `use-orders.ts` |
| Utils | kebab-case + `.ts` | `format-currency.ts` |
| Types | `index.ts` hoặc kebab-case | `types/index.ts` |

Hàm export: component `PascalCase`, hook `useCamelCase`, util `camelCase`, type/interface `PascalCase`. Hằng số: `UPPER_SNAKE_CASE`.

## Tầng phụ thuộc

Xem [architecture-layers.md](architecture-layers.md).

## ESLint / Prettier

- Lint: `pnpm lint` (`.eslintrc.json`, glob `src/**/*.{ts,tsx}`).
- Format: `pnpm format` / `pnpm format:check`.

## Env & hằng số app

- Biến môi trường: `src/config/env.ts`.
- `API_CONFIG`, `ROUTES`, `QUERY_KEYS`, v.v.: **`src/config/constants.ts`** (export qua `@/config`) — không cần `routes.ts` riêng cho đến khi team tách file.
