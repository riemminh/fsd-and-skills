import type { AuthResponse, LoginCredentials, User } from "@/types/user";
import { mockUsers } from "@/data/mock-users";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
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

  async logout(): Promise<void> {
    await delay(300);
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    }
  },

  async getCurrentUser(): Promise<User | null> {
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

  async refreshToken(): Promise<string> {
    await delay(500);
    // Mock token refresh
    return `refreshed_token_${Date.now()}`;
  },
};
