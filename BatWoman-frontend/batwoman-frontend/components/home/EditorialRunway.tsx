"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScrub } from "@/hooks/useScrub";
import Card3D from "@/components/ui/Card3D";
import { useNewArrivals } from "@/hooks/useNewArrivals";

export default function EditorialRunway() {
  const [ref, progress] = useScrub("sticky");
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  const {
    data: newArrivals = [],
    isLoading,
    isError,
  } = useNewArrivals();

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const measure = () => {
      setShift(
          Math.max(0, track.scrollWidth - window.innerWidth)
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };

  }, [newArrivals]);

  if (isLoading) {
    return (
        <section
            id="collections"
            className="flex min-h-[40vh] items-center justify-center bg-[#f7f5f0]"
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

  const totalCount = newArrivals.length;

  const currentCount = String(
      Math.min(
          totalCount,
          Math.floor(progress * totalCount) + 1
      )
  ).padStart(2, "0");

  const totalCountFormatted = String(totalCount).padStart(2, "0");

  return (
      <div
          ref={ref}
          id="collections"
          className="relative h-[300vh] bg-[#f7f5f0]"
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[72px]">
          <div className="mb-8 flex items-end justify-between gap-6 px-5 md:px-12">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#8f8a80]">
                THE RUNWAY
              </p>

              <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#1a1a1a] md:text-5xl">
                New arrivals, new season
              </h2>

              <p className="mt-3 text-[15px] text-[#6b6660]">
                Distinctive silhouettes, timeless appeal.
              </p>
            </div>

            <div className="hidden w-48 shrink-0 items-center gap-4 md:flex">
        <span className="text-[12px] tracking-[0.2em] text-[#8f8a80]">
          {currentCount}/{totalCountFormatted}
        </span>

              <div className="h-px flex-1 bg-[#d3cbc0]">
                <div
                    className="block h-px origin-left bg-black"
                    style={{
                      transform: `scaleX(${progress})`,
                    }}
                />
              </div>
            </div>
          </div>

          <div
              ref={trackRef}
              className="flex w-max gap-8 px-5 will-change-transform md:gap-12 md:px-12"
              style={{
                transform: `translateX(${-progress * shift}px)`,
              }}
          >
            {newArrivals.map((product, index) => {
              const imageUrl =
                  product.media.find((media) => media.primaryMedia)
                      ?.mediaUrl ||
                  product.media[0]?.mediaUrl;

              if (!imageUrl) return null;

              return (
                  <article
                      key={product.id}
                      className="relative shrink-0"
                      style={{
                        height: "min(62vh, 680px)",
                        aspectRatio: "3 / 4",
                      }}
                  >
                    <Link
                        href={`/customer/products/${product.slug}`}
                        className="block h-full w-full cursor-pointer"
                    >
                      <Card3D intensity={12} className="h-full w-full">
                        <div className="relative h-full w-full overflow-hidden rounded-sm bg-[#faf8f5] shadow-lg">
                          <img
                              src={imageUrl}
                              alt={product.name}
                              loading={index < 2 ? "eager" : "lazy"}
                              fetchPriority={index < 2 ? "high" : "auto"}
                              decoding="async"
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                          />

                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 text-white">
                            <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-white/70">
                              Look {String(index + 1).padStart(2, "0")}
                            </p>

                            <h3 className="mt-2 font-[var(--font-playfair)] text-2xl">
                              {product.name}
                            </h3>

                            <p className="mt-1 text-sm text-white/85">
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
      </div>

  );
}