export interface ProductImage {
  id: string;
  objectKey: string;
  altText: string;
  displayOrder: number;
  primary: boolean;
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
  discountPrice?: number;
  category: Category;
  images: ProductImage[];
}