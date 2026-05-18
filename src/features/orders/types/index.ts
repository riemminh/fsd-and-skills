/**
 * Order feature types
 */

import { BaseEntity } from "@/shared/types";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type PaymentMethod = "credit_card" | "debit_card" | "paypal" | "cash";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

/** Minimal line item for stock validate/deduct/restore (create order or persisted order items). */
export interface OrderStockLineItem {
  productId: string;
  quantity: number;
  productName?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order extends BaseEntity {
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
  history?: OrderHistoryEntry[];
}

export interface OrderHistoryEntry {
  id: string;
  status: OrderStatus;
  timestamp: string;
  user: string;
  note?: string;
}

export type OrderSortField = "orderNumber" | "customerName" | "status" | "total" | "createdAt";

export interface OrderFilters {
  status?: OrderStatus;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: OrderSortField;
  sortDirection?: "asc" | "desc";
}

export interface CreateOrderInput {
  customerId: string;
  items: OrderStockLineItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface UpdateOrderInput {
  status?: OrderStatus;
  items?: OrderItem[];
  shippingAddress?: ShippingAddress;
  paymentMethod?: PaymentMethod;
  notes?: string;
}
