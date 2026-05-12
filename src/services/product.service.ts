import type { Product } from "@/features/products/types";
import type { Customer } from "@/features/customers/types";
import { mockProducts } from "@/data/mock-products";
import { mockCustomers } from "@/data/mock-customers";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  async searchProducts(query: string): Promise<Product[]> {
    await delay(300);

    if (!query) {
      return mockProducts;
    }

    const queryLower = query.toLowerCase();
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(queryLower) ||
        product.description.toLowerCase().includes(queryLower)
    );
  },

  async getProductById(id: string): Promise<Product | null> {
    await delay(200);
    return mockProducts.find((product) => product.id === id) || null;
  },
};

export const customerService = {
  async searchCustomers(query: string): Promise<Customer[]> {
    await delay(300);

    if (!query) {
      return mockCustomers;
    }

    const queryLower = query.toLowerCase();
    return mockCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(queryLower) ||
        customer.email.toLowerCase().includes(queryLower)
    );
  },

  async getCustomerById(id: string): Promise<Customer | null> {
    await delay(200);
    return mockCustomers.find((customer) => customer.id === id) || null;
  },
};
