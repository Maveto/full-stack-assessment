import ProductList from "@/components/ProductList";
import { fetchProducts } from "@/lib/api";

export default function Home() {
  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        🛍️ WATCH OUR PRODUCTS
      </h1>

      <ProductList />
    </main>
  );
}
