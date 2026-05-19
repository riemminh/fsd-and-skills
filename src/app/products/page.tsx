/**
 * Products List Page
 */

import { ProductList, LowStockAlert } from "@/features/products";
import { MainLayout } from "@/shared/components/layout/main-layout";

export default function ProductsPage() {
  return (
    <MainLayout>
      <LowStockAlert />
      <ProductList />
    </MainLayout>
  );
}
