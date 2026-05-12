/**
 * Order filters hook
 * Manages order filtering state
 */

import { useState, useCallback } from "react";
import type { OrderFilters } from "../types";

export function useOrderFilters(initialFilters?: OrderFilters) {
  const [filters, setFilters] = useState<OrderFilters>(initialFilters || {});

  const updateFilter = useCallback(
    <K extends keyof OrderFilters>(key: K, value: OrderFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateFilters = useCallback((newFilters: Partial<OrderFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters || {});
  }, [initialFilters]);

  const clearFilter = useCallback((key: keyof OrderFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    clearFilter,
  };
}
