"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useScrub, clamp } from "@/hooks/useScrub";

const HERO_IMAGE =
    "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/landingpage";

const heroReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const heroRevealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function EditorialHero() {
  const [ref, progress] = useScrub("sticky");
  const fade = clamp(1 - progress * 2.5);

  return (
      <section
          ref={ref}
          className="relative h-[160vh] md:h-[200vh]"
      >
        <div className="sticky top-0 h-[100svh] min-h-[500px] overflow-hidden bg-black md:h-screen md:min-h-[560px]">
          {/* Background image */}
          <div
              className="absolute inset-0"
              style={{
                transform:
                    typeof window !== "undefined" &&
                    window.matchMedia("(max-width: 767px)").matches
                        ? "none"
                        : `scale(${1 + progress * 0.1})`,
                willChange: "transform",
              }}
          >
            <img
                src={HERO_IMAGE}
                alt="Zubayda By A3 Haute Abaya Collection"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Hero content */}
          <motion.div
              className="relative flex h-full flex-col items-center justify-center px-5 text-center text-white sm:px-6"
              variants={heroReveal}
              initial="hidden"
              animate="visible"
          >
            <motion.p
                variants={heroRevealItem}
                className="mb-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 sm:mb-8 sm:text-[12px] sm:tracking-[0.25em]"
                style={{ opacity: fade }}
            >
              Zubayda By A3 · The Collection
            </motion.p>

            <motion.h1
                variants={heroRevealItem}
                className="font-[var(--font-playfair)] text-[clamp(3.25rem,12vw,11rem)] font-semibold leading-[0.95] tracking-[-0.02em]"
            >
                        <span
                            className="block"
                            style={{
                              transform:
                                  typeof window !== "undefined" &&
                                  window.matchMedia("(max-width: 767px)").matches
                                      ? "none"
                                      : `translateY(${-progress * 60}px)`,
                              opacity: 1 - progress * 0.5,
                            }}
                        >
                            Modesty,
                        </span>

              <span
                  className="block font-normal italic"
                  style={{
                    transform:
                        typeof window !== "undefined" &&
                        window.matchMedia("(max-width: 767px)").matches
                            ? "none"
                            : `translateY(${progress * 60}px)`,
                    opacity: 1 - progress * 0.5,
                  }}
              >
                            Refined.
                        </span>
            </motion.h1>

            <motion.p
                variants={heroRevealItem}
                className="mt-6 max-w-md text-[13px] leading-[1.8] text-white/90 sm:mt-8 sm:text-[15px]"
                style={{ opacity: fade }}
            >
              Discover thoughtfully selected abayas where timeless
              elegance meets modern simplicity.
            </motion.p>

            <motion.a
                variants={heroRevealItem}
                href="#collections"
                className="mt-7 rounded-full border border-white/70 px-7 py-3.5 text-sm font-medium tracking-[0.05em] transition-colors hover:bg-white hover:text-black sm:mt-8 sm:px-8 sm:py-4"
                style={{
                  opacity: fade,
                  pointerEvents: fade < 0.2 ? "none" : "auto",
                }}
            >
              Explore the Collection
            </motion.a>

            <motion.div
                variants={heroRevealItem}
                className="absolute bottom-6 sm:bottom-8"
                style={{ opacity: fade }}
            >
              <div className="flex flex-col items-center gap-3">
                            <span className="text-[10px] uppercase tracking-[0.3em] sm:text-[11px]">
                                Scroll
                            </span>
                <span className="h-8 w-px bg-white/60 sm:h-10" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
  );
}