"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import ThemedButton from "./ThemedButton";

type Product = {
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
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        {product.imageUrl ? (
          <div className="relative w-full h-64">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 dark:bg-zinc-700">
            Sin imagen
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
          <ThemedButton
            text="Add to Cart"
            icon={FaShoppingCart}
            isPrimary
            isDisabled={product.stockQuantity === 0}
            fullWidth
          />

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
  );
}
