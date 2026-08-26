import api from "@/lib/axios";

import { Product } from "@/types/product";
import { ProductDetail } from "@/types/product-detail";
import { ProductSortOption } from "@/types/product";

export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  fabric?: string;
  color?: string;
  page?: number;
  size?: number;
}

export async function searchProducts(
    filters: ProductFilters = {},
    sortBy: ProductSortOption = "newest"
): Promise<Product[]> {

  const response = await api.post("/products/search", {

    keyword: null,

    categoryId: filters.categoryId ?? null,

    minPrice: filters.minPrice ?? null,

    maxPrice: filters.maxPrice ?? null,

    fabric: filters.fabric ?? null,

    color: filters.color ?? null,

    page: filters.page ?? 0,

    size: filters.size ?? 12,

    sort: sortBy,

  });

  return response.data.content;
}

export async function getProductBySlug(
    slug: string
): Promise<ProductDetail> {

  const response = await api.get(
      `/products/slug/${slug}`
  );

  return response.data;
}