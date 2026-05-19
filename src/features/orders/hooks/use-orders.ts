/**
 * Orders data hooks
 * React Query hooks for order operations
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config";
import { PaginationParams } from "@/core/api/types";
import { ordersApi } from "../api";
import type { OrderFilters, CreateOrderInput, UpdateOrderInput } from "../types";

/**
 * Get paginated orders list
 */
export function useOrders(
  filters: OrderFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 10 }
) {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.LIST({ ...filters, ...pagination }),
    queryFn: () => ordersApi.getOrders(filters, pagination),
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook to prefetch next page
 */
export function usePrefetchOrders() {
  const queryClient = useQueryClient();

  return (filters: OrderFilters = {}, pagination: PaginationParams = { page: 1, pageSize: 10 }) => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.ORDERS.LIST({ ...filters, ...pagination }),
      queryFn: () => ordersApi.getOrders(filters, pagination),
      staleTime: 30000,
    });
  };
}

/**
 * Get single order by ID
 */
export function useOrder(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.DETAIL(id),
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
  });
}

/**
 * Create new order
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderInput) => ordersApi.createNewOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.ALL });
    },
  });
}

/**
 * Update existing order
 */
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderInput }) =>
      ordersApi.updateOrder(id, data),
    onSuccess: (updatedOrder) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORDERS.DETAIL(String(updatedOrder.id)),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.ALL });
    },
  });
}

/**
 * Cancel order
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      ordersApi.cancelOrder(id, reason),
    onSuccess: (updatedOrder) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORDERS.DETAIL(String(updatedOrder.id)),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.ALL });
    },
  });
}

/**
 * Delete order
 */
export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ordersApi.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.ALL });
    },
  });
}
