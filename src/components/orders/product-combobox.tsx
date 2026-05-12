"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/shared/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useProductSearch } from "@/features/products";
import { useDebounce } from "@/shared/hooks";
import type { Product } from "@/features/products";

interface ProductComboboxProps {
  value?: string;
  onSelect: (product: Product | null) => void;
  disabled?: boolean;
  excludeIds?: string[];
}

export function ProductCombobox({
  value,
  onSelect,
  disabled,
  excludeIds = [],
}: ProductComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: products = [], isLoading } = useProductSearch(debouncedSearch);

  // Filter out already selected products
  const availableProducts = products.filter((p) => !excludeIds.includes(String(p.id)));

  const selectedProduct = products.find((p) => String(p.id) === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedProduct ? (
            <span className="truncate">{selectedProduct.name}</span>
          ) : (
            <span className="text-muted-foreground">Select product...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search product by name..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
              </div>
            ) : availableProducts.length === 0 ? (
              <CommandEmpty>
                {searchQuery ? "No products found." : "Start typing to search products..."}
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {availableProducts.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={String(product.id)}
                    onSelect={() => {
                      onSelect(product);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === product.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-1 items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-sm text-muted-foreground">{product.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${product.price.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">Stock: {product.stock}</div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
