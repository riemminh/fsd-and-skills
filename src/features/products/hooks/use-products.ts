/**
 * Products data hooks
 * React Query hooks for product operations
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config";
import { PaginationParams } from "@/core/api/types";
import { productsApi } from "../api";
import type { ProductFilters, CreateProductInput, UpdateProductInput } from "../types";

/**
 * Get paginated products list
 */
export function useProducts(filters?: ProductFilters, pagination?: PaginationParams) {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.LIST({ ...filters, ...pagination }),
    queryFn: () => productsApi.getProducts(filters, pagination),
  });
}

/**
 * Search products
 */
export function useProductSearch(query: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.LIST({ search: query }),
    queryFn: () => productsApi.searchProducts(query),
    staleTime: 60000, // 1 minute
    enabled: query.length > 0,
  });
}

/**
 * Get single product by ID
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.DETAIL(id),
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
  });
}

/**
 * Create new product
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductInput) => productsApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ALL });
    },
  });
}

/**
 * Update existing product
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductInput }) =>
      productsApi.updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.DETAIL(variables.id),
      });
    },
  });
}

/**
 * Delete product
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS.ALL });
    },
  });
}
