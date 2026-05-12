import { useQuery } from "@tanstack/react-query";
import { productService, customerService } from "@/services/product.service";
import { queryKeys } from "@/lib/query-keys";
import { useState, useEffect } from "react";

export function useProductSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.products.search(query),
    queryFn: () => productService.searchProducts(query),
    staleTime: 60000, // 1 minute
    enabled: query.length > 0,
  });
}

export function useCustomerSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.customers.search(query),
    queryFn: () => customerService.searchCustomers(query),
    staleTime: 60000, // 1 minute
    enabled: query.length > 0,
  });
}

// Debounced search hook
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
