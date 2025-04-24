"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import ThemedButton from "./ThemedButton";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showErrorAddToCart, setShowErrorAddToCart] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (user) {
      await addToCart(product.id);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
    } else {
      setShowErrorAddToCart(true);
      setTimeout(() => setShowErrorAddToCart(false), 3000);
    }
  };

  return (
    <>
      {showFeedback && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-800 text-white text-sm px-4 py-2 rounded shadow-lg animate-fadeInOut">
          Product added to your Shopping Cart 🛒
        </div>
      )}
      {showErrorAddToCart && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-800 text-white text-sm px-4 py-2 rounded shadow-lg animate-fadeInOut">
          You have to log in to add to Cart 🛒
        </div>
      )}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <Link href={`/product/${product.id}`}>
          {product.imageUrl ? (
            <div className="relative w-full h-64">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 dark:bg-zinc-700">
              No Image
            </div>
          )}
        </Link>

        <div className="p-4">
          <Link href={`/product/${product.id}`}>
            <h2 className="text-lg font-semibold mb-1 text-black dark:text-white hover:underline">
              {product.name}
            </h2>
          </Link>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-green-600 dark:text-green-400">
              ${product.price.toFixed(2)}
            </span>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                product.stockQuantity > 0
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {product.stockQuantity > 0 ? "Available" : "Sold Out"}
            </span>
          </div>
          <div className="flex gap-2">
            {user && (
              <ThemedButton
                text="Add to Cart"
                icon={FaShoppingCart}
                isPrimary
                isDisabled={product.stockQuantity === 0}
                fullWidth
                onClick={handleAddToCart}
              />
            )}

            <ThemedButton
              text="Veiw"
              icon={FaEye}
              isPrimary={false}
              fullWidth
              href={`/product/${product.id}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
function addToCart(id: number) {
  throw new Error("Function not implemented.");
}
