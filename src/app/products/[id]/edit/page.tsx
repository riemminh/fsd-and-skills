/**
 * Edit Product Page
 */

"use client";

import { useProduct } from "@/features/products";
import { ProductForm } from "@/features/products";
import { MainLayout } from "@/shared/components/layout/main-layout";
import { use } from "react";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params);
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="text-center">Loading product...</div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">Product not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ProductForm mode="edit" product={product} />
    </MainLayout>
  );
}
