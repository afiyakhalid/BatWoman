import api from "@/lib/axios";
import { Review } from "@/types/review";

export async function getProductReviews(productId: string) {
  const { data } = await api.get<Review[]>(
    `/reviews/product/${productId}`
  );

  return data;
}

export async function createReview(request: {
  productId: string;
  rating: number;
  title: string;
  comment: string;
}) {
  const { data } = await api.post("/reviews", request);

  return data;
}