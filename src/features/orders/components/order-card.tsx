"use client";

import { memo } from "react";
import { Order } from "@/features/orders";
import { StatusBadge } from "./status-badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Eye, Calendar, DollarSign, User, Package } from "lucide-react";
import { format } from "date-fns";

interface OrderCardProps {
  order: Order;
  onViewOrder: (order: Order) => void;
}

function OrderCardComponent({ order, onViewOrder }: OrderCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Order #{order.orderNumber}</p>
            <h3 className="font-semibold text-lg">{order.customerName}</h3>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground truncate">{order.customerEmail}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {format(new Date(order.createdAt), "MMM dd, yyyy")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {order.items.length} {order.items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button variant="outline" className="w-full" onClick={() => onViewOrder(order)}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export const OrderCard = memo(OrderCardComponent);
