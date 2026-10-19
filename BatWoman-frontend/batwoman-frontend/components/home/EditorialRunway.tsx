"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card3D from "@/components/ui/Card3D";
import { useNewArrivals } from "@/hooks/useNewArrivals";

export default function EditorialRunway() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const {
    data: newArrivals = [],
    isLoading,
    isError,
  } = useNewArrivals();

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const overflowing = maxScroll > 2;
    setIsOverflowing(overflowing);

    if (!overflowing) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const currentScroll = track.scrollLeft;
    setCanScrollLeft(currentScroll > 10);
    setCanScrollRight(currentScroll < maxScroll - 10);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();

    const observer = new ResizeObserver(() => {
      updateScrollState();
    });
    observer.observe(track);
    window.addEventListener("resize", updateScrollState);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, newArrivals]);

  const scrollByDirection = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth || 260;
    const gap = 20;
    const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);

    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <section
        id="collections"
        className="flex min-h-[30vh] items-center justify-center bg-[#f7f5f0]"
      >
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#8f8a80]">
          Loading the runway
        </p>
      </section>
    );
  }

  if (isError || newArrivals.length === 0) {
    return null;
  }

  return (
    <section
      id="collections"
      className="relative bg-[#f7f5f0] py-10 md:py-16 overflow-hidden"
    >
      <div className="flex flex-col justify-center">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 px-5 md:mb-8 md:px-12">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8f8a80] md:text-[12px]">
              THE RUNWAY
            </p>

            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-[#1a1a1a] sm:text-3xl md:mt-4 md:text-5xl">
              New arrivals, new season
            </h2>

            <p className="mt-1.5 text-xs text-[#6b6660] sm:text-sm md:mt-3 md:text-[15px]">
              Distinctive silhouettes, timeless appeal.
            </p>
          </div>

          {/* Navigation Arrows (shown only when products overflow and need horizontal scrolling) */}
          {isOverflowing && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollByDirection("left")}
                disabled={!canScrollLeft}
                aria-label="Previous look"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d3cbc0] text-[#1a1a1a] transition-all hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-25 md:h-8 md:w-8"
              >
                <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByDirection("right")}
                disabled={!canScrollRight}
                aria-label="Next look"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d3cbc0] text-[#1a1a1a] transition-all hover:border-black hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-25 md:h-8 md:w-8"
              >
                <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Horizontal Track: Centered when 1, 2, or 3 products fit without overflowing; scrolls towards the right when overflowing */}
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          style={{
            justifyContent: isOverflowing ? "flex-start" : "safe center",
          }}
          className={`flex w-full gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-5 pb-4 sm:gap-6 md:gap-8 md:px-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isOverflowing ? "justify-start" : "justify-center"
          }`}
        >
          {newArrivals.map((product, index) => {
            const imageUrl =
              product.media?.find((media) => media.primaryMedia)?.mediaUrl ||
              product.media?.[0]?.mediaUrl;

            if (!imageUrl) return null;

            return (
              <article
                key={product.id}
                className="relative shrink-0 snap-start h-[280px] sm:h-[350px] md:h-[480px] lg:h-[540px]"
                style={{
                  aspectRatio: "3 / 4",
                }}
              >
                <Link
                  href={`/customer/products/${product.slug}`}
                  className="block h-full w-full cursor-pointer"
                >
                  <Card3D intensity={12} className="h-full w-full">
                    <div className="relative h-full w-full overflow-hidden rounded-sm bg-[#faf8f5] shadow-md transition-shadow duration-300 hover:shadow-xl">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        loading={index < 2 ? "eager" : "lazy"}
                        fetchPriority={index < 2 ? "high" : "auto"}
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 sm:p-5 md:p-6 text-white">
                        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/70 sm:text-[11px] md:text-[12px]">
                          Look {String(index + 1).padStart(2, "0")}
                        </p>

                        <h3 className="mt-1 font-[var(--font-playfair)] text-base font-semibold sm:text-xl md:mt-2 md:text-2xl line-clamp-1">
                          {product.name}
                        </h3>

                        <p className="mt-0.5 text-xs text-white/85 sm:text-sm line-clamp-1">
                          {product.category?.name
                            ? `${product.category.name} Collection`
                            : "New Arrival"}
                        </p>
                      </div>
                    </div>
                  </Card3D>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}