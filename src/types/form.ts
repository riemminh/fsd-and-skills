import { z } from "zod";
import type { PaymentMethod } from "./order";

export const OrderItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  productName: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
});

export const ShippingAddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),
});

export const CreateOrderSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Invalid email address"),
  items: z.array(OrderItemSchema).min(1, "At least one item is required"),
  shippingAddress: ShippingAddressSchema,
  paymentMethod: z.enum(["credit_card", "debit_card", "paypal", "cash"]),
  notes: z.string().optional(),
});

export type CreateOrderFormData = z.infer<typeof CreateOrderSchema>;
export type OrderItemFormData = z.infer<typeof OrderItemSchema>;
export type ShippingAddressFormData = z.infer<typeof ShippingAddressSchema>;
