/**
 * Order status utilities
 */

import type { OrderStatus } from "../types";

/**
 * Get status color for UI
 */
export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    pending: "yellow",
    processing: "blue",
    shipped: "purple",
    delivered: "green",
    cancelled: "red",
  };
  return colors[status];
}

/**
 * Get status label
 */
export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status];
}

/**
 * Check if order can be edited
 */
export function canEditOrder(status: OrderStatus): boolean {
  return status === "pending" || status === "processing";
}

/**
 * Check if order can be cancelled
 */
export function canCancelOrder(status: OrderStatus): boolean {
  return status !== "delivered" && status !== "cancelled";
}

/**
 * Get next possible statuses
 */
export function getNextStatuses(currentStatus: OrderStatus): OrderStatus[] {
  const transitions: Record<OrderStatus, OrderStatus[]> = {
    pending: ["processing", "cancelled"],
    processing: ["shipped", "cancelled"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
  };
  return transitions[currentStatus];
}

/**
 * Check if status transition is valid
 */
export function isValidStatusTransition(from: OrderStatus, to: OrderStatus): boolean {
  const validTransitions = getNextStatuses(from);
  return validTransitions.includes(to);
}
