/**
 * Orders API
 * All order-related API calls
 */

import type { Order, OrderFilters, CreateOrderInput, UpdateOrderInput } from "../types";
import type { PaginationParams } from "@/core/api/types";
import { mockOrders } from "@/data/mock-orders";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface OrdersResponse {
  data: Order[];
  meta: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export const ordersApi = {
  /**
   * Get paginated list of orders
   */
  getOrders: async (
    filters: OrderFilters = {},
    pagination: PaginationParams = { page: 1, pageSize: 10 }
  ): Promise<OrdersResponse> => {
    await delay(600);

    let filteredOrders = [...mockOrders];

    // Apply status filter
    if (filters.status) {
      filteredOrders = filteredOrders.filter((order) => order.status === filters.status);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchLower) ||
          order.customerName.toLowerCase().includes(searchLower) ||
          order.customerEmail.toLowerCase().includes(searchLower)
      );
    }

    // Apply date filters
    if (filters.dateFrom) {
      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.createdAt) >= new Date(filters.dateFrom!)
      );
    }

    if (filters.dateTo) {
      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.createdAt) <= new Date(filters.dateTo!)
      );
    }

    // Apply amount filters
    if (filters.minAmount !== undefined) {
      filteredOrders = filteredOrders.filter((order) => order.total >= filters.minAmount!);
    }

    if (filters.maxAmount !== undefined) {
      filteredOrders = filteredOrders.filter((order) => order.total <= filters.maxAmount!);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredOrders.sort((a, b) => {
        const aValue = a[filters.sortBy!];
        const bValue = b[filters.sortBy!];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return filters.sortDirection === "desc"
            ? bValue.localeCompare(aValue)
            : aValue.localeCompare(bValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return filters.sortDirection === "desc" ? bValue - aValue : aValue - bValue;
        }

        return 0;
      });
    }

    // Calculate pagination
    const totalItems = filteredOrders.length;
    const totalPages = Math.ceil(totalItems / (pagination.pageSize || 10));
    const startIndex = ((pagination.page || 1) - 1) * (pagination.pageSize || 10);
    const endIndex = startIndex + (pagination.pageSize || 10);

    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return {
      data: paginatedOrders,
      meta: {
        currentPage: pagination.page || 1,
        pageSize: pagination.pageSize || 10,
        totalItems,
        totalPages,
      },
    };
  },

  /**
   * Get single order by ID
   */
  getOrderById: async (id: string): Promise<Order | null> => {
    await delay(400);
    return mockOrders.find((order) => order.id === id) || null;
  },

  /**
   * Create new order
   */
  createOrder: async (data: CreateOrderInput): Promise<Order> => {
    await delay(1000);

    const newOrder: Order = {
      id: `${mockOrders.length + 1}`,
      orderNumber: `ORD-2026-${String(mockOrders.length + 1).padStart(3, "0")}`,
      customerId: data.customerId,
      customerName: (data as any).customerName || "Unknown",
      customerEmail: (data as any).customerEmail || "unknown@example.com",
      status: "pending",
      items: data.items.map((item, index) => ({
        id: `item-${mockOrders.length + 1}-${index}`,
        productId: item.productId,
        productName: (item as any).productName || "Unknown Product",
        quantity: item.quantity,
        price: (item as any).price || 0,
        subtotal: item.quantity * ((item as any).price || 0),
      })),
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod,
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Calculate totals
    newOrder.subtotal = newOrder.items.reduce((sum, item) => sum + item.subtotal, 0);
    newOrder.tax = newOrder.subtotal * 0.1;
    newOrder.shipping = newOrder.subtotal * 0.05;
    newOrder.total = newOrder.subtotal + newOrder.tax + newOrder.shipping;

    return newOrder;
  },

  /**
   * Update existing order
   */
  updateOrder: async (id: string, data: UpdateOrderInput): Promise<Order> => {
    await delay(800);

    const orderIndex = mockOrders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new Error("Order not found");
    }

    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return mockOrders[orderIndex];
  },

  /**
   * Cancel order
   */
  cancelOrder: async (id: string, reason?: string): Promise<Order> => {
    await delay(800);

    const orderIndex = mockOrders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new Error("Order not found");
    }

    mockOrders[orderIndex] = {
      ...mockOrders[orderIndex],
      status: "cancelled",
      notes: reason
        ? `${mockOrders[orderIndex].notes || ""}\nCancellation reason: ${reason}`
        : mockOrders[orderIndex].notes,
      updatedAt: new Date().toISOString(),
    };

    return mockOrders[orderIndex];
  },

  /**
   * Delete order
   */
  deleteOrder: async (id: string): Promise<void> => {
    await delay(600);

    const orderIndex = mockOrders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new Error("Order not found");
    }

    mockOrders.splice(orderIndex, 1);
  },
};
