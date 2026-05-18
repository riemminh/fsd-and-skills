/**
 * Order with Stock Management Hook
 * Handles order creation and cancellation with automatic stock updates
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config";
import { ordersApi } from "../api";
import { processOrderStockUpdate, restoreOrderStock } from "../utils/order-stock-integration";
import type { CreateOrderInput } from "../types";

/**
 * Create order with automatic stock deduction
 */
export function useCreateOrderWithStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateOrderInput) => {
      // First, validate and update stock
      const stockResult = await processOrderStockUpdate(data.items);

      if (!stockResult.success) {
        throw new Error(stockResult.errors?.join(", ") || "Stock validation failed");
      }

      // Then create the order
      const order = await ordersApi.createOrder(data);

      return order;
    },
    onSuccess: () => {
      // Invalidate both orders and products queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.ALL });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ALL });
    },
    onError: (error) => {
      console.error("Failed to create order with stock update:", error);
    },
  });
}

/**
 * Cancel order with automatic stock restoration
 */
export function useCancelOrderWithStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      // Get the order first to access its items
      const order = await ordersApi.getOrderById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }

      // Only restore stock if order is not already cancelled
      if (order.status !== "cancelled") {
        // Restore stock
        const stockResult = await restoreOrderStock(order.items);

        if (!stockResult.success) {
          throw new Error(stockResult.errors?.join(", ") || "Stock restoration failed");
        }
      }

      // Then cancel the order
      const cancelledOrder = await ordersApi.cancelOrder(orderId);

      return cancelledOrder;
    },
    onSuccess: () => {
      // Invalidate both orders and products queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.ALL });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ALL });
    },
    onError: (error) => {
      console.error("Failed to cancel order with stock restoration:", error);
    },
  });
}
