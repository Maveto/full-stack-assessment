"use client";

import { useMemo, useState } from "react";
import ReviewForm from "./ReviewForm";
import { useAuth } from "@/hooks/useAuth";
import { postReview } from "@/lib/api";
import ReviewCard from "./ReviewCard";

export type Review = {
  comment: string;
  createdDate: string;
  id: string;
  productId: number;
  rate: number;
  userId: number;
};

type ReviewsListProps = {
  reviews: Review[];
  productId: number;
};

export default function ReviewsList({
  reviews: initialReviews,
  productId,
}: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [sortOption, setSortOption] = useState("newest");
  const { user } = useAuth();

  const handleNewReview = async (review: { rate: number; comment: string }) => {
    if (!user?.id) {
      console.error("You can't post a review if you're not logged in");
      return;
    }

    try {
      const newReview = await postReview({
        ...review,
        productId: productId,
        userId: user?.id,
      });

      setReviews([newReview, ...reviews]);
    } catch (err) {
      console.error("Error al enviar la review", err);
    }
  };

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (sortOption) {
      case "oldest":
        return sorted.sort(
          (a, b) =>
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
        );
      case "highest":
        return sorted.sort((a, b) => b.rate - a.rate);
      case "lowest":
        return sorted.sort((a, b) => a.rate - b.rate);
      case "newest":
      default:
        return sorted.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        );
    }
  }, [reviews, sortOption]);

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-black font-bold mb-4">User Reviews</h2>

      {user && (
        <ReviewForm productId={productId} onReviewSubmit={handleNewReview} />
      )}

      {reviews.length > 0 && (
        <div className="mb-4">
          <label className="text-black mr-2 font-medium">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded bg-white text-black"
          >
            <option value="newest">Most Recent</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-black">No reviews yet.</p>
      ) : (
        <ul className="space-y-4 text-black">
          {sortedReviews.map((review: any) => (
            <li key={review.id} className="border-b pb-4">
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
