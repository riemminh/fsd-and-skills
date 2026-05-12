import type { OrderFilters, PaginationParams } from "@/types/order";

export const queryKeys = {
  orders: {
    all: ["orders"] as const,
    lists: () => [...queryKeys.orders.all, "list"] as const,
    list: (filters: OrderFilters, pagination: PaginationParams) =>
      [...queryKeys.orders.lists(), { filters, pagination }] as const,
    details: () => [...queryKeys.orders.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
  },
  products: {
    all: ["products"] as const,
    search: (query: string) => [...queryKeys.products.all, "search", query] as const,
  },
  customers: {
    all: ["customers"] as const,
    search: (query: string) => [...queryKeys.customers.all, "search", query] as const,
  },
  auth: {
    user: ["auth", "user"] as const,
  },
};
