import { ProductMedia } from "@/types/product";

export interface WishlistProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice: number | null;
  active: boolean;
  featured: boolean;
  newArrival: boolean;
  media: ProductMedia[];
}

export interface WishlistResponse {
  id: string;
  product: WishlistProduct;
  createdAt: string;
}