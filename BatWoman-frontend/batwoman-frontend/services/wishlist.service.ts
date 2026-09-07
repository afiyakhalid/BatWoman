import api from "@/lib/axios";

import { WishlistResponse } from "@/types/wishlist";

export async function getWishlist(): Promise<WishlistResponse[]> {
  const { data } = await api.get<WishlistResponse[]>(
    "/wishlist"
  );

  return data;
}

export async function addToWishlist(
  productId: string
): Promise<WishlistResponse> {
  const { data } = await api.post<WishlistResponse>(
    `/wishlist/${productId}`
  );

  return data;
}

export async function removeFromWishlist(
  productId: string
): Promise<void> {
  await api.delete(`/wishlist/${productId}`);
}

export async function isInWishlist(
  productId: string
): Promise<boolean> {
  const { data } = await api.get<boolean>(
    `/wishlist/${productId}/exists`
  );

  return data;
}