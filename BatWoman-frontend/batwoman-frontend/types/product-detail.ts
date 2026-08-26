export interface ProductMedia {
  id: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  altText: string;
  primaryMedia: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  fabric: string;
  color: string;
  size: string;
  price: number;
  discountPrice: number | null;
  availableQuantity: number | null;
  media: ProductMedia[];
}