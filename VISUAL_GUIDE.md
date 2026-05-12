# 🎨 Visual Guide - Cấu trúc dự án

## 📊 Tổng quan kiến trúc

```
┌─────────────────────────────────────────────────────────────┐
│                         APP LAYER                            │
│                    (Next.js App Router)                      │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Orders  │  │ Products │  │   Auth   │  │   Home   │   │
│  │  Routes  │  │  Routes  │  │  Routes  │  │  Route   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      FEATURES LAYER                          │
│                   (Business Logic)                           │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Orders Feature  │  │ Products Feature │                │
│  │                  │  │                  │                │
│  │  • Types         │  │  • Types         │                │
│  │  • API           │  │  • API           │                │
│  │  • Hooks         │  │  • Hooks         │                │
│  │  • Components    │  │  • Components    │                │
│  │  • Utils         │  │  • Utils         │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │   Auth Feature   │  │ Customers Feature│                │
│  │                  │  │                  │                │
│  │  • Types         │  │  • Types         │                │
│  │  • API           │  │  • API           │                │
│  │  • Hooks         │  │  • Hooks         │                │
│  │  • Components    │  │  • Components    │                │
│  │  • Utils         │  │  • Utils         │                │
│  └──────────────────┘  └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      SHARED LAYER                            │
│                  (Reusable Resources)                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Components  │  │    Hooks     │  │    Utils     │     │
│  │              │  │              │  │              │     │
│  │  • UI        │  │  • Debounce  │  │  • Format    │     │
│  │  • Common    │  │  • Storage   │  │  • Validate  │     │
│  │  • Layout    │  │  • Media     │  │  • CN        │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐                                           │
│  │    Types     │                                           │
│  │              │                                           │
│  │  • Common    │                                           │
│  │  • Base      │                                           │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                       CORE LAYER                             │
│                   (Infrastructure)                           │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  API Client  │  │   Providers  │                        │
│  │              │  │              │                        │
│  │  • Axios     │  │  • Query     │                        │
│  │  • Intercept │  │  • Auth      │                        │
│  │  • Types     │  │  • Theme     │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      CONFIG LAYER                            │
│                   (Configuration)                            │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Constants   │  │ Environment  │  │    Routes    │     │
│  │              │  │              │  │              │     │
│  │  • API       │  │  • Env Vars  │  │  • Paths     │     │
│  │  • Query     │  │  • Flags     │  │  • Keys      │     │
│  │  • Status    │  │  • Mode      │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### 1. User Action → API Call → UI Update

```
┌──────────────┐
│     User     │
│   Clicks     │
│   Button     │
└──────┬───────┘
       │
       ↓
┌──────────────────────────────────────┐
│         Component                     │
│  const { mutate } = useCreateOrder() │
│  mutate(orderData)                   │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│         Hook (React Query)            │
│  useMutation({                        │
│    mutationFn: ordersApi.create       │
│  })                                   │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│         API Layer                     │
│  ordersApi.create(data)               │
│  → apiClient.post('/orders', data)    │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│      API Client (Axios)               │
│  • Add auth token                     │
│  • Add headers                        │
│  • Send request                       │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│         Backend API                   │
│  Process request                      │
│  Return response                      │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│      Response Interceptor             │
│  • Handle errors                      │
│  • Transform data                     │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│      React Query Cache                │
│  • Update cache                       │
│  • Invalidate queries                 │
│  • Trigger refetch                    │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│         Component                     │
│  • UI updates automatically           │
│  • Show success message               │
│  • Redirect if needed                 │
└───────────────────────────────────────┘
```

## 🎯 Feature Module Structure

### Orders Feature Example

```
features/orders/
│
├── 📁 api/                    # API Layer
│   ├── orders.api.ts         # ← API calls
│   │   ├── getOrders()
│   │   ├── getOrderById()
│   │   ├── createOrder()
│   │   ├── updateOrder()
│   │   └── deleteOrder()
│   └── index.ts              # ← Barrel export
│
├── 📁 components/             # UI Layer
│   ├── OrderList.tsx         # ← List view
│   ├── OrderDetail.tsx       # ← Detail view
│   ├── OrderForm.tsx         # ← Form
│   ├── OrderCard.tsx         # ← Card component
│   ├── OrderFilters.tsx      # ← Filters
│   └── index.ts              # ← Barrel export
│
├── 📁 hooks/                  # Data Layer
│   ├── use-orders.ts         # ← Data fetching
│   │   ├── useOrders()
│   │   ├── useOrder()
│   │   ├── useCreateOrder()
│   │   ├── useUpdateOrder()
│   │   └── useDeleteOrder()
│   ├── use-order-filters.ts  # ← Filter logic
│   └── index.ts              # ← Barrel export
│
├── 📁 types/                  # Type Layer
│   └── index.ts              # ← All types
│       ├── Order
│       ├── OrderStatus
│       ├── OrderFilters
│       ├── CreateOrderInput
│       └── UpdateOrderInput
│
├── 📁 utils/                  # Utility Layer
│   ├── order-calculations.ts # ← Calculations
│   │   ├── calculateTotal()
│   │   ├── calculateTax()
│   │   └── calculateShipping()
│   ├── order-status.ts       # ← Status helpers
│   │   ├── getStatusColor()
│   │   ├── canEditOrder()
│   │   └── canCancelOrder()
│   └── index.ts              # ← Barrel export
│
└── index.ts                   # ← Public API
    ├── export * from './types'
    ├── export * from './api'
    ├── export * from './hooks'
    └── export * from './utils'
