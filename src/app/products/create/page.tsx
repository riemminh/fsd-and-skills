/**
 * Create Product Page
 */

import { ProductForm } from "@/features/products";
import { MainLayout } from "@/shared/components/layout/main-layout";

export default function CreateProductPage() {
  return (
    <MainLayout>
      <ProductForm mode="create" />
    </MainLayout>
  );
}
