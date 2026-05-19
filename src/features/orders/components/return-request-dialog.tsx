"use client";

import { useMemo, useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { useCreateReturnRequest } from "@/features/orders";
import { toast } from "sonner";
import type { Order } from "@/features/orders";

interface ReturnRequestDialogProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onOrderUpdated?: (order: Order) => void;
  userName?: string;
}

type SelectedReturnItem = Record<string, { selected: boolean; quantity: number }>;

export function ReturnRequestDialog({
  order,
  open,
  onClose,
  onOrderUpdated,
  userName = "System",
}: ReturnRequestDialogProps) {
  const createReturnRequest = useCreateReturnRequest();
  const [selectedItems, setSelectedItems] = useState<SelectedReturnItem>({});
  const [reason, setReason] = useState("");
  const [restockItems, setRestockItems] = useState(true);
  const [manualRefundAmount, setManualRefundAmount] = useState("");

  const calculatedRefundAmount = useMemo(() => {
    if (!order) return 0;

    return order.items.reduce((sum, item) => {
      const selectedItem = selectedItems[item.id];
      if (!selectedItem?.selected) return sum;

      return sum + selectedItem.quantity * item.price;
    }, 0);
  }, [order, selectedItems]);

  const refundAmount = manualRefundAmount ? Number(manualRefundAmount) : calculatedRefundAmount;
  const selectedCount = Object.values(selectedItems).filter((item) => item.selected).length;
  const canSubmit =
    !!order &&
    selectedCount > 0 &&
    reason.trim().length >= 5 &&
    Number.isFinite(refundAmount) &&
    refundAmount >= 0;

  const resetForm = () => {
    setSelectedItems({});
    setReason("");
    setRestockItems(true);
    setManualRefundAmount("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleItemToggle = (itemId: string, checked: boolean) => {
    if (!order) return;

    const orderItem = order.items.find((item) => item.id === itemId);
    setSelectedItems((current) => ({
      ...current,
      [itemId]: {
        selected: checked,
        quantity: current[itemId]?.quantity || Math.min(orderItem?.quantity || 1, 1),
      },
    }));
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (!order) return;

    const orderItem = order.items.find((item) => item.id === itemId);
    const maxQuantity = orderItem?.quantity || 1;
    const safeQuantity = Math.min(Math.max(quantity || 1, 1), maxQuantity);

    setSelectedItems((current) => ({
      ...current,
      [itemId]: {
        selected: current[itemId]?.selected ?? true,
        quantity: safeQuantity,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!order || !canSubmit) return;

    try {
      const updatedOrder = await createReturnRequest.mutateAsync({
        id: String(order.id),
        data: {
          items: order.items
            .filter((item) => selectedItems[item.id]?.selected)
            .map((item) => ({
              orderItemId: item.id,
              quantity: selectedItems[item.id].quantity,
            })),
          reason: reason.trim(),
          refundAmount,
          restockItems,
          createdBy: userName,
        },
      });

      toast.success("Return/refund request created");
      onOrderUpdated?.(updatedOrder);
      handleClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create return request");
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && handleClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Return / Refund</DialogTitle>
          <DialogDescription>
            Select returned items, confirm the refund amount, and decide whether returned stock
            should be added back to inventory.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[65vh] space-y-5 overflow-y-auto pr-1">
          <div className="space-y-3">
            <Label>Returned Items</Label>
            <div className="space-y-2">
              {order.items.map((item) => {
                const selectedItem = selectedItems[item.id];

                return (
                  <div key={item.id} className="rounded-lg border p-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={!!selectedItem?.selected}
                        onChange={(event) => handleItemToggle(item.id, event.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-input"
                        aria-label={`Return ${item.productName}`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">
                            Ordered {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-3 grid gap-3 sm:grid-cols-[120px_1fr] sm:items-end">
                          <div className="space-y-1">
                            <Label htmlFor={`return-qty-${item.id}`}>Quantity</Label>
                            <Input
                              id={`return-qty-${item.id}`}
                              type="number"
                              min={1}
                              max={item.quantity}
                              value={selectedItem?.quantity || 1}
                              disabled={!selectedItem?.selected}
                              onChange={(event) =>
                                handleQuantityChange(item.id, Number(event.target.value))
                              }
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Refund: ${((selectedItem?.quantity || 1) * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="return-reason">Reason *</Label>
            <Textarea
              id="return-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Damaged item, wrong product, customer changed their mind..."
              rows={4}
            />
            {reason.length > 0 && reason.trim().length < 5 && (
              <p className="text-sm text-destructive">Reason must be at least 5 characters.</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="refund-amount">Refund Amount</Label>
              <Input
                id="refund-amount"
                type="number"
                min={0}
                step="0.01"
                value={manualRefundAmount || calculatedRefundAmount.toFixed(2)}
                onChange={(event) => setManualRefundAmount(event.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Calculated from selected items: ${calculatedRefundAmount.toFixed(2)}
              </p>
            </div>

            <label className="flex items-center gap-3 rounded-lg border p-3 text-sm">
              <input
                type="checkbox"
                checked={restockItems}
                onChange={(event) => setRestockItems(event.target.checked)}
                className="h-4 w-4 rounded border-input"
              />
              <span>
                <span className="block font-medium">Restock returned items</span>
                <span className="text-muted-foreground">
                  Add selected quantities back to stock.
                </span>
              </span>
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={createReturnRequest.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || createReturnRequest.isPending}
          >
            {createReturnRequest.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RotateCcw className="mr-2 h-4 w-4" />
            )}
            Create Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
