"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";

export interface RunwayLook {
  id: string;
  lookNumber: string;
  title: string;
  price?: string;
  image: string;
  slug: string;
  tagline?: string;
}

const defaultRunwayLooks: RunwayLook[] = [
  {
    id: "look-01",
    lookNumber: "LOOK 01",
    title: "Noor Organza Kimono",
    price: "₹3,499",
    image: "/images/hero/hero-1.jpg",
    slug: "noor-organza-kimono",
    tagline: "Modesty, Refined",
  },
  {
    id: "look-02",
    lookNumber: "LOOK 02",
    title: "Zahra Minimalist Crepe",
    price: "₹4,199",
    image: "/images/hero/hero-2.jpg",
    slug: "zahra-minimalist-crepe",
    tagline: "A Quiet Kind of Luxury",
  },
  {
    id: "look-03",
    lookNumber: "LOOK 03",
    title: "Sahar Crepe Kaftan",
    price: "₹2,999",
    image: "/images/categories/luxury.jpg",
    slug: "sahar-crepe-kaftan",
    tagline: "Elegance In Every Layer",
  },
  {
    id: "look-04",
    lookNumber: "LOOK 04",
    title: "Layla Embroidered Cuff",
    price: "₹6,299",
    image: "/images/categories/party.jpg",
    slug: "layla-embroidered-cuff",
    tagline: "Architectural Drape",
  },
  {
    id: "look-05",
    lookNumber: "LOOK 05",
    title: "Ayra Satin Overcoat",
    price: "₹4,799",
    image: "/images/navbar/editorial.jpg",
    slug: "ayra-satin-overcoat",
    tagline: "Pure Fluidity",
  },
  {
    id: "look-06",
    lookNumber: "LOOK 06",
    title: "Maryam Velvet Open Abaya",
    price: "₹5,899",
    image: "/images/hero/hero-3.jpg",
    slug: "maryam-velvet-open-abaya",
    tagline: "Midnight Heritage",
  },
];

interface RunwaySectionProps {
  looks?: RunwayLook[];
  showPrice?: boolean;
}

export default function RunwaySection({
  looks = defaultRunwayLooks,
  showPrice = false, // Set to false per design request: "remove the cost add to bag section just add phrases and include good abaya pictures"
}: RunwaySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = looks.length;

  const updateIndexFromScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const scrollFraction = scrollLeft / (scrollWidth - clientWidth || 1);
    const index = Math.min(
      total - 1,
      Math.max(0, Math.round(scrollFraction * (total - 1)))
    );
    setCurrentIndex(index);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateIndexFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateIndexFromScroll);
  }, [total]);

  const scrollToLook = (index: number) => {
    if (!scrollRef.current) return;
    const targetIdx = Math.max(0, Math.min(total - 1, index));
    const cardWidth = 420 + 32; // card width + gap
    scrollRef.current.scrollTo({
      left: targetIdx * cardWidth,
      behavior: "smooth",
    });
    setCurrentIndex(targetIdx);
  };

  return (
    <section id="runway" className="relative w-full bg-[#FAF8F5] py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-14">
        {/* Header Bar */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#6B6659]">
              THE RUNWAY
            </p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-4xl font-normal tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
              Six looks, one season
            </h2>
          </div>

          {/* Progress Indicator + Nav Arrows */}
          <div className="flex items-center gap-6 self-start md:self-end">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm tracking-wider text-[#1A1A1A]">
                {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <div className="h-[2px] w-28 overflow-hidden rounded-full bg-[#E5E0D8]">
                <div
                  className="h-full bg-[#1A1A1A] transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / total) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToLook(currentIndex - 1)}
                disabled={currentIndex === 0}
                aria-label="Previous look"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D3CBC0] text-[#1A1A1A] transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scrollToLook(currentIndex + 1)}
                disabled={currentIndex === total - 1}
                aria-label="Next look"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D3CBC0] text-[#1A1A1A] transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Runway Track */}
        <div
          ref={scrollRef}
          className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {looks.map((look) => (
            <article
              key={look.id}
              className="group relative flex-none w-[320px] sm:w-[380px] lg:w-[420px] snap-start"
            >
              <Link href={`/customer/products/${look.slug}`} className="block">
                {/* 3:4 Luxury Editorial Card */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE8E1]">
                  <Image
                    src={look.image}
                    alt={look.title}
                    fill
                    sizes="(max-width: 768px) 320px, (max-width: 1200px) 380px, 420px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient shadow overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                  {/* Top tag / Wishlist */}
                  <div className="absolute left-6 right-6 top-6 flex items-center justify-between text-white/90">
                    <span className="font-mono text-xs uppercase tracking-[0.3em]">
                      {look.lookNumber}
                    </span>
                    <span className="rounded-full bg-white/10 p-2 backdrop-blur-md transition group-hover:bg-white/20">
                      <Heart size={14} className="text-white" />
                    </span>
                  </div>

                  {/* Bottom Editorial Captions */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    {look.tagline && (
                      <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                        {look.tagline}
                      </p>
                    )}
                    <h3 className="mt-1 font-[var(--font-playfair)] text-2xl font-normal leading-tight text-white sm:text-3xl">
                      {look.title}
                    </h3>

                    {showPrice && look.price && (
                      <p className="mt-2 text-sm font-medium tracking-wider text-neutral-300">
                        {look.price}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span>Explore Look</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
