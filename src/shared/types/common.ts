/**
 * Common shared types
 */

export type ID = string | number;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export interface BaseEntity {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export type Status = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  data: Nullable<T>;
  status: Status;
  error: Nullable<Error>;
}
