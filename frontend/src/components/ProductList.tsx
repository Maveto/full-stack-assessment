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
      {/* <ProductCard
        product={{
          id: 100,
          name: "Test",
          description: "Description",
          price: 34.99,
          stockQuantity: 15,
          imageUrl: "/image.png",
        }}
      />
      <ProductCard
        product={{
          id: 101,
          name: "Test",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis dui id ligula maximus bibendum non id ex. Nullam auctor lobortis urna, ac interdum lacus feugiat id. Aliquam nec iaculis nunc, ut bibendum metus. Etiam et tellus quis mauris feugiat lobortis vel ut velit. Fusce lorem felis, semper ac sem id, luctus convallis arcu.",
          price: 34.99,
          stockQuantity: 15,
        }}
      />
      <ProductCard
        product={{
          id: 102,
          name: "Test",
          description: "Description",
          price: 34.99,
          stockQuantity: 15,
        }}
      />
      <ProductCard
        product={{
          id: 102,
          name: "Test",
          description: "Description",
          price: 34.99,
          stockQuantity: 15,
        }}
      />
      <ProductCard
        product={{
          id: 102,
          name: "Test",
          description: "Description",
          price: 34.99,
          stockQuantity: 15,
        }}
      />
      <ProductCard
        product={{
          id: 102,
          name: "Test",
          description: "Description",
          price: 34.99,
          stockQuantity: 15,
        }}
      />
      <ProductCard
        product={{
          id: 102,
          name: "Test",
          description: "Description",
          price: 34.99,
          stockQuantity: 15,
        }}
      />
      <ProductCard
        product={{
          id: 102,
          name: "Test",
          description: "Description",
          price: 34.99,
          stockQuantity: 0,
        }}
      />
      <ProductCard
        product={{
          id: 102,
          name: "Test",
          description: "Description",
          price: 34.99,
          stockQuantity: 15,
        }}
      /> */}
    </ul>
  );
}

// grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]
