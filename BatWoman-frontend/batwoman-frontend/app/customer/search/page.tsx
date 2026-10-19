"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, Sparkles, ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const SUGGESTED_SEARCHES = [
  "Abaya",
  "Black",
  "Embroidered",
  "Silk",
  "Parveen",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const {
    data: products = [],
    isLoading,
    isError,
  } = useProducts({}, "name");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery)
    );
  }, [products, query]);

  return (
    <main className="min-h-screen bg-[#faf8f5] pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        {/* EDITORIAL HEADER */}
        <div className="mb-10 pb-6 border-b border-[#e7e1d8] text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8C6D4F] font-medium mb-1">
            Abaya Archive
          </p>

          <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900">
            Search Collection
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-neutral-500 tracking-wide">
            Discover tailored silhouettes, modest cuts, and signature abayas.
          </p>
        </div>

        {/* SEARCH BAR INPUT CONTAINER */}
        <div className="mx-auto max-w-3xl">
          <div className="group flex items-center gap-3.5 bg-white border border-[#e7e1d8] p-3 sm:p-4 shadow-[0_4px_25px_rgba(45,31,26,0.03)] transition-colors duration-200 focus-within:border-black">
            <Search size={18} className="text-[#8C6D4F] shrink-0 ml-1" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by abaya name, silhouette, or fabric..."
              className="w-full bg-transparent text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 placeholder:italic placeholder:font-serif outline-none tracking-wide"
              autoFocus
            />

            {/* Clear Button */}
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 text-neutral-400 hover:text-black transition-colors"
                aria-label="Clear search query"
              >
                <X size={16} />
              </button>
            )}

            {/* Results Count Pill */}
            {query.trim().length > 0 && (
              <span className="shrink-0 border border-[#e8dfd3] bg-[#faf8f5] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#8C6D4F]">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "abaya" : "abayas"}
              </span>
            )}
          </div>

          {/* CURATED SEARCH SUGGESTIONS */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mr-1">
              Curated:
            </span>
            {SUGGESTED_SEARCHES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setQuery(item)}
                className={`border px-3 py-1 text-[10px] uppercase tracking-[0.16em] transition-colors rounded-none ${
                  query.toLowerCase() === item.toLowerCase()
                    ? "border-black bg-black text-white"
                    : "border-[#e7e1d8] bg-white text-neutral-600 hover:border-black hover:text-black"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* FEEDBACK & RESULTS STATES */}
        <div className="mt-14">
          {isLoading && (
            <div className="py-20 text-center">
              <p className="font-[var(--font-playfair)] italic text-xl text-neutral-500">
                Searching the archives...
              </p>
            </div>
          )}

          {isError && (
            <div className="mx-auto max-w-md bg-white border border-[#e7e1d8] p-8 text-center shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-red-600">
                Unable to load collection results
              </p>
            </div>
          )}

          {/* Initial state before user types */}
          {!isLoading && !isError && query.trim().length === 0 && (
            <div className="py-20 text-center max-w-md mx-auto">
              <p className="font-[var(--font-playfair)] italic text-2xl text-neutral-800">
                Begin your search
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-neutral-400 leading-relaxed font-light">
                Type an abaya name above or select a curated tag to view the collection.
              </p>
            </div>
          )}

          {/* Zero results state */}
          {!isLoading &&
            !isError &&
            query.trim().length > 0 &&
            filteredProducts.length === 0 && (
              <div className="mx-auto max-w-lg bg-white border border-[#e7e1d8] p-10 sm:p-14 text-center shadow-[0_4px_25px_rgba(45,31,26,0.03)]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold mb-2">
                  No Matches
                </p>
                <h2 className="font-[var(--font-playfair)] italic text-2xl sm:text-3xl text-neutral-900 font-normal">
                  No Abayas Found
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-md mx-auto">
                  We could not find any garments matching “{query}”. Try adjusting your spelling or explore our entire collection.
                </p>
                <div className="mt-8">
                  <Link
                    href="/customer/products"
                    className="inline-flex items-center gap-2 border border-neutral-900 bg-transparent px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white rounded-none"
                  >
                    <span>Explore All Abayas</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}

          {/* Results Grid */}
          {!isLoading && !isError && filteredProducts.length > 0 && (
            <div>
              <div className="mb-6 flex items-baseline justify-between border-b border-[#e7e1d8] pb-4">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C6D4F] font-medium">
                  Showing matching abayas
                </span>
                <span className="text-xs text-neutral-400 tracking-wider">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}