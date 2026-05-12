# Architecture Documentation

## 📁 Project Structure

This project follows a **feature-based architecture** with clear separation of concerns, designed for scalability and maintainability.

```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── features/              # Feature modules (domain-driven)
│   ├── orders/           # Orders feature
│   │   ├── api/         # API calls
│   │   ├── components/  # Feature-specific components
│   │   ├── hooks/       # Feature-specific hooks
│   │   ├── types/       # Feature-specific types
│   │   ├── utils/       # Feature-specific utilities
│   │   └── index.ts     # Public API
│   │
│   ├── products/        # Products feature
│   ├── auth/            # Authentication feature
│   └── customers/       # Customers feature
│
├── shared/               # Shared resources
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # Base UI components (shadcn/ui)
│   │   └── common/     # Common components
│   ├── hooks/          # Reusable hooks
│   ├── types/          # Shared types
│   └── utils/          # Utility functions
│
├── core/                # Core functionality
│   ├── api/            # API client & configuration
│   ├── providers/      # React providers
│   └── middleware/     # Middleware functions
│
└── config/             # Configuration
    ├── constants.ts    # App constants
    ├── env.ts         # Environment variables
    └── routes.ts      # Route definitions
```

## 🎯 Architecture Principles

### 1. Feature-Based Organization

- Each feature is self-contained with its own API, components, hooks, and types
- Features can be developed, tested, and maintained independently
- Easy to add new features without affecting existing code

### 2. Separation of Concerns

- **Features**: Business logic and domain-specific code
- **Shared**: Reusable components and utilities
- **Core**: Infrastructure and cross-cutting concerns
- **Config**: Application configuration

### 3. Clear Dependencies

```
app/ → features/ → shared/ → core/ → config/
```

- Higher layers can import from lower layers
- Lower layers should never import from higher layers
- Features should not import from other features directly

### 4. Type Safety

- TypeScript throughout
- Strict type checking enabled
- Path aliases for clean imports

## 📦 Feature Structure

Each feature follows this structure:

```
feature-name/
├── api/              # API calls and endpoints
│   ├── feature.api.ts
│   └── index.ts
│
├── components/       # Feature-specific components
│   ├── FeatureList.tsx
│   ├── FeatureDetail.tsx
│   └── index.ts
│
├── hooks/           # Feature-specific hooks
│   ├── use-feature.ts
│   ├── use-feature-filters.ts
│   └── index.ts
│
├── types/           # Feature-specific types
│   └── index.ts
│
├── utils/           # Feature-specific utilities
│   ├── calculations.ts
│   ├── validators.ts
│   └── index.ts
│
└── index.ts         # Public API (barrel export)
```

## 🔧 Import Patterns

### Path Aliases

```typescript
// Config
import { ROUTES, API_CONFIG } from "@/config";

// Core
import { apiClient } from "@/core/api";
import { Providers } from "@/core/providers";

// Shared
import { cn, formatCurrency } from "@/shared/utils";
import { Button } from "@/shared/components/ui";
import { useDebounce } from "@/shared/hooks";

// Features
import { useOrders, Order } from "@/features/orders";
import { useProducts } from "@/features/products";
import { useAuth } from "@/features/auth";
```

### Barrel Exports

Each module exports through `index.ts`:

```typescript
// ✅ Good - Import from feature
import { useOrders, Order } from "@/features/orders";

// ❌ Bad - Import from deep path
import { useOrders } from "@/features/orders/hooks/use-orders";
```

## 🎨 Component Organization

### Shared Components

```
shared/components/
├── ui/              # Base UI components (shadcn/ui)
│   ├── button.tsx
│   ├── input.tsx
│   └── dialog.tsx
│
└── common/          # Common business components
    ├── ErrorBoundary.tsx
    ├── LoadingSpinner.tsx
    └── EmptyState.tsx
```

### Feature Components

```
features/orders/components/
├── OrderList.tsx        # Main list view
├── OrderDetail.tsx      # Detail view
├── OrderForm.tsx        # Form component
├── OrderFilters.tsx     # Filters component
└── OrderCard.tsx        # Card component
```

## 🔄 Data Flow

### API Layer

```typescript
// 1. Define API calls
export const ordersApi = {
  getOrders: (filters) => apiClient.get("/orders", { params: filters }),
  getOrderById: (id) => apiClient.get(`/orders/${id}`),
};

// 2. Create React Query hooks
export function useOrders(filters) {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => ordersApi.getOrders(filters),
  });
}

// 3. Use in components
function OrderList() {
  const { data, isLoading } = useOrders({ status: "pending" });
  // ...
}
```

## 🧪 Testing Strategy

### Unit Tests

- Test utilities and pure functions
- Test custom hooks with React Testing Library
- Test API functions with mocked axios

### Integration Tests

- Test feature workflows
- Test component interactions
- Test API integration

### E2E Tests

- Test critical user flows
- Test across features

## 📝 Naming Conventions

### Files

- Components: `PascalCase.tsx` (e.g., `OrderList.tsx`)
- Hooks: `kebab-case.ts` (e.g., `use-orders.ts`)
- Utils: `kebab-case.ts` (e.g., `format-currency.ts`)
- Types: `kebab-case.ts` or `index.ts`

### Functions

- Components: `PascalCase` (e.g., `OrderList`)
- Hooks: `camelCase` with `use` prefix (e.g., `useOrders`)
- Utils: `camelCase` (e.g., `formatCurrency`)
- Types: `PascalCase` (e.g., `Order`, `OrderStatus`)

### Variables

- Constants: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)
- Regular: `camelCase` (e.g., `orderList`)

## 🚀 Adding New Features

1. **Create feature directory**

   ```bash
   mkdir -p src/features/feature-name/{api,components,hooks,types,utils}
   ```

2. **Define types**

   ```typescript
   // src/features/feature-name/types/index.ts
   export interface FeatureEntity { ... }
   ```

3. **Create API layer**

   ```typescript
   // src/features/feature-name/api/feature.api.ts
   export const featureApi = { ... }
   ```

4. **Create hooks**

   ```typescript
   // src/features/feature-name/hooks/use-feature.ts
   export function useFeature() { ... }
   ```

5. **Build components**

   ```typescript
   // src/features/feature-name/components/FeatureList.tsx
   export function FeatureList() { ... }
   ```

6. **Export public API**
   ```typescript
   // src/features/feature-name/index.ts
   export * from "./types";
   export * from "./api";
   export * from "./hooks";
   ```

## 🔐 Best Practices

### 1. Keep Features Independent

- Features should not import from other features
- Share common code through `shared/`
- Use events or callbacks for cross-feature communication

### 2. Use TypeScript Strictly

- Enable strict mode
- Define explicit types
- Avoid `any` type

### 3. Follow React Best Practices

- Use functional components
- Leverage hooks
- Memoize expensive computations
- Use React Query for server state

### 4. Code Organization

- One component per file
- Co-locate related code
- Keep files small and focused
- Use barrel exports

### 5. Performance

- Lazy load routes and heavy components
- Optimize images
- Use React Query caching
- Implement pagination

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Feature-Sliced Design](https://feature-sliced.design/)
