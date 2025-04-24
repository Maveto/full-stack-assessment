"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createNewProduct } from "@/lib/api";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function NewProductForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: undefined,
    stockQuantity: undefined,
    imageUrl: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stockQuantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createNewProduct(form);
      router.push("/admin");
    } catch (err) {
      console.error("Error creating product", err);
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Add New Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8 mt-6">
        <InputField
          name="name"
          id="name"
          label="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <InputField
          name="description"
          id="description"
          label="Description"
          type="textarea"
          value={form.description}
          onChange={handleChange}
          required
        />
        <InputField
          id="price"
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <InputField
          id="stockQuantity"
          label="Stock Quantity"
          name="stockQuantity"
          type="number"
          value={form.stockQuantity}
          onChange={handleChange}
          required
        />
        <InputField
          id="imageUrl"
          label="Image URL"
          name="imageUrl"
          type="text"
          value={form.imageUrl}
          onChange={handleChange}
        />

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex felx-row gap-4">
          <Link
            href={loading ? "" : "/admin"}
            className="w-full bg-red-600 hover:bg-red-800 text-white py-2 rounded text-center"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-accent text-white py-2 rounded"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
