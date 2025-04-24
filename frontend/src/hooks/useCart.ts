import { useEffect, useState } from "react";
import {
  addItemToCart,
  getCart,
  removeItemFromCart,
  updateCartItem,
} from "@/lib/api";
import { CartItem } from "@/app/cart/page";
import { useAuth } from "./useAuth";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setItems(data.items);
    } catch (err) {
      console.error("Error loading cart:", err);
      setError("Could not load cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      await addItemToCart({ productId, quantity });
      loadCart();
    } catch (err) {
      console.error("Error adding item to cart:", err);
      setError("Failed to add item to cart");
      throw err;
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await removeItemFromCart(productId);
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Could not remove item");
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await updateCartItem({ productId, quantity });
      setItems((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Could not update quantity");
    }
  };

  return {
    items,
    loading,
    error,
    addToCart,
    removeItem,
    updateQuantity,
    reloadCart: loadCart,
  };
}
