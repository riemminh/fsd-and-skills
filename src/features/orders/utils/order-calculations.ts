/**
 * Order calculation utilities
 */

import type { OrderItem, Order } from "../types";

/**
 * Calculate subtotal from order items
 */
export function calculateSubtotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}

/**
 * Calculate tax (example: 10%)
 */
export function calculateTax(subtotal: number, taxRate: number = 0.1): number {
  return subtotal * taxRate;
}

/**
 * Calculate shipping cost based on subtotal
 */
export function calculateShipping(subtotal: number): number {
  if (subtotal >= 100) return 0; // Free shipping over $100
  if (subtotal >= 50) return 5;
  return 10;
}

/**
 * Calculate order total
 */
export function calculateTotal(subtotal: number, tax: number, shipping: number): number {
  return subtotal + tax + shipping;
}

/**
 * Calculate item subtotal
 */
export function calculateItemSubtotal(price: number, quantity: number): number {
  return price * quantity;
}

/**
 * Get order summary
 */
export function getOrderSummary(order: Order) {
  return {
    itemCount: order.items.length,
    totalQuantity: order.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: order.subtotal,
    tax: order.tax,
    shipping: order.shipping,
    total: order.total,
  };
}
