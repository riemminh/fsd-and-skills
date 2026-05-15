"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CustomerCombobox } from "@/features/orders/components/customer-combobox";
import { OrderItemsField } from "@/features/orders/components/order-items-field";
import { CreateOrderSchema, type CreateOrderFormData } from "@/types/form";
import { useCreateOrder } from "@/features/orders";
import { useCurrentUser } from "@/features/auth";
import { MainLayout } from "@/shared/components/layout/main-layout";
import { toast } from "sonner";
import type { Customer } from "@/features/customers";

export default function CreateOrderPage() {
  const router = useRouter();
  const { data: user, isLoading: authLoading } = useCurrentUser();
  const createOrderMutation = useCreateOrder();

  // Redirect if not authenticated or not authorized
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
    if (!authLoading && user && user.role !== "admin" && user.role !== "manager") {
      router.push("/orders");
      toast.error("You do not have permission to create orders");
    }
  }, [user, authLoading, router]);

  const methods = useForm<CreateOrderFormData>({
    resolver: zodResolver(CreateOrderSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      customerId: "",
      customerName: "",
      customerEmail: "",
      items: [],
      shippingAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      paymentMethod: "credit_card",
      notes: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const handleCustomerSelect = (customer: Customer | null) => {
    if (customer) {
      setValue("customerId", String(customer.id), { shouldDirty: true });
      setValue("customerName", customer.name, { shouldDirty: true });
      setValue("customerEmail", customer.email, { shouldDirty: true });
    } else {
      setValue("customerId", "", { shouldDirty: true });
      setValue("customerName", "", { shouldDirty: true });
      setValue("customerEmail", "", { shouldDirty: true });
    }
  };

  const onSubmit = async (data: CreateOrderFormData) => {
    try {
      if (data.items.length === 0) {
        return;
      }

      await createOrderMutation.mutateAsync(data);
      toast.success("Order created successfully!");
      router.push("/orders");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create order");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render if not authenticated or not authorized
  if (!user || (user.role !== "admin" && user.role !== "manager")) {
    return null;
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={handleCancel} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back to Orders</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">Create New Order</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Fill in the details below to create a new order
          </p>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, () => undefined)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input type="hidden" value="" {...register("customerId")} />
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer *</Label>
                  <CustomerCombobox value={watch("customerId")} onSelect={handleCustomerSelect} />
                  {errors.customerId && (
                    <p className="text-sm text-destructive">{errors.customerId.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      {...register("customerName")}
                      disabled
                      className="bg-muted"
                    />
                    {errors.customerName && (
                      <p className="text-sm text-destructive">{errors.customerName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Customer Email *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      {...register("customerEmail")}
                      disabled
                      className="bg-muted"
                    />
                    {errors.customerEmail && (
                      <p className="text-sm text-destructive">{errors.customerEmail.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderItemsField />
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    {...register("shippingAddress.street")}
                    placeholder="123 Main St"
                  />
                  {errors.shippingAddress?.street && (
                    <p className="text-sm text-destructive">
                      {errors.shippingAddress.street.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" {...register("shippingAddress.city")} placeholder="New York" />
                    {errors.shippingAddress?.city && (
                      <p className="text-sm text-destructive">
                        {errors.shippingAddress.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" {...register("shippingAddress.state")} placeholder="NY" />
                    {errors.shippingAddress?.state && (
                      <p className="text-sm text-destructive">
                        {errors.shippingAddress.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code *</Label>
                    <Input
                      id="zipCode"
                      {...register("shippingAddress.zipCode")}
                      placeholder="10001"
                    />
                    {errors.shippingAddress?.zipCode && (
                      <p className="text-sm text-destructive">
                        {errors.shippingAddress.zipCode.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      {...register("shippingAddress.country")}
                      placeholder="United States"
                    />
                    {errors.shippingAddress?.country && (
                      <p className="text-sm text-destructive">
                        {errors.shippingAddress.country.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={watch("paymentMethod")}
                  onValueChange={(value) =>
                    setValue("paymentMethod", value as CreateOrderFormData["paymentMethod"])
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="font-normal cursor-pointer">
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="debit_card" id="debit_card" />
                    <Label htmlFor="debit_card" className="font-normal cursor-pointer">
                      Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="font-normal cursor-pointer">
                      PayPal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="font-normal cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
                {errors.paymentMethod && (
                  <p className="mt-2 text-sm text-destructive">{errors.paymentMethod.message}</p>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  {...register("notes")}
                  placeholder="Add any special instructions or notes for this order..."
                  rows={4}
                  className="resize-none"
                />
                {errors.notes && (
                  <p className="mt-2 text-sm text-destructive">{errors.notes.message}</p>
                )}
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 sticky bottom-0 bg-background py-4 border-t sm:border-0 sm:static">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Order
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </MainLayout>
  );
}
