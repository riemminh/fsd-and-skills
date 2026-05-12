/**
 * Auth hooks
 * Authentication state and operations
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api";
import type { LoginCredentials, RegisterInput } from "../types";

const AUTH_QUERY_KEY = ["auth", "user"];

/**
 * Get current user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: Infinity,
  });
}

/**
 * Login mutation
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      // Store token
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update user cache
      queryClient.setQueryData(AUTH_QUERY_KEY, data.user);

      // Redirect to home
      router.push("/");
    },
  });
}

/**
 * Register mutation
 */
export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: (data) => {
      // Store token
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update user cache
      queryClient.setQueryData(AUTH_QUERY_KEY, data.user);

      // Redirect to home
      router.push("/");
    },
  });
}

/**
 * Logout mutation
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear token
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");

      // Clear user cache
      queryClient.setQueryData(AUTH_QUERY_KEY, null);

      // Redirect to login
      router.push("/login");
    },
  });
}

/**
 * Check if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  const { data: user } = useCurrentUser();
  return !!user;
}

/**
 * Get user role
 */
export function useUserRole() {
  const { data: user } = useCurrentUser();
  return user?.role || null;
}
