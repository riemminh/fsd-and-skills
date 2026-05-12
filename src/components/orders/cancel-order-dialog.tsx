"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useCancelOrder } from "@/hooks/use-orders";
import { toast } from "sonner";
import type { Order } from "@/types/order";

interface CancelOrderDialogProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export function CancelOrderDialog({ order, open, onClose }: CancelOrderDialogProps) {
  const cancelOrderMutation = useCancelOrder();

  const handleCancel = async () => {
    if (!order) return;

    try {
      await cancelOrderMutation.mutateAsync(order.id);
      toast.success("Order cancelled successfully!");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to cancel order");
    }
  };

  if (!order) return null;

  const isAlreadyCancelled = order.status === "cancelled";
  const canCancel = ["pending", "processing"].includes(order.status);

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Order</AlertDialogTitle>
          <AlertDialogDescription>
            {isAlreadyCancelled ? (
              <span>This order has already been cancelled.</span>
            ) : !canCancel ? (
              <span>
                This order cannot be cancelled because it has already been{" "}
                <strong>{order.status}</strong>. Only pending or processing orders can be cancelled.
              </span>
            ) : (
              <>
                Are you sure you want to cancel order <strong>{order.orderNumber}</strong>? This
                action cannot be undone.
                <div className="mt-4 rounded-md bg-muted p-3">
                  <p className="text-sm font-medium text-foreground">Order Details:</p>
                  <p className="text-sm text-muted-foreground">Customer: {order.customerName}</p>
                  <p className="text-sm text-muted-foreground">Total: ${order.total.toFixed(2)}</p>
                </div>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={cancelOrderMutation.isPending}>
            {isAlreadyCancelled || !canCancel ? "Close" : "No, Keep Order"}
          </AlertDialogCancel>
          {!isAlreadyCancelled && canCancel && (
            <AlertDialogAction
              onClick={handleCancel}
              disabled={cancelOrderMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {cancelOrderMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Yes, Cancel Order
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
