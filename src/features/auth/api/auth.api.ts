/**
 * Auth API
 * All authentication-related API calls
 */

import type { AuthResponse, LoginCredentials, RegisterInput, User } from "../types";
import { mockUsers } from "@/data/mock-users";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(800);

    // Mock authentication
    const user = mockUsers.find((u) => u.email === credentials.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // In real app, password would be validated on backend
    // For demo, any password works
    const token = `mock_token_${user.id}_${Date.now()}`;

    return {
      user,
      token,
    };
  },

  /**
   * Register new user
   */
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    await delay(1000);

    // Mock registration
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      name: data.name,
      email: data.email,
      role: "viewer", // Default role
    };

    const token = `mock_token_${newUser.id}_${Date.now()}`;

    mockUsers.push(newUser);

    return {
      user: newUser,
      token,
    };
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await delay(300);
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<User | null> => {
    if (typeof window === "undefined") {
      return null;
    }

    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return null;
    }

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Refresh token
   */
  refreshToken: async (): Promise<AuthResponse> => {
    await delay(500);

    const currentUser = await authApi.getCurrentUser();
    if (!currentUser) {
      throw new Error("No user found");
    }

    // Mock token refresh
    const token = `refreshed_token_${Date.now()}`;

    return {
      user: currentUser,
      token,
    };
  },
};
