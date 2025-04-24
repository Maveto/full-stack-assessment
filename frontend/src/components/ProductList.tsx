"use client";

import { useEffect, useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import { fetchProducts } from "@/lib/api";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 px-4 mt-10">
      {products.map((p) => {
        return <ProductCard key={p.id} product={p} />;
      })}
    </ul>
  );
}
