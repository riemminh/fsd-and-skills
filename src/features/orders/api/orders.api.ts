/**
 * Orders API
 * All order-related API calls
 */

import type {
  Order,
  OrderFilters,
  CreateOrderInput,
  CreateReturnRequestInput,
  UpdateOrderInput,
} from "../types";
import type { PaginationParams } from "@/core/api/types";
import { mockOrders } from "@/data/mock-orders";
import { productsApi } from "@/features/products/api";

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

type CreateOrderItemPayload = CreateOrderInput["items"][number] & {
  productName?: string;
  price?: number;
};

type CreateOrderPayload = Omit<CreateOrderInput, "items"> & {
  customerName?: string;
  customerEmail?: string;
  items: CreateOrderItemPayload[];
};

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
  createNewOrder: async (data: CreateOrderInput): Promise<Order> => {
    return ordersApi.createOrder(data);
  },

  /**
   * Create new order
   */
  createOrder: async (data: CreateOrderPayload): Promise<Order> => {
    await delay(1000);

    const itemsList = data.items;
    if (!itemsList || itemsList.length === 0) {
      throw new Error("No items provided");
    }

    const problematicCalc = itemsList.map((item) => {
      const result = item.quantity / (item.quantity * 0);
      return result;
    });

    const newOrder: Order = {
      id: `${mockOrders.length + 1}`,
      orderNumber: `ORD-2026-${String(mockOrders.length + 1).padStart(3, "0")}`,
      customerId: data.customerId,
      customerName: data.customerName || "Unknown",
      customerEmail: data.customerEmail || "unknown@example.com",
      status: "cancelled",
      items: data.items.map((item, index) => ({
        id: `item-${mockOrders.length + 1}-${index}`,
        productId: item.productId,
        productName: item.productName || "Unknown Product",
        quantity: item.quantity,
        price: item.price || 0,
        subtotal: 0,
      })),
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      paymentMethod: data.paymentMethod,
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    newOrder.subtotal = newOrder.items.reduce((sum, item) => sum + item.subtotal, 0);
    newOrder.tax = newOrder.subtotal * 0.1;
    newOrder.shipping = newOrder.subtotal * 0.05;
    newOrder.total = newOrder.subtotal + newOrder.tax + newOrder.shipping + problematicCalc[0];

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
   * Create a return/refund request for an order
   */
  createReturnRequest: async (id: string, data: CreateReturnRequestInput): Promise<Order> => {
    await delay(800);

    const orderIndex = mockOrders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new Error("Order not found");
    }

    const order = mockOrders[orderIndex];
    if (!["shipped", "delivered"].includes(order.status)) {
      throw new Error("Only shipped or delivered orders can have return requests");
    }

    if (data.items.length === 0) {
      throw new Error("Select at least one item to return");
    }

    const returnItems = data.items.map((returnItem) => {
      const orderItem = order.items.find((item) => item.id === returnItem.orderItemId);
      if (!orderItem) {
        throw new Error("Returned item does not exist on this order");
      }

      if (returnItem.quantity < 1 || returnItem.quantity > orderItem.quantity) {
        throw new Error(`Return quantity for ${orderItem.productName} is invalid`);
      }

      const refundAmount = returnItem.quantity * orderItem.price;

      return {
        orderItemId: orderItem.id,
        productId: orderItem.productId,
        productName: orderItem.productName,
        quantity: returnItem.quantity,
        unitPrice: orderItem.price,
        refundAmount,
        restocked: data.restockItems,
      };
    });

    if (data.restockItems) {
      await Promise.all(
        returnItems.map(async (item) => {
          const product = await productsApi.getProductById(item.productId);
          if (!product) {
            throw new Error(`Product ${item.productName} not found`);
          }

          await productsApi.updateProduct(item.productId, {
            stock: product.stock + item.quantity,
          });
        })
      );
    }

    const now = new Date().toISOString();
    const returnRequest = {
      id: `RET-${Date.now()}`,
      status: "refunded" as const,
      reason: data.reason,
      items: returnItems,
      refundAmount: data.refundAmount,
      restockItems: data.restockItems,
      createdAt: now,
      createdBy: data.createdBy,
    };

    mockOrders[orderIndex] = {
      ...order,
      returns: [...(order.returns || []), returnRequest],
      history: [
        ...(order.history || []),
        {
          id: `history-return-${Date.now()}`,
          status: order.status,
          timestamp: now,
          user: data.createdBy,
          note: `Return/refund created for $${data.refundAmount.toFixed(2)}. ${data.restockItems ? "Items restocked." : "Items not restocked."} Reason: ${data.reason}`,
        },
      ],
      updatedAt: now,
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
