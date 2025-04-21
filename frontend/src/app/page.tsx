import ProductList from "@/components/ProductList";
import { fetchProducts } from "@/lib/api";

export default async function Home() {
  try {
    const products = await fetchProducts();
    return (
      <main className="px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          🛍️ WATCH OUR PRODUCTS
        </h1>

        <ProductList products={products} />
      </main>
    );
  } catch (err: any) {
    return (
      <main className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-red-600 dark:text-red-400">
            {err.message || "Oops! Something went wrong 😢"}
          </h1>
        </div>
      </main>
    );
  }
}
