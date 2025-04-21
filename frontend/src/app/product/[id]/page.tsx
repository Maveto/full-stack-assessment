import { fetchProductById, fetchReviewsByProductId } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductInfo({ params }: ProductPageProps) {
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

          <div className="pt-4">
            <button
              disabled={product.stockQuantity === 0}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded transition
                ${
                  product.stockQuantity > 0
                    ? "bg-primary text-background hover:text-white hover:bg-accent"
                    : "bg-gray-400 text-gray-800 cursor-not-allowed"
                }`}
            >
              <FaShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-black font-bold mb-4">User Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-black">No reviews yet.</p>
        ) : (
          <ul className="space-y-4 text-black">
            {reviews.map((review: any) => (
              <li key={review.id} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-secondary">
                    User #{review.userId}
                  </p>
                  <span className="text-sm italic">
                    {new Date(review.createdDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-yellow-500 font-medium">
                  {review.rate}/5 {"★".repeat(review.rate)}
                  {"☆".repeat(5 - review.rate)}
                </p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
