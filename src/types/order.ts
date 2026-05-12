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

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
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
  createdAt: string;
  updatedAt: string;
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
export type SortDirection = "asc" | "desc";

export interface OrderFilters {
  status?: OrderStatus;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: OrderSortField;
  sortDirection?: SortDirection;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface OrdersResponse {
  data: Order[];
  meta: PaginationMeta;
}
