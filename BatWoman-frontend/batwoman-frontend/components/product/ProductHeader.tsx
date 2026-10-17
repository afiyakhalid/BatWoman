"use client";

import { SlidersHorizontal, Grid2X2, Grid3X3, Check } from "lucide-react";
import { ProductSortOption } from "@/types/product";
import { Category } from "@/types/product";
import { useState, useRef, useEffect } from "react";

interface ProductHeaderProps {
  totalCount?: number;
  selectedCategoryName?: string;
  categories?: Category[];
  selectedCategoryId?: string;
  onCategorySelect?: (categoryId?: string) => void;
  activeFilterCount: number;
  onToggleFilters: () => void;
  sortBy: ProductSortOption;
  onSortChange: (value: ProductSortOption) => void;
  columns: 2 | 4;
  onColumnsChange: (columns: 2 | 4) => void;
}

const SORT_OPTIONS: { label: string; value: ProductSortOption }[] = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Featured", value: "featured" },
  { label: "Alphabetical", value: "name" },
];

export default function ProductHeader({
  totalCount,
  selectedCategoryName,
  categories = [],
  selectedCategoryId,
  onCategorySelect,
  activeFilterCount,
  onToggleFilters,
  sortBy,
  onSortChange,
  columns,
  onColumnsChange,
}: ProductHeaderProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "Sort";

  return (
    <div className="w-full">
      {/* KHAITE SERIF EDITORIAL TITLE & COUNT (IMAGE 2 MATCH) */}
      <div className="flex flex-col items-center justify-center pt-8 pb-6 text-center sm:pt-14 sm:pb-8">
        <h1 className="font-[var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-[0.22em] sm:tracking-[0.28em] text-neutral-900 transition-all">
          {selectedCategoryName || "Ready-To-Wear"}
        </h1>
        {totalCount !== undefined && (
          <p className="mt-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-light">
            {totalCount} {totalCount === 1 ? "Item" : "Items"}
          </p>
        )}
      </div>

      {/* HORIZONTAL CATEGORY SUB-NAVIGATION - CLEAN SINGLE SCROLLABLE RAIL (NO SECOND LINE BORDER) */}
      {categories.length > 0 && (
        <div className="no-scrollbar flex items-center justify-start sm:justify-center gap-5 sm:gap-7 overflow-x-auto scroll-smooth px-4 sm:px-0 pb-5 text-[11px] uppercase tracking-[0.18em]">
          <button
            type="button"
            onClick={() => onCategorySelect?.(undefined)}
            className={`
              shrink-0 pb-1 transition-colors border-b-2
              ${
                !selectedCategoryId
                  ? "border-black text-black font-medium"
                  : "border-transparent text-neutral-400 hover:text-black"
              }
            `}
          >
            All Ready-To-Wear
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategorySelect?.(cat.id)}
              className={`
                shrink-0 pb-1 transition-colors border-b-2
                ${
                  selectedCategoryId === cat.id
                    ? "border-black text-black font-medium"
                    : "border-transparent text-neutral-400 hover:text-black"
                }
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* STICKY LUXURY TOOLBAR: FILTERS / SORT / GRID TOGGLE (SINGLE CLEAN BOTTOM BORDER ONLY) */}
      <div className="sticky top-20 sm:top-24 z-20 flex items-center justify-between border-b border-neutral-200/70 bg-white/95 px-3 sm:px-6 py-3.5 backdrop-blur-md">
        {/* Left: Filter Toggle Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleFilters}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-neutral-900 transition hover:text-neutral-500 font-medium active:scale-95 py-1"
            aria-label="Toggle Filter Drawer"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center bg-black text-[9px] font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Right: Sort Dropdown & Grid View Columns Toggle */}
        <div className="flex items-center gap-4 sm:gap-7">
          {/* Custom Luxury Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-neutral-900 hover:text-neutral-500 font-medium transition py-1"
            >
              <span className="hidden sm:inline text-neutral-400 font-normal">Sort:</span>
              <span>{currentSortLabel}</span>
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 border border-neutral-200 bg-white py-1 shadow-lg z-30">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSortChange(opt.value);
                      setSortOpen(false);
                    }}
                    className={`
                      flex w-full items-center justify-between px-4 py-2.5 text-left text-[11px] uppercase tracking-[0.15em] transition
                      ${
                        sortBy === opt.value
                          ? "bg-neutral-50 font-medium text-black"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-black"
                      }
                    `}
                  >
                    <span>{opt.label}</span>
                    {sortBy === opt.value && <Check size={12} strokeWidth={2} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid View Switcher (Desktop 2-col vs 4-col) */}
          <div className="hidden sm:flex items-center gap-2 border-l border-neutral-200 pl-4">
            <button
              type="button"
              onClick={() => onColumnsChange(2)}
              className={`p-1.5 transition ${
                columns === 2 ? "text-black" : "text-neutral-300 hover:text-neutral-600"
              }`}
              title="2 Columns (Editorial View)"
              aria-label="2 Columns View"
            >
              <Grid2X2 size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => onColumnsChange(4)}
              className={`p-1.5 transition ${
                columns === 4 ? "text-black" : "text-neutral-300 hover:text-neutral-600"
              }`}
              title="4 Columns (Catalog View)"
              aria-label="4 Columns View"
            >
              <Grid3X3 size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}