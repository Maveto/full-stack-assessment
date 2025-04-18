import { fetchProducts } from "@/lib/api";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="text-foreground bg-secondary ">
      {products.map((product: any) => {
        return (
          <ul key={product.id}>
            <li>name: {product.name}</li>
            <li>id: {product.id}</li>
            <li>description: {product.description}</li>
            <li>price: {product.price}</li>
            <li>stock: {product.stockQuantity}</li>
            <li>imgUrl: {product.imageUrl}</li>
          </ul>
        );
      })}
    </div>
  );
}
