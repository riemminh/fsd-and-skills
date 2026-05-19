"use client";

import { useCurrentUser, useLogout } from "@/features/auth";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ROUTES } from "@/config";
import { cn } from "@/shared/utils";
import { ClipboardList, LogOut, Menu, Package, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNavItems = [
  {
    href: ROUTES.ORDERS.LIST,
    label: "Orders",
    icon: ClipboardList,
  },
  {
    href: ROUTES.PRODUCTS.LIST,
    label: "Products",
    icon: Package,
  },
];

export function Header() {
  const { data: user } = useCurrentUser();
  const { mutate: logout } = useLogout();
  const pathname = usePathname();
  const canManage = user?.role === "admin" || user?.role === "manager";

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-7xl">
        <div className="flex min-w-0 items-center gap-4 lg:gap-6">
          {user && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <SheetHeader className="border-b">
                  <SheetTitle>Order Management</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-4">
                  {mainNavItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted",
                            isActive(item.href) && "bg-muted text-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </SheetClose>
                    );
                  })}

                  {canManage && (
                    <>
                      <Separator className="my-3" />
                      <p className="px-3 text-xs font-medium uppercase text-muted-foreground">
                        Create
                      </p>
                      <SheetClose asChild>
                        <Link
                          href={ROUTES.ORDERS.CREATE}
                          className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted"
                        >
                          <Plus className="h-4 w-4" />
                          New Order
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href={ROUTES.PRODUCTS.CREATE}
                          className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted"
                        >
                          <Plus className="h-4 w-4" />
                          New Product
                        </Link>
                      </SheetClose>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          )}

          <Link href={user ? ROUTES.ORDERS.LIST : ROUTES.LOGIN} className="min-w-0">
            <h1 className="truncate text-lg font-bold sm:text-xl">Order Management</h1>
          </Link>

          {user && (
            <nav className="hidden items-center gap-1 md:flex">
              {mainNavItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    size="sm"
                  >
                    <Link href={item.href}>
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {user && (
            <>
              {canManage && (
                <div className="hidden items-center gap-1 lg:flex">
                  <Button asChild variant="outline" size="sm">
                    <Link href={ROUTES.ORDERS.CREATE}>
                      <Plus className="h-4 w-4" />
                      New Order
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={ROUTES.PRODUCTS.CREATE}>New Product</Link>
                  </Button>
                </div>
              )}
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
