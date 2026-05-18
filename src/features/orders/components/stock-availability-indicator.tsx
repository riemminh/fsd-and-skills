/**
 * StockAvailabilityIndicator Component
 * Shows stock availability for products in order
 */

"use client";

import { useEffect, useState } from "react";
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
  const [availability, setAvailability] = useState<"available" | "insufficient" | "out_of_stock">(
    "available"
  );

  useEffect(() => {
    if (!product) return;

    if (product.stock === 0) {
      setAvailability("out_of_stock");
    } else if (product.stock < requestedQuantity) {
      setAvailability("insufficient");
    } else {
      setAvailability("available");
    }
  }, [product, requestedQuantity]);

  if (isLoading || !product) {
    return null;
  }

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
