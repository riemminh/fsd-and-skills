/**
 * Products API
 * All product-related API calls
 */

import type { Product, ProductFilters, CreateProductInput, UpdateProductInput } from "../types";
import type { PaginationParams } from "@/core/api/types";
import { mockProducts } from "@/data/mock-products";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ProductsResponse {
  data: Product[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export const productsApi = {
  /**
   * Get paginated list of products
   */
  getProducts: async (
    filters: ProductFilters = {},
    pagination: PaginationParams = { page: 1, pageSize: 10 }
  ): Promise<ProductsResponse> => {
    await delay(400);

    let filteredProducts = [...mockProducts];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }

    // Apply price filters
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice!);
    }

    // Apply stock filter
    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.inStock ? product.stock > 0 : product.stock === 0
      );
    }

    // Calculate pagination
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / (pagination.pageSize || 10));
    const startIndex = ((pagination.page || 1) - 1) * (pagination.pageSize || 10);
    const endIndex = startIndex + (pagination.pageSize || 10);

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      pagination: {
        page: pagination.page || 1,
        pageSize: pagination.pageSize || 10,
        total: totalItems,
        totalPages,
      },
    };
  },

  /**
   * Search products
   */
  searchProducts: async (query: string): Promise<Product[]> => {
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

  /**
   * Get single product by ID
   */
  getProductById: async (id: string): Promise<Product | null> => {
    await delay(200);
    return mockProducts.find((product) => product.id === id) || null;
  },

  /**
   * Create new product
   */
  createProduct: async (data: CreateProductInput): Promise<Product> => {
    await delay(800);

    const newProduct: Product = {
      id: `${mockProducts.length + 1}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockProducts.push(newProduct);
    return newProduct;
  },

  /**
   * Update existing product
   */
  updateProduct: async (id: string, data: UpdateProductInput): Promise<Product> => {
    await delay(600);

    const productIndex = mockProducts.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    mockProducts[productIndex] = {
      ...mockProducts[productIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return mockProducts[productIndex];
  },

  /**
   * Delete product
   */
  deleteProduct: async (id: string): Promise<void> => {
    await delay(500);

    const productIndex = mockProducts.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    mockProducts.splice(productIndex, 1);
  },
};
