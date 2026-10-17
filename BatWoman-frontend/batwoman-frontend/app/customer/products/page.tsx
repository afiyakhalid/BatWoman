"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

import ProductHeader from "@/components/product/ProductHeader";
import ProductSidebar from "@/components/product/ProductSidebar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer/Footer";
import { useCategories } from "@/hooks/useCategories";

import { ProductFilters } from "@/services/product.service";
import { ProductSortOption } from "@/types/product";

function ProductsContent() {
  const searchParams = useSearchParams();
  const { data: categories = [] } = useCategories();

  const categoryIdParam = searchParams.get("categoryId") ?? undefined;

  const [filters, setFilters] = useState<ProductFilters>(() => ({
    categoryId: categoryIdParam,
  }));

  const [sortBy, setSortBy] = useState<ProductSortOption>("newest");
  const [columns, setColumns] = useState<2 | 4>(4);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [totalProductsCount, setTotalProductsCount] = useState<number | undefined>(undefined);

  // Active category name
  const currentCategory = categories.find((c) => c.id === filters.categoryId);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categoryId) count++;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) count++;
    if (filters.fabric) count++;
    if (filters.color) count++;
    return count;
  }, [filters]);

  // Remove single active filter tag
  const removeFilter = (key: keyof ProductFilters) => {
    if (key === "minPrice" || key === "maxPrice") {
      setFilters((prev) => ({
        ...prev,
        minPrice: undefined,
        maxPrice: undefined,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }
  };

  const handleCategorySelect = (categoryId?: string) => {
    setFilters((prev) => ({
      ...prev,
      categoryId,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* KHAITE-INSPIRED LUXURY CONTAINER */}
      <div className="mx-auto max-w-[1760px] px-4 sm:px-8 lg:px-12 pt-4 pb-24">
        {/* EDITORIAL HEADER & TOOLBAR */}
        <ProductHeader
          totalCount={totalProductsCount}
          selectedCategoryName={currentCategory?.name}
          categories={categories}
          selectedCategoryId={filters.categoryId}
          onCategorySelect={handleCategorySelect}
          activeFilterCount={activeFilterCount}
          onToggleFilters={() => setIsFilterDrawerOpen(true)}
          sortBy={sortBy}
          onSortChange={setSortBy}
          columns={columns}
          onColumnsChange={setColumns}
        />

        {/* ACTIVE FILTER TAGS BAR */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 pb-2 text-[11px] uppercase tracking-[0.18em]">
            <span className="text-neutral-400 mr-1">Active:</span>

            {filters.categoryId && currentCategory && (
              <button
                type="button"
                onClick={() => removeFilter("categoryId")}
                className="flex items-center gap-1.5 border border-neutral-300 bg-neutral-50 px-2.5 py-1 text-black hover:border-black transition"
              >
                <span>{currentCategory.name}</span>
                <X size={11} />
              </button>
            )}

            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
              <button
                type="button"
                onClick={() => removeFilter("minPrice")}
                className="flex items-center gap-1.5 border border-neutral-300 bg-neutral-50 px-2.5 py-1 text-black hover:border-black transition"
              >
                <span>
                  {filters.minPrice && filters.maxPrice
                    ? `₹${filters.minPrice} - ₹${filters.maxPrice}`
                    : filters.maxPrice
                    ? `Under ₹${filters.maxPrice}`
                    : `Above ₹${filters.minPrice}`}
                </span>
                <X size={11} />
              </button>
            )}

            {filters.fabric && (
              <button
                type="button"
                onClick={() => removeFilter("fabric")}
                className="flex items-center gap-1.5 border border-neutral-300 bg-neutral-50 px-2.5 py-1 text-black hover:border-black transition"
              >
                <span>Fabric: {filters.fabric}</span>
                <X size={11} />
              </button>
            )}

            {filters.color && (
              <button
                type="button"
                onClick={() => removeFilter("color")}
                className="flex items-center gap-1.5 border border-neutral-300 bg-neutral-50 px-2.5 py-1 text-black hover:border-black transition"
              >
                <span>Color: {filters.color}</span>
                <X size={11} />
              </button>
            )}

            <button
              type="button"
              onClick={() => setFilters({})}
              className="ml-2 text-neutral-400 hover:text-black underline transition"
            >
              Clear All
            </button>
          </div>
        )}

        {/* PRODUCT GRID SECTION */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <ProductGrid
            filters={filters}
            sortBy={sortBy}
            columns={columns}
            onCountChange={setTotalProductsCount}
            onResetFilters={() => setFilters({})}
          />
        </div>

        {/* SLIDE-OUT FILTER DRAWER */}
        <ProductSidebar
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          filters={filters}
          onFiltersChange={setFilters}
          totalCount={totalProductsCount}
        />
      </div>

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-xs uppercase tracking-[0.25em] text-neutral-400">
          Loading Collection...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}