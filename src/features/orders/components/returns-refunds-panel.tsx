"use client";

import { RotateCcw } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import type { Order } from "@/features/orders";

interface ReturnsRefundsPanelProps {
  order: Order;
  canCreateReturn: boolean;
  onCreateReturn: () => void;
}

export function ReturnsRefundsPanel({
  order,
  canCreateReturn,
  onCreateReturn,
}: ReturnsRefundsPanelProps) {
  const returns = order.returns || [];
  const totalRefunded = returns.reduce((sum, request) => sum + request.refundAmount, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold">Returns / Refunds</h3>
          <p className="text-sm text-muted-foreground">
            Track returned items, refund amounts, and inventory restock decisions.
          </p>
        </div>
        <Button onClick={onCreateReturn} disabled={!canCreateReturn}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Create Return
        </Button>
      </div>

      {!canCreateReturn && (
        <div className="rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
          Returns can be created by admin or manager users after an order has shipped or delivered.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border p-3">
          <p className="text-sm text-muted-foreground">Return Requests</p>
          <p className="mt-1 text-2xl font-semibold">{returns.length}</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm text-muted-foreground">Total Refunded</p>
          <p className="mt-1 text-2xl font-semibold">${totalRefunded.toFixed(2)}</p>
        </div>
      </div>

      {returns.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <p className="text-sm font-medium">No returns yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a return request when a customer sends items back or needs a refund.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {returns.map((request) => (
            <div key={request.id} className="rounded-lg border p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{request.id}</p>
                    <Badge variant="secondary">{request.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Created by {request.createdBy} on{" "}
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-lg font-semibold">${request.refundAmount.toFixed(2)}</p>
              </div>

              <Separator className="my-3" />

              <div className="space-y-2">
                {request.items.map((item) => (
                  <div
                    key={`${request.id}-${item.orderItemId}`}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="min-w-0 truncate">
                      {item.productName} × {item.quantity}
                    </span>
                    <span>${item.refundAmount.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-sm text-muted-foreground">Reason: {request.reason}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {request.restockItems
                  ? "Returned items were restocked."
                  : "Items were not restocked."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
