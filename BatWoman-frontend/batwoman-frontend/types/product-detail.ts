export interface ProductImage {
  objectKey: string;
  altText: string;
  primary: boolean;
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

  availableQuantity: number;

  images: ProductImage[];
}