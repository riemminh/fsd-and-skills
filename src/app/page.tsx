"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser, useLogout } from "@/features/auth";

export default function Home() {
  const { data: user, isLoading } = useCurrentUser();
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/orders");
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return null;
}
