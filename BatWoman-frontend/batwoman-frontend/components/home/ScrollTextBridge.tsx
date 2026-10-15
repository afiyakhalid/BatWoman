"use client";

import { useScrub } from "@/hooks/useScrub";

export default function ScrollTextBridge() {
  const [ref, progress] = useScrub("sticky");

  return (
    <section
      ref={ref}
      aria-label="From intention to elegance"
      className="relative h-[220vh] overflow-clip bg-black text-white"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <h2
          className="w-max whitespace-nowrap font-[var(--font-playfair)] text-[clamp(4rem,14vw,13rem)] font-normal leading-none tracking-[-0.045em] will-change-transform"
          style={{ transform: `translate3d(calc(100vw - ${progress * 380}vw), 0, 0)` }}
        >
          <span>From intention</span>
          <span className="mx-[0.16em] font-light" aria-hidden="true">→</span>
          <span>To elegance.</span>
        </h2>
      </div>
    </section>
  );
}
