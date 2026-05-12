"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth";
import { MainLayout } from "@/shared/components/layout/main-layout";
import { OrderList } from "@/features/orders";
import { ErrorBoundary } from "@/shared/components/common/error-boundary";

export default function OrdersPage() {
  const { data: user, isLoading: authLoading } = useCurrentUser();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      <ErrorBoundary>
        <OrderList />
      </ErrorBoundary>
    </MainLayout>
  );
}
