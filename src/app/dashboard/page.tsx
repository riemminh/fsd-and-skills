"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth";
import { OrderOperationsDashboard } from "@/features/orders";
import { MainLayout } from "@/shared/components/layout/main-layout";

export default function DashboardPage() {
  const { data: user, isLoading: authLoading } = useCurrentUser();
  const router = useRouter();

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
      <OrderOperationsDashboard />
    </MainLayout>
  );
}
