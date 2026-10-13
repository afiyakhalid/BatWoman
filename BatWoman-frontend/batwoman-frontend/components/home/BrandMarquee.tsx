"use client";

import { motion } from "framer-motion";

interface BrandMarqueeProps {
  phrases?: string[];
}

const defaultPhrases = [
  "MODESTY, REFINED",
  "A QUIET KIND OF LUXURY",
  "ELEGANCE IN EVERY LAYER",
  "HANDCRAFTED SILHOUETTES",
  "TIMELESS DRAPES",
  "BATWOMAN ATELIER",
];

export default function BrandMarquee({ phrases = defaultPhrases }: BrandMarqueeProps) {
  const content = phrases.join("  —  ");

  return (
    <div className="relative w-full overflow-hidden border-y border-[#E8E4DC] bg-[#FAF8F5] py-4 text-[#1A1A1A]">
      <motion.div
        className="flex whitespace-nowrap text-xs uppercase tracking-[0.4em] font-medium"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
      >
        <span className="pr-12">{content}  —  {content}</span>
        <span className="pr-12">{content}  —  {content}</span>
      </motion.div>
    </div>
  );
}
