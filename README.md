# Order Management System

A modern, full-featured order management system built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## 🚀 Features

### Order Management

- **View Orders**: Paginated table with customizable page sizes (10-100 items)
- **Search**: Real-time search by order number, customer name, or email
- **Filter**: Advanced filtering by status, date range, and amount range
- **Create Orders**: Full form with customer/product autocomplete and dynamic items
- **Edit Orders**: Update order status with role-based access control
- **Cancel Orders**: Cancel orders with confirmation dialog
- **Order Timeline**: Visual history of status changes with timestamps

### User Interface

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Skeleton loaders and loading indicators
- **Empty States**: Helpful messages when no data is available
- **Error Handling**: Error boundary and graceful error recovery
- **Toast Notifications**: Success and error messages with Sonner

### Security & Access Control

- **Authentication**: Login/logout functionality
- **Role-Based Access**: Admin, Manager, and Viewer roles
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Conditional UI**: Show/hide features based on user role

### Data Management

- **React Query**: Server state management with caching
- **Optimistic Updates**: Instant UI updates before server confirmation
- **Automatic Cache Invalidation**: Keep data fresh
- **Background Refetching**: Update data in the background

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 6
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (20+ components)
- **State Management**: @tanstack/react-query 5
- **HTTP Client**: Axios 1.16
- **Forms**: React Hook Form 7 + Zod 4
- **Notifications**: Sonner 2
- **Icons**: Lucide React 1.14
- **Date Handling**: date-fns

---

## 📦 Installation

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd order-management
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Run development server**

```bash
pnpm dev
# or
npm run dev
```

4. **Open in browser**

```
http://localhost:3000
```

---

## 🎮 Usage

### Login Credentials

The system uses mock authentication. You can login with these credentials:

**Admin User:**

- Email: `admin@example.com`
- Password: `admin123`
- Role: Full access to all features

**Manager User:**

- Email: `manager@example.com`
- Password: `manager123`
- Role: Can create, edit, and cancel orders

**Viewer User:**

- Email: `viewer@example.com`
- Password: `viewer123`
- Role: Read-only access

### Features by Role

| Feature         | Admin | Manager | Viewer |
| --------------- | ----- | ------- | ------ |
| View Orders     | ✅    | ✅      | ✅     |
| Search & Filter | ✅    | ✅      | ✅     |
| View Details    | ✅    | ✅      | ✅     |
| View Timeline   | ✅    | ✅      | ✅     |
| Create Order    | ✅    | ✅      | ❌     |
| Edit Order      | ✅    | ✅      | ❌     |
| Cancel Order    | ✅    | ✅      | ❌     |
| Delete Order    | ✅    | ❌      | ❌     |
| Export Orders   | ✅    | ❌      | ❌     |

---

## 📂 Project Structure

> **🎉 NEW: Feature-Based Architecture**  
> This project now uses a modern, scalable architecture designed for enterprise applications.  
> See [STRUCTURE_README.md](./STRUCTURE_README.md) for complete details.

### New Structure (Recommended)

```
src/
├── app/                    # Next.js App Router
│   ├── orders/            # Order routes
│   ├── login/             # Login route
│   └── page.tsx           # Home page
│
├── features/              # 🎯 Feature modules (NEW)
│   ├── orders/           # Orders feature
│   │   ├── api/         # API calls
│   │   ├── components/  # UI components
│   │   ├── hooks/       # React hooks
│   │   ├── types/       # TypeScript types
│   │   ├── utils/       # Utilities
│   │   └── index.ts     # Public API
│   ├── products/        # Products feature
│   ├── auth/            # Auth feature
│   └── ...              # Other features
│
├── shared/               # 🔄 Shared resources (NEW)
│   ├── components/      # Reusable components
│   │   ├── ui/         # Base UI (shadcn/ui)
│   │   └── common/     # Common components
│   ├── hooks/          # Reusable hooks
│   ├── types/          # Shared types
│   └── utils/          # Utility functions
│
├── core/                # ⚙️ Core infrastructure (NEW)
│   ├── api/            # API client
│   └── providers/      # React providers
│
└── config/             # 🔧 Configuration (NEW)
    ├── constants.ts    # App constants
    └── env.ts         # Environment variables
```

### Legacy Structure (Being Migrated)

```
src/
├── components/         # All components (OLD)
├── hooks/             # All hooks (OLD)
├── services/          # API services (OLD)
├── types/             # All types (OLD)
├── contexts/          # React contexts (OLD)
├── data/              # Mock data
└── lib/               # Utilities (OLD)
```

### 📚 Documentation

- **[STRUCTURE_README.md](./STRUCTURE_README.md)** - Complete architecture overview
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Detailed architecture documentation
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Step-by-step migration guide
- **[PATTERNS.md](./PATTERNS.md)** - Design patterns & best practices
- **[SUMMARY.md](./SUMMARY.md)** - Quick summary & checklist

---

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server (http://localhost:3000)

# Build
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

---

## 🎨 Key Components

### Order List

- **Location**: `src/components/orders/order-list.tsx`
- **Features**: Search, filters, pagination, table view
- **State**: React Query for data fetching

### Order Detail Drawer

- **Location**: `src/components/orders/order-detail-drawer.tsx`
- **Features**: Full order details, timeline, edit/cancel actions
- **Tabs**: Details and History

### Create Order Form

- **Location**: `src/app/orders/create/page.tsx`
- **Features**: Customer/product autocomplete, dynamic items, validation
- **Validation**: Zod schema with React Hook Form

### Advanced Filters

- **Location**: `src/components/orders/advanced-filters.tsx`
- **Features**: Date range picker, amount range slider
- **UI**: Popover with calendar and slider components

### Order Timeline

- **Location**: `src/components/orders/order-timeline.tsx`
- **Features**: Visual status progression, timestamps, user attribution
- **Design**: Vertical timeline with color-coded status indicators

---

## 🔐 Authentication

The system uses a mock authentication service that simulates real authentication:

- **Session Storage**: User data stored in localStorage
- **Token**: Mock JWT token for API requests
- **Auto-redirect**: Unauthenticated users redirected to login
- **Role-based UI**: Components conditionally rendered based on user role

---

## 📊 Data Management

### React Query

- **Caching**: Automatic caching with configurable stale time
- **Background Refetch**: Keep data fresh in the background
- **Optimistic Updates**: Instant UI updates before server confirmation
- **Error Handling**: Automatic retry with exponential backoff

### Mock API

- **Realistic Delays**: Simulated network latency (300-1000ms)
- **Error Simulation**: Test error handling
- **Large Dataset**: 120+ mock orders for testing pagination

---

## 🎯 Future Enhancements

- [ ] Export orders to CSV/Excel
- [ ] Bulk actions (bulk update, bulk delete)
- [ ] Sort functionality
- [ ] Virtual scrolling for large lists
- [ ] Dark mode support
- [ ] Mobile-optimized card view
- [ ] Real-time updates with WebSocket
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] PDF invoice generation

---

## 🐛 Known Issues

- Port 3000 conflict: Dev server uses port 3001 when 3000 is occupied
- ESLint peer dependency warnings (non-critical)

---

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, React, and TypeScript**
