import { z } from "zod";

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
  zipCode: z
    .string()
    .min(1, "Zip code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Use a valid US zip code (e.g. 10001)"),
  country: z.string().min(1, "Country is required"),
});

export const CreateOrderSchema = z
  .object({
    customerId: z.string().min(1, "Customer is required"),
    customerName: z.string().min(1, "Customer name is required"),
    customerEmail: z.string().email("Invalid email address"),
    items: z.array(OrderItemSchema).min(1, "At least one item is required"),
    shippingAddress: ShippingAddressSchema,
    paymentMethod: z.enum(["credit_card", "debit_card", "paypal", "cash"]),
    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const productIds = data.items.map((item) => item.productId).filter(Boolean);

    if (productIds.length > 1 && new Set(productIds).size !== productIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "Each line item must use a different product",
        path: ["items"],
      });
    }

    data.items.forEach((item, index) => {
      if (item.productId && item.productName.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Product selection is incomplete — choose the product again",
          path: ["items", index, "name"],
        });
      }
    });

    if (data.paymentMethod === "cash") {
      const instructions = data.notes?.trim() ?? "";
      if (instructions.length < 5) {
        ctx.addIssue({
          code: "custom",
          message: "Cash on delivery orders need delivery instructions in notes",
          path: ["shippingAddress", "street"],
        });
      }
    }
  });

export type CreateOrderFormData = z.infer<typeof CreateOrderSchema>;
export type OrderItemFormData = z.infer<typeof OrderItemSchema>;
export type ShippingAddressFormData = z.infer<typeof ShippingAddressSchema>;
