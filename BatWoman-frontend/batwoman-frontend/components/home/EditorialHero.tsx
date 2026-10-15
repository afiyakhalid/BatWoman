"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useScrub, clamp } from "@/hooks/useScrub";

const HERO_IMAGE = "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/landingpage";



const heroReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
};

const heroRevealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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

        <motion.div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white" variants={heroReveal} initial="hidden" animate="visible">
          <motion.p variants={heroRevealItem} className="mb-8 text-[12px] font-medium uppercase tracking-[0.25em] text-white/80">
            <span style={{ opacity: fade }}>Zubayda By A3 · The Collection</span>
          </motion.p>
          <motion.h1 variants={heroRevealItem} className="font-[var(--font-playfair)] text-[clamp(3.5rem,13vw,11rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
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
          </motion.h1>
          <motion.p variants={heroRevealItem} className="mt-8 max-w-md text-[15px] leading-[1.8] text-white/90" style={{ opacity: fade }}>
            Discover thoughtfully selected abayas where timeless elegance meets modern simplicity.
          </motion.p>
          <motion.a variants={heroRevealItem}
            href="#collections"
            className="mt-8 rounded-full border border-white/70 px-8 py-4 text-sm font-medium tracking-[0.05em] transition-all hover:bg-white hover:text-black"
            style={{ pointerEvents: fade < 0.2 ? "none" : "auto" }}
          >
            <span style={{ opacity: fade }}>Explore the Collection</span>
          </motion.a>
          <motion.div variants={heroRevealItem} className="absolute bottom-8">
            <div className="flex flex-col items-center gap-3" style={{ opacity: fade }}>
              <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
              <span className="h-10 w-px bg-white/60" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
