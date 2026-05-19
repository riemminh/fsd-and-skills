"use client";

import {
  AlertTriangle,
  ClipboardList,
  DollarSign,
  PackageCheck,
  RotateCcw,
  Truck,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useOrders } from "@/features/orders";
import { useProducts } from "@/features/products";
import type { Order } from "@/features/orders";
import type { Product } from "@/features/products";

const LOW_STOCK_THRESHOLD = 20;

export function OrderOperationsDashboard() {
  const { data: ordersData, isLoading: ordersLoading } = useOrders({}, { page: 1, pageSize: 1000 });
  const { data: productsData, isLoading: productsLoading } = useProducts(
    {},
    { page: 1, pageSize: 1000 }
  );

  const orders = ordersData?.data || [];
  const products = productsData?.data || [];
  const isLoading = ordersLoading || productsLoading;
  const metrics = buildMetrics(orders, products);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Operations Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Monitor order workload, shipping activity, refunds, and stock risks.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Pending Orders"
          value={metrics.pendingOrders}
          description="Waiting for processing"
          icon={ClipboardList}
          loading={isLoading}
        />
        <MetricCard
          title="Processing"
          value={metrics.processingOrders}
          description="Being prepared"
          icon={PackageCheck}
          loading={isLoading}
        />
        <MetricCard
          title="Shipped Today"
          value={metrics.shippedToday}
          description="Updated or logged today"
          icon={Truck}
          loading={isLoading}
        />
        <MetricCard
          title="Return Requests"
          value={metrics.returnCount}
          description={`$${metrics.totalRefunded.toFixed(2)} refunded`}
          icon={RotateCcw}
          loading={isLoading}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue / Refund Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <SummaryRow label="Gross order value" value={`$${metrics.grossRevenue.toFixed(2)}`} />
            <SummaryRow label="Refunded" value={`-$${metrics.totalRefunded.toFixed(2)}`} muted />
            <div className="border-t pt-3">
              <SummaryRow label="Net after refunds" value={`$${metrics.netRevenue.toFixed(2)}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              Pending Stock Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Checking pending order inventory...</p>
            ) : metrics.stockWarnings.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No pending orders are blocked by low stock.
              </p>
            ) : (
              <div className="space-y-3">
                {metrics.stockWarnings.slice(0, 5).map((warning) => (
                  <div
                    key={`${warning.orderNumber}-${warning.productId}`}
                    className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {warning.orderNumber} · {warning.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Requested {warning.requested}, available {warning.available}
                      </p>
                    </div>
                    <Badge
                      variant={warning.available < warning.requested ? "destructive" : "warning"}
                    >
                      {warning.available < warning.requested ? "Insufficient" : "Low stock"}
                    </Badge>
                  </div>
                ))}
                {metrics.stockWarnings.length > 5 && (
                  <p className="text-xs text-muted-foreground">
                    +{metrics.stockWarnings.length - 5} more pending stock warnings
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  loading,
}: {
  title: string;
  value: number;
  description: string;
  icon: typeof ClipboardList;
  loading: boolean;
}) {
  return (
    <Card size="sm">
      <CardContent className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{loading ? "..." : value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryRow({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={muted ? "font-medium text-muted-foreground" : "font-semibold"}>{value}</span>
    </div>
  );
}

function buildMetrics(orders: Order[], products: Product[]) {
  const productMap = new Map(products.map((product) => [String(product.id), product]));
  const pendingOrders = orders.filter((order) => order.status === "pending");
  const returnRequests = orders.flatMap((order) => order.returns || []);
  const totalRefunded = returnRequests.reduce((sum, request) => sum + request.refundAmount, 0);
  const grossRevenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  return {
    pendingOrders: pendingOrders.length,
    processingOrders: orders.filter((order) => order.status === "processing").length,
    shippedToday: orders.filter(wasShippedToday).length,
    returnCount: returnRequests.length,
    grossRevenue,
    totalRefunded,
    netRevenue: grossRevenue - totalRefunded,
    stockWarnings: getPendingStockWarnings(pendingOrders, productMap),
  };
}

function wasShippedToday(order: Order) {
  const today = new Date();
  const shippedHistoryToday = order.history?.some(
    (entry) => entry.status === "shipped" && isSameLocalDay(new Date(entry.timestamp), today)
  );

  return (
    shippedHistoryToday ||
    (order.status === "shipped" && isSameLocalDay(new Date(order.updatedAt), today))
  );
}

function getPendingStockWarnings(pendingOrders: Order[], productMap: Map<string, Product>) {
  return pendingOrders.flatMap((order) =>
    order.items.flatMap((item) => {
      const product = productMap.get(String(item.productId));
      const available = product?.stock ?? 0;
      const affectsPendingOrder =
        available < item.quantity || (available <= LOW_STOCK_THRESHOLD && item.quantity > 0);

      if (!affectsPendingOrder) {
        return [];
      }

      return [
        {
          orderNumber: order.orderNumber,
          productId: item.productId,
          productName: item.productName,
          requested: item.quantity,
          available,
        },
      ];
    })
  );
}

function isSameLocalDay(first: Date, second: Date) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}
