"use client";

import { useCurrentUser, useLogout } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { LogOut, User, Package } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config";

export function Header() {
  const { data: user } = useCurrentUser();
  const { mutate: logout } = useLogout();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-7xl">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">Order Management</h1>

          {user && (
            <nav className="hidden md:flex items-center gap-4">
              <Link href={ROUTES.ORDERS.LIST}>
                <Button variant="ghost" size="sm">
                  Orders
                </Button>
              </Link>
              <Link href={ROUTES.PRODUCTS.LIST}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Package className="h-4 w-4" />
                  Products
                </Button>
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="font-medium">{user.name}</span>
                <span className="text-muted-foreground">({user.role})</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => logout()} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
