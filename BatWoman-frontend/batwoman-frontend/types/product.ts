export interface ProductMedia {
  id: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  altText: string;
  primaryMedia: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice: number | null;
  category: Category;
  media: ProductMedia[];
}

export type ProductSortOption =
    | "featured"
    | "newest"
    | "price-low"
    | "price-high"
    | "name";