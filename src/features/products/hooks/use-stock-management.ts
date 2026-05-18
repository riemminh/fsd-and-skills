/**
 * Stock Management Hook
 * Manages inventory updates for orders
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config";
import { productsApi } from "../api";
import { calculateStockAfterOrder, calculateStockAfterCancellation } from "../utils";

interface UpdateStockForOrderParams {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

interface RestoreStockForCancelledOrderParams {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

/**
 * Update stock when order is created
 * Reduces stock for each product in the order
 */
export function useUpdateStockForOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items }: UpdateStockForOrderParams) => {
      // Update stock for each product
      const updates = await Promise.all(
        items.map(async (item) => {
          const product = await productsApi.getProductById(item.productId);
          if (!product) {
            throw new Error(`Product ${item.productId} not found`);
          }

          const newStock = calculateStockAfterOrder(product.stock, item.quantity);

          return productsApi.updateProduct(item.productId, {
            stock: newStock,
          });
        })
      );

      return updates;
    },
    onSuccess: () => {
      // Invalidate products queries to refresh stock data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ALL });
    },
  });
}

/**
 * Restore stock when order is cancelled
 * Adds back stock for each product in the cancelled order
 */
export function useRestoreStockForCancelledOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items }: RestoreStockForCancelledOrderParams) => {
      // Restore stock for each product
      const updates = await Promise.all(
        items.map(async (item) => {
          const product = await productsApi.getProductById(item.productId);
          if (!product) {
            throw new Error(`Product ${item.productId} not found`);
          }

          const newStock = calculateStockAfterCancellation(product.stock, item.quantity);

          return productsApi.updateProduct(item.productId, {
            stock: newStock,
          });
        })
      );

      return updates;
    },
    onSuccess: () => {
      // Invalidate products queries to refresh stock data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ALL });
    },
  });
}

/**
 * Hook to get low stock alerts
 */
export function useLowStockAlerts() {
  const queryClient = useQueryClient();

  return {
    checkLowStock: async (threshold: number = 20) => {
      const productsData = await productsApi.getProducts({}, { page: 1, pageSize: 1000 });
      return productsData.data.filter((product) => product.stock <= threshold && product.stock > 0);
    },
    checkOutOfStock: async () => {
      const productsData = await productsApi.getProducts({}, { page: 1, pageSize: 1000 });
      return productsData.data.filter((product) => product.stock === 0);
    },
  };
}
