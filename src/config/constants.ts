/**
 * Application-wide constants
 */

export const APP_CONFIG = {
  name: "Order Management System",
  version: "1.0.0",
  description: "Enterprise order management application",
} as const;

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 30000,
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ORDERS: {
    LIST: "/orders",
    CREATE: "/orders/create",
    DETAIL: (id: string) => `/orders/${id}`,
  },
  CUSTOMERS: {
    LIST: "/customers",
    DETAIL: (id: string) => `/customers/${id}`,
  },
  PRODUCTS: {
    LIST: "/products",
    CREATE: "/products/create",
    DETAIL: (id: string) => `/products/${id}`,
    EDIT: (id: string) => `/products/${id}/edit`,
  },
} as const;

export const QUERY_KEYS = {
  ORDERS: {
    ALL: ["orders"] as const,
    LIST: (filters?: Record<string, unknown>) => ["orders", "list", filters] as const,
    DETAIL: (id: string) => ["orders", "detail", id] as const,
  },
  PRODUCTS: {
    ALL: ["products"] as const,
    LIST: (filters?: Record<string, unknown>) => ["products", "list", filters] as const,
    DETAIL: (id: string) => ["products", "detail", id] as const,
  },
  CUSTOMERS: {
    ALL: ["customers"] as const,
    LIST: (filters?: Record<string, unknown>) => ["customers", "list", filters] as const,
    DETAIL: (id: string) => ["customers", "detail", id] as const,
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.PROCESSING]: "Processing",
  [ORDER_STATUS.SHIPPED]: "Shipped",
  [ORDER_STATUS.DELIVERED]: "Delivered",
  [ORDER_STATUS.CANCELLED]: "Cancelled",
} as const;
