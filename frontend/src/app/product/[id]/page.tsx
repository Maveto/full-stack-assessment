import { fetchProductById, fetchReviewsByProductId } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import ReviewsList from "@/components/ReviewsList";
import ProductInfo from "@/components/ProductInfo";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  let product;
  let reviews = [];

  try {
    product = await fetchProductById(params.id);
    reviews = await fetchReviewsByProductId(params.id);
  } catch (err) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="w-full md:w-1/2">
          {product.imageUrl ? (
            <div className="relative w-full h-[400px]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain rounded-lg bg-white"
              />
            </div>
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
              Sin imagen
            </div>
          )}
        </div>

        {/* Information */}
        <ProductInfo product={product} />
      </div>

      {/* Reviews */}
      <ReviewsList reviews={reviews} productId={product.id} />
    </div>
  );
}
