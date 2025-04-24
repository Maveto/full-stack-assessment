"use client";

import CartItemCard from "@/components/CartItemCard";
import CartSummary from "@/components/CartSummary";
import { useCart } from "@/hooks/useCart";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export default function CartPage() {
  const { items, loading, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) return <p className="text-center py-10">Loading cart...</p>;

  if (items.length === 0)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
          Your Cart is empty
        </h2>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Your Shopping Cart
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemCard
              key={item.productId}
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>
        <CartSummary subtotal={subtotal} />
      </div>
    </div>
  );
}
