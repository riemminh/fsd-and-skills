/**
 * Edit Product Page
 */

"use client";

import { useProduct } from "@/features/products";
import { ProductForm } from "@/features/products";
import { use } from "react";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params);
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
