/**
 * ProductList Component
 * Displays paginated list of products with filters
 */

"use client";

import { useState } from "react";
import { useProducts, useDeleteProduct } from "../hooks";
import { ProductFilters } from "../types";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Badge } from "@/shared/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Pencil, Trash2, Plus, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config";

const CATEGORIES = ["Electronics", "Accessories", "Clothing", "Books", "Home & Garden"];
const LOW_STOCK_THRESHOLD = 20;

export function ProductList() {
  const router = useRouter();
  const [filters, setFilters] = useState<ProductFilters>({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, error } = useProducts(filters, { page, pageSize });
  const deleteProduct = useDeleteProduct();

  const handleFilterChange = (
    key: keyof ProductFilters,
    value: ProductFilters[keyof ProductFilters]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page on filter change
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteProduct.mutateAsync(deleteId);
      setDeleteId(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Out of Stock
        </Badge>
      );
    }
    if (stock <= LOW_STOCK_THRESHOLD) {
      return (
        <Badge variant="warning" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Low Stock
        </Badge>
      );
    }
    return <Badge variant="success">In Stock</Badge>;
  };

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-800">Failed to load products. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory</p>
        </div>
        <Button onClick={() => router.push(`${ROUTES.PRODUCTS.LIST}/create`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-4">
        <Input
          placeholder="Search products..."
          value={filters.search || ""}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />

        <Select
          value={filters.category || "all"}
          onValueChange={(value) =>
            handleFilterChange("category", value === "all" ? undefined : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.inStock?.toString() || "all"}
          onValueChange={(value) =>
            handleFilterChange("inStock", value === "all" ? undefined : value === "true")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Stock Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="true">In Stock</SelectItem>
            <SelectItem value="false">Out of Stock</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice || ""}
            onChange={(e) =>
              handleFilterChange("minPrice", e.target.value ? Number(e.target.value) : undefined)
            }
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              handleFilterChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading products...
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock <= LOW_STOCK_THRESHOLD ? "font-semibold text-orange-600" : ""
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>{getStockBadge(product.stock)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`${ROUTES.PRODUCTS.LIST}/${product.id}/edit`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(String(product.id))}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, data.pagination.total)} of {data.pagination.total} products
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
              disabled={page === data.pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
