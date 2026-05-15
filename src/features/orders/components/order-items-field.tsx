"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ProductCombobox } from "./product-combobox";
import type { CreateOrderFormData } from "@/types/form";
import type { Product } from "@/features/products";

export function OrderItemsField() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateOrderFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
    shouldUnregister: true,
  });

  const items = watch("items");

  const handleAddItem = () => {
    append({
      productId: "",
      productName: "",
      quantity: 1,
      price: 0,
    });
  };

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  const handleProductSelect = (index: number, product: Product | null) => {
    if (product) {
      setValue(`items.${index}.productId`, String(product.id), { shouldDirty: true });
      setValue(`items.${index}.productName`, product.name, { shouldDirty: true });
      setValue(`items.${index}.price`, product.price, { shouldDirty: true });
    } else {
      setValue(`items.${index}.productId`, "", { shouldDirty: true });
      setValue(`items.${index}.productName`, "", { shouldDirty: true });
      setValue(`items.${index}.price`, 0, { shouldDirty: true });
    }
  };

  const calculateItemSubtotal = (index: number) => {
    const item = items?.[index];
    if (!item) return 0;
    const qty = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    return qty * price;
  };

  const calculateTotal = () => {
    if (!items) return 0;
    return items.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      return sum + qty * price;
    }, 0);
  };

  const selectedProductIds = items?.map((item) => item.productId).filter(Boolean) || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Order Items</Label>
        <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      {fields.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">
              No items added yet. Click &quot;Add Item&quot; to start.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardContent className="pt-6">
                <input type="hidden" value="" {...control.register(`items.${index}.productName`)} />

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium">Item {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`items.${index}.productId`}>Product *</Label>
                      <ProductCombobox
                        value={items?.[index]?.productId}
                        onSelect={(product) => handleProductSelect(index, product)}
                        excludeIds={selectedProductIds.filter(
                          (id) => id !== items?.[index]?.productId
                        )}
                      />
                      {errors.items?.[index]?.productId && (
                        <p className="text-sm text-destructive">
                          {errors.items[index]?.productId?.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`items.${index}.quantity`}>Quantity *</Label>
                        <Input
                          id={`items.${index}.quantity`}
                          type="number"
                          min="1"
                          {...control.register(`items.${index}.quantity`, {
                            valueAsNumber: true,
                          })}
                        />
                        {errors.items?.[index]?.quantity && (
                          <p className="text-sm text-destructive">
                            {errors.items[index]?.quantity?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`items.${index}.price`}>Unit Price *</Label>
                        <Input
                          id={`items.${index}.price`}
                          type="number"
                          min="0"
                          step="0.01"
                          {...control.register(`items.${index}.price`, {
                            valueAsNumber: true,
                          })}
                        />
                        {errors.items?.[index]?.price && (
                          <p className="text-sm text-destructive">
                            {errors.items[index]?.price?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-md bg-muted p-3">
                      <span className="text-sm font-medium">Subtotal:</span>
                      <span className="text-sm font-semibold">
                        ${calculateItemSubtotal(index).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {fields.length > 0 && (
        <Card className="border-primary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-primary">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {errors.items && !Array.isArray(errors.items) && "message" in errors.items && (
        <p className="text-sm text-destructive">{errors.items.message as string}</p>
      )}
    </div>
  );
}
