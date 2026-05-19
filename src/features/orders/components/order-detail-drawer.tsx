"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet";
import { Order } from "@/features/orders";
import { StatusBadge } from "./status-badge";
import { OrderTimeline } from "./order-timeline";
import { ReturnsRefundsPanel } from "./returns-refunds-panel";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { EditOrderDialog } from "./edit-order-dialog";
import { CancelOrderDialog } from "./cancel-order-dialog";
import { ReturnRequestDialog } from "./return-request-dialog";
import { useCurrentUser } from "@/features/auth";
import { format } from "date-fns";
import { Edit, XCircle, History, RotateCcw } from "lucide-react";

interface OrderDetailDrawerProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export function OrderDetailDrawer({ order, open, onClose }: OrderDetailDrawerProps) {
  const { data: user } = useCurrentUser();
  const [updatedOrder, setUpdatedOrder] = useState<Order | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const activeOrder =
    updatedOrder && order && String(updatedOrder.id) === String(order.id) ? updatedOrder : order;

  if (!activeOrder) return null;

  const canEdit = user?.role === "admin" || user?.role === "manager";
  const canCancel = canEdit && ["pending", "processing"].includes(activeOrder.status);
  const canCreateReturn = canEdit && ["shipped", "delivered"].includes(activeOrder.status);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-0">
        <div className="p-6">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="details" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="returns">
                <RotateCcw className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Returns</span>
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              {/* Order Info */}
              <div>
                <h3 className="font-semibold mb-3">Order Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Number:</span>
                    <span className="font-medium">{activeOrder.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <StatusBadge status={activeOrder.status} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{format(new Date(activeOrder.createdAt), "PPP")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment:</span>
                    <span className="capitalize">
                      {activeOrder.paymentMethod.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{activeOrder.customerName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="break-all">{activeOrder.customerEmail}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-3">Shipping Address</h3>
                <div className="text-sm">
                  <p>{activeOrder.shippingAddress.street}</p>
                  <p>
                    {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state}{" "}
                    {activeOrder.shippingAddress.zipCode}
                  </p>
                  <p>{activeOrder.shippingAddress.country}</p>
                </div>
              </div>

              <Separator />

              {/* Items */}
              <div>
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-3">
                  {activeOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.productName}</p>
                        <p className="text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium ml-2">${item.subtotal.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${activeOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax:</span>
                  <span>${activeOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span>${activeOrder.shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${activeOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {activeOrder.notes && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-sm text-muted-foreground">{activeOrder.notes}</p>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  Close
                </Button>
                {canEdit && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setEditDialogOpen(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                )}
                {canCancel && (
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => setCancelDialogOpen(true)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="returns" className="mt-6">
              <ReturnsRefundsPanel
                order={activeOrder}
                canCreateReturn={canCreateReturn}
                onCreateReturn={() => setReturnDialogOpen(true)}
              />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <OrderTimeline history={activeOrder.history} currentStatus={activeOrder.status} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Edit Dialog */}
        <EditOrderDialog
          order={activeOrder}
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />

        {/* Cancel Dialog */}
        <CancelOrderDialog
          order={activeOrder}
          open={cancelDialogOpen}
          onClose={() => setCancelDialogOpen(false)}
        />

        {/* Return Dialog */}
        <ReturnRequestDialog
          order={activeOrder}
          open={returnDialogOpen}
          onClose={() => setReturnDialogOpen(false)}
          onOrderUpdated={setUpdatedOrder}
          userName={user?.name || user?.email || "System"}
        />
      </SheetContent>
    </Sheet>
  );
}
