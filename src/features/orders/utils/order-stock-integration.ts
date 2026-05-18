/**
 * Order Stock Integration
 * Handles stock updates when orders are created or cancelled
 */

import { productsApi } from "@/features/products/api";
import {
  calculateStockAfterOrder,
  calculateStockAfterCancellation,
  validateStockAvailability,
} from "@/features/products/utils";
import type { OrderStockLineItem } from "@/features/orders/types";

/**
 * Validate and update stock for order creation
 */
export async function processOrderStockUpdate(items: OrderStockLineItem[]): Promise<{
  success: boolean;
  errors?: string[];
}> {
  try {
    // Get all products involved in the order
    const productIds = items.map((item) => item.productId);
    const products = await Promise.all(productIds.map((id) => productsApi.getProductById(id)));

    // Filter out null products
    const validProducts = products.filter((p) => p !== null);

    // Validate stock availability
    const validation = validateStockAvailability(
      items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      validProducts
    );

    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors,
      };
    }

    // Update stock for each product
    await Promise.all(
      items.map(async (item) => {
        const product = validProducts.find((p) => p.id === item.productId);
        if (!product) return;

        const newStock = calculateStockAfterOrder(product.stock, item.quantity);
        await productsApi.updateProduct(item.productId, { stock: newStock });
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Failed to update stock:", error);
    return {
      success: false,
      errors: ["Failed to update product stock"],
    };
  }
}

/**
 * Restore stock when order is cancelled
 */
export async function restoreOrderStock(items: OrderStockLineItem[]): Promise<{
  success: boolean;
  errors?: string[];
}> {
  try {
    // Restore stock for each product
    await Promise.all(
      items.map(async (item) => {
        const product = await productsApi.getProductById(item.productId);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        const newStock = calculateStockAfterCancellation(product.stock, item.quantity);
        await productsApi.updateProduct(item.productId, { stock: newStock });
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Failed to restore stock:", error);
    return {
      success: false,
      errors: ["Failed to restore product stock"],
    };
  }
}

/**
 * Check if order can be fulfilled based on current stock
 */
export async function canFulfillOrder(items: OrderStockLineItem[]): Promise<{
  canFulfill: boolean;
  insufficientItems?: Array<{
    productId: string;
    productName: string;
    requested: number;
    available: number;
  }>;
}> {
  try {
    const insufficientItems: Array<{
      productId: string;
      productName: string;
      requested: number;
      available: number;
    }> = [];

    for (const item of items) {
      const product = await productsApi.getProductById(item.productId);
      if (!product) {
        insufficientItems.push({
          productId: item.productId,
          productName: item.productName ?? item.productId,
          requested: item.quantity,
          available: 0,
        });
        continue;
      }

      if (product.stock < item.quantity) {
        insufficientItems.push({
          productId: item.productId,
          productName: item.productName ?? product.name,
          requested: item.quantity,
          available: product.stock,
        });
      }
    }

    return {
      canFulfill: insufficientItems.length === 0,
      insufficientItems: insufficientItems.length > 0 ? insufficientItems : undefined,
    };
  } catch (error) {
    console.error("Failed to check order fulfillment:", error);
    return {
      canFulfill: false,
    };
  }
}
