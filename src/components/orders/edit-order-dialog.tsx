"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useUpdateOrder } from "@/hooks/use-orders";
import { toast } from "sonner";
import type { Order, OrderStatus } from "@/types/order";

const UpdateOrderSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
});

type UpdateOrderFormData = z.infer<typeof UpdateOrderSchema>;

interface EditOrderDialogProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export function EditOrderDialog({ order, open, onClose }: EditOrderDialogProps) {
  const updateOrderMutation = useUpdateOrder();

  const {
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateOrderFormData>({
    resolver: zodResolver(UpdateOrderSchema),
    defaultValues: {
      status: order?.status || "pending",
    },
  });

  const currentStatus = useWatch({ control, name: "status" });

  const onSubmit = async (data: UpdateOrderFormData) => {
    if (!order) return;

    try {
      await updateOrderMutation.mutateAsync({
        id: order.id,
        data: { status: data.status },
      });
      toast.success("Order updated successfully!");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update order");
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Order Number</Label>
              <div className="text-sm font-medium text-muted-foreground">{order.orderNumber}</div>
            </div>

            <div className="space-y-2">
              <Label>Customer</Label>
              <div className="text-sm text-muted-foreground">
                {order.customerName} ({order.customerEmail})
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Order Status *</Label>
              <Select
                value={currentStatus}
                onValueChange={(value) => setValue("status", value as OrderStatus)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md bg-muted p-3 text-sm">
              <p className="font-medium">Total Amount</p>
              <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
