"use client";

import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { ProductFilters } from "@/services/product.service";
import { ProductSortOption } from "@/types/product";

interface ProductGridProps {
  filters: ProductFilters;
  sortBy: ProductSortOption;
  columns?: 2 | 4;
  onCountChange?: (count: number) => void;
  onResetFilters?: () => void;
}

export default function ProductGrid({
  filters,
  sortBy,
  columns = 4,
  onCountChange,
  onResetFilters,
}: ProductGridProps) {
  const {
    data: products,
    isLoading,
    isError,
  } = useProducts(filters, sortBy);

  useEffect(() => {
    if (products) {
      onCountChange?.(products.length);
    }
  }, [products, onCountChange]);

  // Luxury Skeleton Loading State with generous breathing room
  if (isLoading) {
    return (
      <div
        className={`grid ${
          columns === 2
            ? "grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-14 lg:gap-x-20 gap-y-16 sm:gap-y-24"
            : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 sm:gap-x-8 lg:gap-x-12 xl:gap-x-16 gap-y-14 sm:gap-y-20 lg:gap-y-28"
        }`}
      >
        {Array.from({ length: columns === 2 ? 4 : 8 }).map((_, idx) => (
          <div key={idx} className="space-y-4">
            <div className="aspect-[3/4] w-full bg-neutral-100 animate-pulse rounded-none" />
            <div className="h-3 w-1/3 bg-neutral-100 animate-pulse rounded-none" />
            <div className="h-3 w-2/3 bg-neutral-100 animate-pulse rounded-none" />
            <div className="h-3 w-1/4 bg-neutral-100 animate-pulse rounded-none" />
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="py-24 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
          Unable to load collection
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 border-b border-black text-xs uppercase tracking-[0.2em] font-medium text-black pb-1 hover:text-neutral-500 hover:border-neutral-500 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty State (Khaite Minimalist)
  if (!products || products.length === 0) {
    return (
      <div className="py-32 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-normal">
          No garments match your selection
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 border-b border-black pb-1 text-[11px] uppercase tracking-[0.2em] text-black hover:text-neutral-500 hover:border-neutral-500 transition font-medium"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* GENEROUS LUXURY BREATHING ROOM BETWEEN PRODUCTS */}
      <div
        className={`grid ${
          columns === 2
            ? "grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-14 lg:gap-x-20 gap-y-16 sm:gap-y-24 lg:gap-y-32"
            : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 sm:gap-x-8 lg:gap-x-12 xl:gap-x-16 gap-y-14 sm:gap-y-20 lg:gap-y-28"
        }`}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            editorialMode={columns === 2}
          />
        ))}
      </div>
    </section>
  );
}