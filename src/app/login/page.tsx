"use client";

import { useState } from "react";
import { useLogin } from "@/features/auth";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    login(
      { email, password },
      {
        onError: (error) => {
          toast.error(error.message || "Invalid email or password");
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-card border p-6 sm:p-8 shadow-lg">
        <div>
          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight">
            Order Management System
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Enter any password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-sm text-muted-foreground border-t pt-4">
            <p className="font-semibold text-foreground">Demo accounts:</p>
            <ul className="mt-2 space-y-1">
              <li>• Admin: admin@example.com</li>
              <li>• Manager: manager@example.com</li>
              <li>• Viewer: viewer@example.com</li>
            </ul>
            <p className="mt-2 text-xs">(Use any password for demo)</p>
          </div>
        </form>
      </div>
    </div>
  );
}
