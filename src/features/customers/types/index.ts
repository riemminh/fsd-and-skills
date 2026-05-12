/**
 * Customer feature types
 */

import { BaseEntity } from "@/shared/types";

export interface Customer extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CustomerFilters {
  search?: string;
  sortBy?: "name" | "email" | "createdAt";
  sortDirection?: "asc" | "desc";
}

export interface CreateCustomerInput {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateCustomerInput {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}
