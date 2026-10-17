"use client";

import { useEffect, useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import { ProductFilters } from "@/services/product.service";

interface ProductSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  totalCount?: number;
}

const FABRICS = [
  "Nida",
  "Silk",
  "Crepe",
  "Georgette",
  "Chiffon",
  "Linen",
  "Velvet",
];

const COLORS = [
  { name: "Black", hex: "#111111" },
  { name: "Onyx", hex: "#222222" },
  { name: "Sand", hex: "#D8C7B5" },
  { name: "Ivory", hex: "#FDFBF7" },
  { name: "Olive", hex: "#555D42" },
  { name: "Navy", hex: "#1B2430" },
  { name: "Brown", hex: "#4A3728" },
];

export default function ProductSidebar({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  totalCount,
}: ProductSidebarProps) {
  const { data: categories = [] } = useCategories();

  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    fabric: false,
    color: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const updateFilter = (changes: Partial<ProductFilters>) => {
    onFiltersChange({
      ...filters,
      ...changes,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* DRAWER PANEL */}
      <aside
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out"
        role="dialog"
        aria-modal="true"
        aria-label="Filter Collection"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <h2 className="text-xs uppercase tracking-[0.25em] font-medium text-black">
              Filters
            </h2>
            {totalCount !== undefined && (
              <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                ({totalCount} Items)
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 hover:text-black transition"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-neutral-700 hover:text-black transition"
              aria-label="Close Filter Drawer"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* ACCORDION CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-neutral-200">
          {/* CATEGORIES */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("category")}
              className="flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-black"
            >
              <span>Category</span>
              {openSections.category ? (
                <ChevronUp size={14} strokeWidth={1.5} />
              ) : (
                <ChevronDown size={14} strokeWidth={1.5} />
              )}
            </button>

            {openSections.category && (
              <div className="mt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => updateFilter({ categoryId: undefined })}
                  className={`block text-xs uppercase tracking-[0.15em] transition ${
                    !filters.categoryId
                      ? "font-semibold text-black"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      updateFilter({
                        categoryId:
                          filters.categoryId === cat.id ? undefined : cat.id,
                      })
                    }
                    className={`block text-xs uppercase tracking-[0.15em] transition ${
                      filters.categoryId === cat.id
                        ? "font-semibold text-black"
                        : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRICE */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("price")}
              className="flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-black"
            >
              <span>Price</span>
              {openSections.price ? (
                <ChevronUp size={14} strokeWidth={1.5} />
              ) : (
                <ChevronDown size={14} strokeWidth={1.5} />
              )}
            </button>

            {openSections.price && (
              <div className="mt-4 space-y-3">
                {[
                  { label: "Under ₹3,000", min: undefined, max: 3000 },
                  { label: "₹3,000 – ₹5,000", min: 3000, max: 5000 },
                  { label: "Above ₹5,000", min: 5000, max: undefined },
                ].map((tier, idx) => {
                  const isSelected =
                    filters.minPrice === tier.min &&
                    filters.maxPrice === tier.max;

                  return (
                    <label
                      key={idx}
                      className="flex cursor-pointer items-center gap-3 text-xs uppercase tracking-[0.15em] text-neutral-600 hover:text-black"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFilter({
                              minPrice: tier.min,
                              maxPrice: tier.max,
                            });
                          } else {
                            updateFilter({
                              minPrice: undefined,
                              maxPrice: undefined,
                            });
                          }
                        }}
                        className="h-3.5 w-3.5 rounded-none border-neutral-300 accent-black cursor-pointer"
                      />
                      <span>{tier.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* FABRIC */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("fabric")}
              className="flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-black"
            >
              <span>Fabric</span>
              {openSections.fabric ? (
                <ChevronUp size={14} strokeWidth={1.5} />
              ) : (
                <ChevronDown size={14} strokeWidth={1.5} />
              )}
            </button>

            {openSections.fabric && (
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {FABRICS.map((fabric) => {
                  const isSelected = filters.fabric === fabric;
                  return (
                    <button
                      key={fabric}
                      type="button"
                      onClick={() =>
                        updateFilter({
                          fabric: isSelected ? undefined : fabric,
                        })
                      }
                      className={`
                        border py-2 px-3 text-left text-[11px] uppercase tracking-[0.15em] transition rounded-none
                        ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-neutral-200 text-neutral-600 hover:border-black hover:text-black"
                        }
                      `}
                    >
                      {fabric}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* COLOR */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleSection("color")}
              className="flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.2em] font-medium text-black"
            >
              <span>Color</span>
              {openSections.color ? (
                <ChevronUp size={14} strokeWidth={1.5} />
              ) : (
                <ChevronDown size={14} strokeWidth={1.5} />
              )}
            </button>

            {openSections.color && (
              <div className="mt-4 flex flex-wrap gap-2.5">
                {COLORS.map((col) => {
                  const isSelected = filters.color === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() =>
                        updateFilter({
                          color: isSelected ? undefined : col.name,
                        })
                      }
                      className={`
                        flex items-center gap-2 border py-1.5 px-3 text-[11px] uppercase tracking-[0.15em] transition rounded-none
                        ${
                          isSelected
                            ? "border-black bg-neutral-100 text-black font-medium"
                            : "border-neutral-200 text-neutral-600 hover:border-black"
                        }
                      `}
                    >
                      <span
                        className="h-2.5 w-2.5 border border-neutral-300"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* STICKY FOOTER APPLY BUTTON */}
        <div className="border-t border-neutral-200 p-5 pb-8 sm:p-6 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-black py-3.5 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-neutral-800 rounded-none font-medium"
          >
            Apply Filters {totalCount !== undefined ? `(${totalCount})` : ""}
          </button>
        </div>
      </aside>
    </div>
  );
}