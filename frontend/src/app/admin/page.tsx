"use client";

import { useEffect, useState } from "react";
import { Product } from "@/components/ProductCard";
import { fetchProducts, deleteProductById } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemedButton from "@/components/ThemedButton";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        <table className="w-full border border-black text-foreground">
          <thead className="bg-secondary">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t border-black bg-gray-300 text-black"
              >
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price.toFixed(2)}</td>
                <td className="p-3">{p.stockQuantity}</td>
                <td className="p-3 space-x-2">
                  <Link href="/" legacyBehavior>
                    <a className="text-white bg-blue-600 hover:bg-blue-800 p-2 rounded transition duration-300 ease-in-out hover:scale-105">
                      Edit
                    </a>
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-white bg-red-600 hover:bg-red-800 p-2 rounded transition duration-300 ease-in-out hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
