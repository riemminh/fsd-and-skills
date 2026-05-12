"use client";

import { memo } from "react";
import { Order } from "@/types/order";
import { OrderCard } from "./order-card";

interface OrderGridProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
}

function OrderGridComponent({ orders, onViewOrder }: OrderGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onViewOrder={onViewOrder} />
      ))}
    </div>
  );
}

export const OrderGrid = memo(OrderGridComponent);
