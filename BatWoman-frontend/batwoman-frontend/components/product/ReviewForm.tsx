"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface ReviewFormProps {
  onSubmit: (
    title: string,
    rating: number,
    comment: string
  ) => void;

  loading: boolean;
}

export default function ReviewForm({
  onSubmit,
  loading,
}: ReviewFormProps) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit(title, rating, comment);

    setTitle("");
    setRating(5);
    setComment("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl border border-neutral-200 p-6"
    >
      <h3 className="text-2xl font-[var(--font-playfair)]">
        Write a Review
      </h3>

      {/* Rating */}

      <div className="mt-6">
        <label className="mb-3 block text-sm font-medium">
          Rating
        </label>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
            >
              <Star
                size={26}
                fill={value <= rating ? "currentColor" : "none"}
                className="text-yellow-500"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Title */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Review Title
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-neutral-300 p-3 outline-none focus:border-black"
        />
      </div>

      {/* Comment */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Comment
        </label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-full resize-none border border-neutral-300 p-3 outline-none focus:border-black"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full bg-black py-4 text-white transition hover:bg-neutral-800"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}