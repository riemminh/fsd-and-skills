/**
 * Create Product Page
 */

import { ProductForm } from "@/features/products";

export default function CreateProductPage() {
  return (
    <div className="container mx-auto py-8">
      <ProductForm mode="create" />
    </div>
  );
}
