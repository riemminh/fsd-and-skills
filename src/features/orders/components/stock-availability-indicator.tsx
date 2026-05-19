/**
 * StockAvailabilityIndicator Component
 * Shows stock availability for products in order
 */

"use client";

import { useProduct } from "@/features/products";
import { Badge } from "@/shared/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface StockAvailabilityIndicatorProps {
  productId: string;
  requestedQuantity: number;
}

export function StockAvailabilityIndicator({
  productId,
  requestedQuantity,
}: StockAvailabilityIndicatorProps) {
  const { data: product, isLoading } = useProduct(productId);

  if (isLoading || !product) {
    return null;
  }

  const availability =
    product.stock === 0
      ? "out_of_stock"
      : product.stock < requestedQuantity
        ? "insufficient"
        : "available";

  if (availability === "available") {
    return (
      <Badge variant="success" className="gap-1">
        <CheckCircle className="h-3 w-3" />
        {product.stock} available
      </Badge>
    );
  }

  if (availability === "out_of_stock") {
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        Out of stock
      </Badge>
    );
  }

  return (
    <Badge variant="warning" className="gap-1">
      <AlertTriangle className="h-3 w-3" />
      Only {product.stock} available
    </Badge>
  );
}
