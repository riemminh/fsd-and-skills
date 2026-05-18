/**
 * Products List Page
 */

import { ProductList, LowStockAlert } from "@/features/products";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <LowStockAlert />
      <ProductList />
    </div>
  );
}
