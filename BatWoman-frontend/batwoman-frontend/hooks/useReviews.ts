"use client";

import { useQuery } from "@tanstack/react-query";

import { getProductReviews } from "@/services/review.service";

export function useReviews(productId: string) {
  return useQuery({
    queryKey: ["reviews", productId],

    queryFn: () => getProductReviews(productId),

    enabled: !!productId,
  });
}