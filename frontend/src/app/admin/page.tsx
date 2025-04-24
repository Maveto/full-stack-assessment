"use client";

import { useEffect, useState } from "react";
import { Product } from "@/components/ProductCard";
import { fetchProducts, deleteProductById } from "@/lib/api";
import { useRouter } from "next/navigation";
import ThemedButton from "@/components/ThemedButton";
import AdminProductInfo from "@/components/AdminProductInfo";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { isInitialized, isAdmin } = useAuth();

  useEffect(() => {
    if (isInitialized && !isAdmin) {
      router.replace("/");
    }
  }, [isInitialized, isAdmin, router]);

  if (!isInitialized) {
    return <p className="text-center mt-20">Checking permissions...</p>;
  }

  if (!isAdmin) {
    return null;
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProductById(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const handleUpdate = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Admin Dashboard
      </h1>

      <div className="mb-6">
        <ThemedButton
          text="+ Add New Product"
          fullWidth={false}
          padding="md"
          href="/admin/products/new"
        />
        {/* <Link
          href="/admin/products/new"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-accent"
        >
          + Add New Product
        </Link> */}
      </div>

      {loading ? (
        <p className="text-foreground font-bold">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-black text-foreground">
            <thead className="bg-secondary hidden md:table-header-group">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Image URL</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-black bg-gray-300 text-black block md:table-row mb-4 md:mb-0"
                >
                  <AdminProductInfo
                    product={p}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
