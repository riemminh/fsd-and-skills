/**
 * Customers data hooks
 * React Query hooks for customer operations
 */

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config";
import { customersApi } from "../api";

/**
 * Search customers
 */
export function useCustomerSearch(query: string) {
  return useQuery({
    queryKey: QUERY_KEYS.CUSTOMERS.LIST({ search: query }),
    queryFn: () => customersApi.searchCustomers(query),
    staleTime: 60000, // 1 minute
    enabled: query.length > 0,
  });
}

/**
 * Get customer by ID
 */
export function useCustomer(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.CUSTOMERS.DETAIL(id),
    queryFn: () => customersApi.getCustomerById(id),
    enabled: !!id,
  });
}
