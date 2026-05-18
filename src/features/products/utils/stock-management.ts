/**
 * Stock Management Utilities
 * Functions for managing product inventory
 */

import { Product } from "../types";

export const STOCK_THRESHOLDS = {
  LOW: 20,
  CRITICAL: 5,
  OUT_OF_STOCK: 0,
} as const;

export type StockStatus = "in_stock" | "low_stock" | "critical_stock" | "out_of_stock";

/**
 * Get stock status based on quantity
 */
export function getStockStatus(stock: number): StockStatus {
  if (stock <= STOCK_THRESHOLDS.OUT_OF_STOCK) {
    return "out_of_stock";
  }
  if (stock <= STOCK_THRESHOLDS.CRITICAL) {
    return "critical_stock";
  }
  if (stock <= STOCK_THRESHOLDS.LOW) {
    return "low_stock";
  }
  return "in_stock";
}

/**
 * Check if product is available for order
 */
export function isProductAvailable(product: Product, requestedQuantity: number): boolean {
  return product.stock >= requestedQuantity;
}

/**
 * Calculate stock after order
 */
export function calculateStockAfterOrder(currentStock: number, orderQuantity: number): number {
  return Math.max(0, currentStock - orderQuantity);
}

/**
 * Calculate stock after order cancellation
 */
export function calculateStockAfterCancellation(
  currentStock: number,
  returnQuantity: number
): number {
  return currentStock + returnQuantity;
}

/**
 * Validate stock availability for multiple items
 */
export function validateStockAvailability(
  items: Array<{ productId: string; quantity: number }>,
  products: Product[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      errors.push(`Product ${item.productId} not found`);
      continue;
    }

    if (!isProductAvailable(product, item.quantity)) {
      errors.push(
        `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get products with low stock
 */
export function getLowStockProducts(products: Product[]): Product[] {
  return products.filter(
    (product) =>
      product.stock > STOCK_THRESHOLDS.OUT_OF_STOCK && product.stock <= STOCK_THRESHOLDS.LOW
  );
}

/**
 * Get out of stock products
 */
export function getOutOfStockProducts(products: Product[]): Product[] {
  return products.filter((product) => product.stock <= STOCK_THRESHOLDS.OUT_OF_STOCK);
}

/**
 * Format stock display text
 */
export function formatStockDisplay(stock: number): string {
  if (stock <= STOCK_THRESHOLDS.OUT_OF_STOCK) {
    return "Out of Stock";
  }
  if (stock <= STOCK_THRESHOLDS.CRITICAL) {
    return `Only ${stock} left!`;
  }
  if (stock <= STOCK_THRESHOLDS.LOW) {
    return `Low Stock (${stock})`;
  }
  return `${stock} in stock`;
}
