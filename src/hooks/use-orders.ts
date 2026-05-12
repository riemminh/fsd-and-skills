import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import { queryKeys } from "@/lib/query-keys";
import type { OrderFilters, PaginationParams, Order } from "@/types/order";
import type { CreateOrderFormData } from "@/types/form";

export function useOrders(
  filters: OrderFilters = {},
  pagination: PaginationParams = { page: 1, pageSize: 10 }
) {
  return useQuery({
    queryKey: queryKeys.orders.list(filters, pagination),
    queryFn: () => orderService.getOrders(filters, pagination),
    staleTime: 30000, // 30 seconds
  });
}

// Hook to prefetch next page
export function usePrefetchOrders() {
  const queryClient = useQueryClient();

  return (filters: OrderFilters = {}, pagination: PaginationParams = { page: 1, pageSize: 10 }) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.orders.list(filters, pagination),
      queryFn: () => orderService.getOrders(filters, pagination),
      staleTime: 30000,
    });
  };
}

export function useOrderById(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderFormData) => orderService.createOrder(data),
    onSuccess: () => {
      // Invalidate all order lists
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Order> }) =>
      orderService.updateOrder(id, data),
    onSuccess: (updatedOrder) => {
      // Invalidate specific order detail
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.detail(String(updatedOrder.id)),
      });
      // Invalidate all order lists
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderService.deleteOrder(id),
    onSuccess: () => {
      // Invalidate all order lists
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderService.cancelOrder(id),
    onSuccess: (updatedOrder) => {
      // Invalidate specific order detail
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.detail(String(updatedOrder.id)),
      });
      // Invalidate all order lists
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.lists() });
    },
  });
}
