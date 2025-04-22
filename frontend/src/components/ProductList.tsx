import ProductCard from "./ProductCard";

export default function ProductList({ products }: { products: any }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 px-4 mt-10">
      {products.map(
        (product: {
          id: number;
          name: string;
          description: string;
          price: number;
          stockQuantity: number;
          imageUrl: string | undefined;
        }) => {
          return <ProductCard key={product.id} product={product} />;
        }
      )}
    </ul>
  );
}
