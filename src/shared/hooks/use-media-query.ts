/**
 * Media query hook
 * Tracks media query matches
 */

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const media = window.matchMedia(query);
      media.addEventListener("change", callback);

      return () => media.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") {
        return false;
      }

      return window.matchMedia(query).matches;
    },
    () => false
  );
}

// Predefined breakpoint hooks
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1025px)");
}
