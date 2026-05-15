/**
 * Canonical create-order validation schema.
 * Used by order forms — prefer importing from here over @/types/form.
 */
import { z } from "zod";

export const orderItemFormSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  productName: z.string().min(1, "Product name is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(0, "Price must be positive"),
});

export const shippingAddressFormSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),
});

export const createOrderFormSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Invalid email address"),
  items: z.array(orderItemFormSchema).min(1, "At least one item is required"),
  shippingAddress: shippingAddressFormSchema,
  paymentMethod: z.enum(["credit_card", "debit_card", "paypal", "cash"]),
  notes: z.string().optional(),
});

export type CreateOrderFormValues = z.infer<typeof createOrderFormSchema>;
