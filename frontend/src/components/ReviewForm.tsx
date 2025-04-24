"use client";

import { FormEvent, useState } from "react";
import { FiSend } from "react-icons/fi";

type ReviewFormProps = {
  productId: number;
  onReviewSubmit: (review: { rate: number; comment: string }) => void;
};

export default function ReviewForm({
  productId,
  onReviewSubmit,
}: ReviewFormProps) {
  const [rate, setRate] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onReviewSubmit({ rate, comment });
      setComment("");
      setRate(5);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h3 className="text-xl font-semibold text-black mb-2">Leave a Review</h3>

      <label htmlFor="rate" className="block text-black mb-1">
        Rating
      </label>
      <select
        id="rate"
        value={rate}
        onChange={(e) => setRate(parseInt(e.target.value))}
        className="mb-3 p-2 rounded border bg-white text-yellow-500"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r} className="text-yellow-500">
            {r} ★
          </option>
        ))}
      </select>

      <label htmlFor="comment" className="block text-black mb-1">
        Comment
      </label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full p-2 border rounded mb-3 bg-white text-black"
        required
      />

      <button
        type="submit"
        className="bg-secondary text-foreground px-4 py-2 rounded hover:bg-accent transition flex items-center gap-2"
      >
        <FiSend />
        Submit Review
      </button>
    </form>
  );
}
