"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderStatus } from "@/types/order";

interface StatusTabsProps {
  value: OrderStatus | "all";
  onChange: (value: OrderStatus | "all") => void;
}

export function StatusTabs({ value, onChange }: StatusTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as OrderStatus | "all")}>
      <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto">
        <TabsTrigger value="all" className="text-xs sm:text-sm">
          All
        </TabsTrigger>
        <TabsTrigger value="pending" className="text-xs sm:text-sm">
          Pending
        </TabsTrigger>
        <TabsTrigger value="processing" className="text-xs sm:text-sm">
          Processing
        </TabsTrigger>
        <TabsTrigger value="shipped" className="text-xs sm:text-sm">
          Shipped
        </TabsTrigger>
        <TabsTrigger value="delivered" className="text-xs sm:text-sm">
          Delivered
        </TabsTrigger>
        <TabsTrigger value="cancelled" className="text-xs sm:text-sm">
          Cancelled
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
