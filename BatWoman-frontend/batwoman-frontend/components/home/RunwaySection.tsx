"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrub } from "@/hooks/useScrub";
import Card3D from "@/components/ui/Card3D";
import { useNewArrivals } from "@/hooks/useNewArrivals";

interface RunwayLook {
  id: string;
  name: string;
  description: string;
  line: string;
  url: string;
  slug: string;
}

export default function EditorialRunway() {
  const [ref] = useScrub("sticky");
  const trackRef = useRef<HTMLDivElement>(null);

  const {
    data: newArrivals = [],
    isLoading,
    isError,
  } = useNewArrivals();

  const displayLooks: RunwayLook[] = newArrivals.flatMap((prod) => {
    const imageUrl =
        prod.media?.find((media) => media.primaryMedia)?.mediaUrl ||
        prod.media?.[0]?.mediaUrl;

    if (!imageUrl || !prod.slug) {
      return [];
    }

    return [
      {
        id: prod.id,
        name: prod.name,
        description: prod.category?.name
            ? `${prod.category.name} Collection`
            : "New Arrival",
        line: prod.category?.name
            ? `${prod.category.name} Collection`
            : "New Arrival",
        url: imageUrl,
        slug: prod.slug,
      },
    ];

  });

  const totalCount = displayLooks.length;

  if (isLoading) {
    return (
        <section
            id="collections"
            className="flex min-h-[50vh] items-center justify-center bg-[#f7f5f0]"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#8f8a80]">
            Loading the runway
          </p>
        </section>
    );
  }

  if (isError || displayLooks.length === 0) {
    return null;
  }

  return (
      <div ref={ref} id="collections" className="relative bg-[#f7f5f0]">
        <div className="flex min-h-screen flex-col justify-center overflow-hidden pt-[72px]">
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
                {String(totalCount).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-[#d3cbc0]" />
            </div>
          </div>

          <div className="flex justify-center px-5 md:px-12">
            <div
                ref={trackRef}
                className="flex w-full max-w-[min(1200px,100vw-2.5rem)] gap-5 overflow-x-auto overscroll-x-contain pb-2 md:gap-8 md:max-w-[min(1400px,100vw-6rem)] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d3cbc0] [&::-webkit-scrollbar-track]:bg-transparent"
            >
            {displayLooks.map((look, index) => (
                <article
                    key={look.id}
                    className="relative shrink-0"
                    style={{
                      height: "clamp(380px, 60vh, 640px)",
                      aspectRatio: "3/4",
                    }}
                >
                  <Link
                      href={`/customer/products/${look.slug}`}
                      className="block h-full w-full cursor-pointer"
                  >
                    <Card3D intensity={12} className="h-full w-full">
                      <div className="relative h-full w-full overflow-hidden rounded-sm bg-[#faf8f5] shadow-lg">
                        <img
                            src={look.url}
                            alt={look.name}
                            loading={index < 2 ? "eager" : "lazy"}
                            fetchPriority={index < 2 ? "high" : "auto"}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 text-white">
                          <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-white/70">
                            Look {String(index + 1).padStart(2, "0")}
                          </p>

                          <h3 className="mt-2 font-[var(--font-playfair)] text-2xl">
                            {look.name}
                          </h3>

                          <p className="mt-1 text-sm text-white/85">
                            {look.description}
                          </p>
                        </div>
                      </div>
                    </Card3D>
                  </Link>
                </article>
            ))}
            </div>
          </div>
        </div>
      </div>

  );
}