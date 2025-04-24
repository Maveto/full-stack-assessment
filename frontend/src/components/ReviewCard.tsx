"use client";

import { useAuth } from "@/hooks/useAuth";
import { Review } from "./ReviewsList";

type ReviewProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewProps) {
  const { user } = useAuth();

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-secondary">
          {review.userId === user?.id
            ? user.username
            : `User #${review.userId}`}
        </p>
        {/* <p className="font-semibold text-secondary">User #{userId}</p> */}
        <span className="text-sm italic">
          {new Date(review.createdDate).toLocaleDateString()}
        </span>
      </div>
      <p className="text-yellow-500 font-medium">
        {review.rate}/5 {"★".repeat(review.rate)}
        {"☆".repeat(5 - review.rate)}
      </p>
      <p>{review.comment}</p>
    </>
  );
}
