"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useOrders, usePrefetchOrders } from "@/hooks/use-orders";
import { Order, OrderStatus, OrderFilters } from "@/types/order";
import { SearchInput } from "./search-input";
import { StatusTabs } from "./status-tabs";
import { AdvancedFilters } from "./advanced-filters";
import { OrderTable } from "./order-table";
import { OrderGrid } from "./order-grid";
import { OrderTableSkeleton } from "./order-table-skeleton";
import { EmptyState } from "./empty-state";
import { PaginationControls } from "./pagination-controls";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus, AlertCircle, RefreshCw, LayoutGrid, Table as TableIcon } from "lucide-react";
import { useCurrentUser } from "@/features/auth";
import { toast } from "sonner";

// Lazy load the drawer for better initial load performance
const OrderDetailDrawer = lazy(() =>
  import("./order-detail-drawer").then((mod) => ({ default: mod.OrderDetailDrawer }))
);

export function OrderList() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [advancedFilters, setAdvancedFilters] = useState<OrderFilters>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const prefetchOrders = usePrefetchOrders();

  // Fetch orders with filters
  const { data, isLoading, isFetching, error, refetch } = useOrders(
    {
      search: search || undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,
      ...advancedFilters,
    },
    {
      page,
      pageSize,
    }
  );

  // Prefetch next page when data is loaded
  useEffect(() => {
    if (data && page < data.meta.totalPages) {
      prefetchOrders(
        {
          search: search || undefined,
          status: statusFilter !== "all" ? statusFilter : undefined,
          ...advancedFilters,
        },
        {
          page: page + 1,
          pageSize,
        }
      );
    }
  }, [data, page, pageSize, search, statusFilter, advancedFilters, prefetchOrders]);

  // Show error toast when query fails
  useEffect(() => {
    if (error) {
      toast.error("Failed to load orders", {
        description: "There was an error loading the orders. Please try again.",
      });
    }
  }, [error]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1); // Reset to first page
  };

  const handleRetry = () => {
    refetch();
  };

  const handleCreateOrder = () => {
    router.push("/orders/create");
  };

  const canCreateOrder = user?.role === "admin" || user?.role === "manager";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage and track all your orders
          </p>
        </div>
        {canCreateOrder && (
          <Button onClick={handleCreateOrder} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Order
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by order number, customer name, or email..."
        />
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <StatusTabs value={statusFilter} onChange={setStatusFilter} />
          <div className="flex gap-2">
            <AdvancedFilters filters={advancedFilters} onFiltersChange={setAdvancedFilters} />
            {/* View Mode Toggle - Hidden on mobile, auto-grid */}
            <div className="hidden md:flex gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <TableIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>Failed to load orders. Please try again.</span>
            <Button variant="outline" size="sm" onClick={handleRetry} className="ml-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Table */}
      <div className="relative">
        {isFetching && !isLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary/20 animate-pulse" />
        )}

        {isLoading ? (
          <OrderTableSkeleton />
        ) : error ? (
          <EmptyState
            title="Unable to load orders"
            description="There was an error loading the orders. Please try again."
          />
        ) : data && data.data.length > 0 ? (
          <>
            {/* Mobile: Always grid, Desktop: User choice */}
            <div className="md:hidden">
              <OrderGrid orders={data.data} onViewOrder={handleViewOrder} />
            </div>
            <div className="hidden md:block">
              {viewMode === "table" ? (
                <OrderTable orders={data.data} onViewOrder={handleViewOrder} />
              ) : (
                <OrderGrid orders={data.data} onViewOrder={handleViewOrder} />
              )}
            </div>
            <PaginationControls
              currentPage={page}
              totalPages={data.meta.totalPages}
              pageSize={pageSize}
              totalItems={data.meta.totalItems}
              onPageChange={setPage}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        ) : (
          <EmptyState
            title="No orders found"
            description={
              search || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first order"
            }
          />
        )}
      </div>

      {/* Detail Drawer */}
      <Suspense fallback={null}>
        <OrderDetailDrawer order={selectedOrder} open={drawerOpen} onClose={handleCloseDrawer} />
      </Suspense>
    </div>
  );
}