```

## 🔗 Import Flow

### Clean Imports với Barrel Exports

```typescript
// ❌ BAD - Deep imports
import { Order } from "@/features/orders/types/index";
import { useOrders } from "@/features/orders/hooks/use-orders";
import { ordersApi } from "@/features/orders/api/orders.api";
import { calculateTotal } from "@/features/orders/utils/order-calculations";

// ✅ GOOD - Barrel exports
import {
  Order, // from types
  useOrders, // from hooks
  ordersApi, // from api
  calculateTotal, // from utils
} from "@/features/orders";
```

### Import Hierarchy

```
Level 1: External Libraries
  ↓
Level 2: Config
  ↓
Level 3: Core
  ↓
Level 4: Shared
  ↓
Level 5: Features
  ↓
Level 6: Relative Imports
```

```typescript
// Example
import { useState } from "react"; // Level 1
import { ROUTES } from "@/config"; // Level 2
import { apiClient } from "@/core/api"; // Level 3
import { formatCurrency } from "@/shared/utils"; // Level 4
import { useOrders } from "@/features/orders"; // Level 5
import { OrderCard } from "./OrderCard"; // Level 6
```

## 🎨 Component Composition

### Container/Presentational Pattern

```
┌─────────────────────────────────────────┐
│      OrderListContainer (Smart)         │
│                                         │
│  • Fetches data (useOrders)            │
│  • Handles loading/error states        │
│  • Manages business logic              │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │   OrderListView (Presentational)  │ │
│  │                                   │ │
│  │  • Receives data as props         │ │
│  │  • Pure UI rendering              │ │
│  │  • No business logic              │ │
│  │                                   │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │  OrderCard (Presentational) │ │ │
│  │  │                             │ │ │
│  │  │  • Single order display     │ │ │
│  │  │  • Reusable component       │ │ │
│  │  └─────────────────────────────┘ │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## 🔄 State Management Flow

### React Query Cache Flow

```
┌──────────────────────────────────────────────────────┐
│                   React Query                         │
│                                                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │   Orders   │  │  Products  │  │    Auth    │    │
│  │   Cache    │  │   Cache    │  │   Cache    │    │
│  └────────────┘  └────────────┘  └────────────┘    │
│                                                       │
│  Features:                                           │
│  • Automatic caching                                 │
│  • Background refetch                                │
│  • Optimistic updates                                │
│  • Cache invalidation                                │
└──────────────────────────────────────────────────────┘
         ↓                ↓                ↓
┌────────────┐  ┌────────────┐  ┌────────────┐
│ Component  │  │ Component  │  │ Component  │
│     A      │  │     B      │  │     C      │
└────────────┘  └────────────┘  └────────────┘
```

## 📱 Responsive Design Flow

```
┌─────────────────────────────────────────┐
│           useMediaQuery Hook            │
│                                         │
│  const isMobile = useIsMobile()        │
│  const isTablet = useIsTablet()        │
│  const isDesktop = useIsDesktop()      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          Conditional Rendering          │
│                                         │
│  {isMobile && <MobileView />}          │
│  {isTablet && <TabletView />}          │
│  {isDesktop && <DesktopView />}        │
└─────────────────────────────────────────┘
```

## 🎯 Feature Development Workflow

```
1. Define Types
   └─→ features/feature-name/types/index.ts
        ├─ Interface definitions
        ├─ Type aliases
        └─ Enums

2. Create API Layer
   └─→ features/feature-name/api/feature.api.ts
        ├─ API endpoints
        ├─ Request/response types
        └─ Error handling

3. Build Hooks
   └─→ features/feature-name/hooks/use-feature.ts
        ├─ useQuery for fetching
        ├─ useMutation for updates
        └─ Custom logic hooks

4. Create Components
   └─→ features/feature-name/components/
        ├─ Container components
        ├─ Presentational components
        └─ Sub-components

5. Add Utils (if needed)
   └─→ features/feature-name/utils/
        ├─ Calculations
        ├─ Validators
        └─ Formatters

6. Export Public API
   └─→ features/feature-name/index.ts
        └─ Barrel exports
```

## 🚀 Quick Start Visual

```
┌─────────────────────────────────────────────────────┐
│  1. Clone & Install                                  │
│     git clone <repo>                                 │
│     pnpm install                                     │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  2. Start Dev Server                                 │
│     pnpm dev                                         │
│     → http://localhost:3000                          │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  3. Login                                            │
│     Email: admin@example.com                         │
│     Password: admin123                               │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  4. Explore Features                                 │
│     • View orders                                    │
│     • Create order                                   │
│     • Filter & search                                │
│     • View details                                   │
└─────────────────────────────────────────────────────┘
```

## 📚 Learning Path

```
Day 1: Understanding Structure
  ├─ Read STRUCTURE_README.md
  ├─ Explore features/ folder
  └─ Check shared/ resources

Day 2: Deep Dive
  ├─ Read ARCHITECTURE.md
  ├─ Study one feature (orders)
  └─ Understand data flow

Day 3: Patterns
  ├─ Read PATTERNS.md
  ├─ Practice component patterns
  └─ Try custom hooks

Day 4: Migration
  ├─ Read MIGRATION_GUIDE.md
  ├─ Start migrating one feature
  └─ Test thoroughly

Day 5: Practice
  ├─ Create new feature
  ├─ Use create-feature.sh script
  └─ Follow best practices
```

---

**Visual Guide Complete! 🎨**

_Tham khảo các file documentation khác để hiểu sâu hơn về từng phần._
