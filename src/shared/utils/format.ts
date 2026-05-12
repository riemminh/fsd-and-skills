/**
 * Formatting utilities
 */

import { format as dateFnsFormat, parseISO } from "date-fns";

/**
 * Format currency value
 */
export function formatCurrency(
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Format date
 */
export function formatDate(date: string | Date, formatStr: string = "MMM dd, yyyy"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return dateFnsFormat(dateObj, formatStr);
}

/**
 * Format date time
 */
export function formatDateTime(
  date: string | Date,
  formatStr: string = "MMM dd, yyyy HH:mm"
): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return dateFnsFormat(dateObj, formatStr);
}

/**
 * Format number with thousand separators
 */
export function formatNumber(value: number, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convert to title case
 */
export function toTitleCase(text: string): string {
  return text
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}
