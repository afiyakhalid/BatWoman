import api from "@/lib/axios";

import { Product } from "@/types/product";
import { ProductDetail } from "@/types/product-detail";

export async function getProducts(): Promise<Product[]> {
  const response = await api.get("/products");

  return response.data;
}

export async function getProductBySlug(
  slug: string
): Promise<ProductDetail> {

  const response = await api.get(
    `/products/slug/${slug}`
  );

  return response.data;
}