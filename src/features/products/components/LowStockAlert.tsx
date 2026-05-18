/**
 * LowStockAlert Component
 * Displays alerts for low stock and out of stock products
 */

"use client";

import { useProducts } from "../hooks";
import { getLowStockProducts, getOutOfStockProducts } from "../utils";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { Badge } from "@/shared/components/ui/badge";
import { AlertTriangle, XCircle } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config";

export function LowStockAlert() {
  const { data, isLoading } = useProducts({}, { page: 1, pageSize: 1000 });

  if (isLoading || !data) {
    return null;
  }

  const lowStockProducts = getLowStockProducts(data.data);
  const outOfStockProducts = getOutOfStockProducts(data.data);

  if (lowStockProducts.length === 0 && outOfStockProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Out of Stock Alert */}
      {outOfStockProducts.length > 0 && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Out of Stock Products</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-1">
              {outOfStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <Link
                    href={`${ROUTES.PRODUCTS.LIST}/${product.id}/edit`}
                    className="text-sm hover:underline"
                  >
                    {product.name}
                  </Link>
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Low Stock Warning</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-1">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <Link
                    href={`${ROUTES.PRODUCTS.LIST}/${product.id}/edit`}
                    className="text-sm hover:underline"
                  >
                    {product.name}
                  </Link>
                  <Badge variant="warning">{product.stock} left</Badge>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
