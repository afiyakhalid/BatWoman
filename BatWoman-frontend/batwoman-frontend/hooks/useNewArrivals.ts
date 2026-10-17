"use client";

import { useQuery } from "@tanstack/react-query";
import { getNewArrivalProducts } from "@/services/product.service";

export function useNewArrivals() {
  return useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: getNewArrivalProducts,
    staleTime: 0,
    refetchOnMount: "always",
  });
}
