export interface ProductMedia {
  id: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  altText: string;
  primaryMedia: boolean;
  displayOrder: number;
  createdAt: string;
}

/**
 * A single size+color combination for a product.
 * Inventory, SKU and availability belong here — NOT on the product itself.
 */
export interface ProductVariant {
  id: string;

  sizeId: string;
  size: string;
  numericSize: number | null;

  colorId: string;
  color: string;
  colorCode: string;
  colorHexCode: string | null;

  sku: string;

  active: boolean;

  availableQuantity: number;
  reservedQuantity: number;
  totalQuantity: number;
}

export interface ProductDetailCategory {
  id: string;
  name: string;
  slug: string;
}

/**
 * Full product data returned by GET /api/v1/products/slug/:slug
 *
 * size / color / sku / availableQuantity do NOT exist at this level.
 * Use `variants` instead.
 */
export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  fabric: string;
  price: number;
  discountPrice: number | null;
  featured: boolean | null;
  newArrival: boolean | null;
  active: boolean;
  media: ProductMedia[];
  variants: ProductVariant[];
  category?: ProductDetailCategory;
}