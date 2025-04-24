"use client";

import { FaShoppingCart } from "react-icons/fa";
import { Product } from "./ProductCard";
import ThemedButton from "./ThemedButton";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

export default function ProductInfo({ product }: { product: Product }) {
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
      {/* Feedback messages */}
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
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-3xl text-black font-bold">{product.name}</h1>
        <p className="text-black">{product.description}</p>

        <div className="text-2xl font-semibold text-green-600">
          ${product.price.toFixed(2)}
        </div>

        <div
          className={`inline-block px-3 py-1 text-sm rounded-full ${
            product.stockQuantity > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.stockQuantity > 0 ? "Available" : "Out of Stock"}
        </div>

        {user && (
          <div className="pt-4">
            <ThemedButton
              text="Add to Cart"
              icon={FaShoppingCart}
              isDisabled={product.stockQuantity <= 0}
              isPrimary
              padding="md"
              onClick={handleAddToCart}
            />
          </div>
        )}
      </div>
    </>
  );
}
