"use client";

import Image from "next/image";
import { useScrub, clamp } from "@/hooks/useScrub";

const HERO_IMAGE = "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/landingpage";

export default function EditorialHero() {
  const [ref, p] = useScrub("sticky");
  const fade = clamp(1 - p * 2.5);

  return (
    <div ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen min-h-[560px] overflow-hidden bg-black" style={{ perspective: "1200px" }}>
        <div
          className="absolute inset-0 h-full w-full will-change-transform"
          style={{
            transform: `scale(${1 + p * 0.16}) translateZ(${p * 30}px)`,
          }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Zubayda By A3 Haute Abaya Collection"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-8 text-[12px] font-medium uppercase tracking-[0.25em] text-white/80">
            <span style={{ opacity: fade }}>Zubayda By A3 · The Collection</span>
          </p>
          <h1 className="font-[var(--font-playfair)] text-[clamp(3.5rem,13vw,11rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
            <span
              className="block"
              style={{
                transform: `translateY(${-p * 90}px)`,
                letterSpacing: `${p * 0.08}em`,
                opacity: 1 - p * 0.5,
              }}
            >
              Modesty,
            </span>
            <span
              className="block font-normal italic"
              style={{
                transform: `translateY(${p * 90}px)`,
                letterSpacing: `${p * 0.08}em`,
                opacity: 1 - p * 0.5,
              }}
            >
              Refined.
            </span>
          </h1>
          <p className="mt-8 max-w-md text-[15px] leading-[1.8] text-white/90" style={{ opacity: fade }}>
            Discover thoughtfully selected abayas where timeless elegance meets modern simplicity.
          </p>
          <a
            href="#collections"
            className="mt-8 rounded-full border border-white/70 px-8 py-4 text-sm font-medium tracking-[0.05em] transition-all hover:bg-white hover:text-black"
            style={{ opacity: fade, pointerEvents: fade < 0.2 ? "none" : "auto" }}
          >
            Explore the Collection
          </a>
          <div className="absolute bottom-8 flex flex-col items-center gap-3" style={{ opacity: fade }}>
            <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
            <span className="h-10 w-px bg-white/60" />
          </div>
        </div>
      </div>
    </div>
  );
}