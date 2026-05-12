"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Calendar } from "@/shared/components/ui/calendar";
import { Slider } from "@/shared/components/ui/slider";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/shared/utils";
import type { OrderFilters } from "@/features/orders";

interface AdvancedFiltersProps {
  filters: OrderFilters;
  onFiltersChange: (filters: OrderFilters) => void;
}

export function AdvancedFilters({ filters, onFiltersChange }: AdvancedFiltersProps) {
  const [open, setOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    filters.dateFrom ? new Date(filters.dateFrom) : undefined
  );
  const [dateTo, setDateTo] = useState<Date | undefined>(
    filters.dateTo ? new Date(filters.dateTo) : undefined
  );
  const [minAmount, setMinAmount] = useState<number>(filters.minAmount || 0);
  const [maxAmount, setMaxAmount] = useState<number>(filters.maxAmount || 10000);

  const hasActiveFilters =
    filters.dateFrom ||
    filters.dateTo ||
    filters.minAmount !== undefined ||
    filters.maxAmount !== undefined;

  const handleApply = () => {
    onFiltersChange({
      ...filters,
      dateFrom: dateFrom?.toISOString(),
      dateTo: dateTo?.toISOString(),
      minAmount: minAmount > 0 ? minAmount : undefined,
      maxAmount: maxAmount < 10000 ? maxAmount : undefined,
    });
    setOpen(false);
  };

  const handleClear = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setMinAmount(0);
    setMaxAmount(10000);
    onFiltersChange({
      ...filters,
      dateFrom: undefined,
      dateTo: undefined,
      minAmount: undefined,
      maxAmount: undefined,
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
          {hasActiveFilters && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {
                [filters.dateFrom, filters.dateTo, filters.minAmount, filters.maxAmount].filter(
                  Boolean
                ).length
              }
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Advanced Filters</h4>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-auto p-1 text-xs"
              >
                <X className="mr-1 h-3 w-3" />
                Clear All
              </Button>
            )}
          </div>

          <Separator />

          {/* Date Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Date Range</Label>

            <div className="space-y-2">
              <Label htmlFor="dateFrom" className="text-xs text-muted-foreground">
                From
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dateFrom"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTo" className="text-xs text-muted-foreground">
                To
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dateTo"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    disabled={(date) => (dateFrom ? date < dateFrom : false)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Separator />

          {/* Amount Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Amount Range</Label>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Min: ${minAmount.toFixed(2)}</span>
                  <span>Max: ${maxAmount.toFixed(2)}</span>
                </div>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={[minAmount, maxAmount]}
                  onValueChange={([min, max]) => {
                    setMinAmount(min);
                    setMaxAmount(max);
                  }}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="minAmount" className="text-xs text-muted-foreground">
                    Min Amount
                  </Label>
                  <Input
                    id="minAmount"
                    type="number"
                    min={0}
                    max={maxAmount}
                    value={minAmount}
                    onChange={(e) => setMinAmount(Math.max(0, Number(e.target.value)))}
                    className="h-8"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="maxAmount" className="text-xs text-muted-foreground">
                    Max Amount
                  </Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    min={minAmount}
                    max={10000}
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(Math.min(10000, Number(e.target.value)))}
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
