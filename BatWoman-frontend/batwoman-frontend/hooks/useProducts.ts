"use client";

import { useQuery } from "@tanstack/react-query";

import {
  searchProducts,
  ProductFilters,
} from "@/services/product.service";

import { ProductSortOption } from "@/types/product";

export function useProducts(
    filters: ProductFilters,
    sortBy: ProductSortOption
) {

  return useQuery({
    queryKey: [
      "products",
      filters,
      sortBy,
    ],

    queryFn: () =>
        searchProducts(
            filters,
            sortBy
        ),
  });
}