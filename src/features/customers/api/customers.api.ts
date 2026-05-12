/**
 * Customers API
 * All customer-related API calls
 */

import type { Customer } from "../types";
import { mockCustomers } from "@/data/mock-customers";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const customersApi = {
  /**
   * Search customers
   */
  searchCustomers: async (query: string): Promise<Customer[]> => {
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

  /**
   * Get customer by ID
   */
  getCustomerById: async (id: string): Promise<Customer | null> => {
    await delay(200);
    return mockCustomers.find((customer) => customer.id === id) || null;
  },
};
