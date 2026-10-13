"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrub } from "@/hooks/useScrub";

const PARALLAX_IMAGE = "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/landingpage";

const testimonials = [
  { q: "The drape is unlike anything I have owned. I get asked about my abaya everywhere I go.", n: "Aisha R.", c: "Mumbai" },
  { q: "Finally an abaya that feels luxurious and quiet. The stitching and fabric are impeccable.", n: "Meher K.", c: "Hyderabad" },
  { q: "Ordered for Eid and wore it for weeks after. It travelled beautifully and arrived beautifully packed.", n: "Sana F.", c: "Dubai" },
];

export default function EditorialParallax() {
  const [ref, p] = useScrub("pass");
  const [t, setT] = useState(0);

  return (
    <>
      <section ref={ref} className="relative h-[780px] max-h-[92vh] overflow-hidden bg-black">
        <div
          className="absolute inset-0 h-full w-full"
          style={{ transform: `translateY(${(p - 0.5) * 160}px) scale(1.18)` }}
        >
          <Image
            src={PARALLAX_IMAGE}
            alt="Effortless pieces for the rhythm of everyday life"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-white/85">
            COLLECTION 03 · EVERYDAY, ELEVATED
          </p>
          <h2 className="mt-6 max-w-4xl font-[var(--font-playfair)] text-[clamp(2.5rem,6vw,5.25rem)] font-normal leading-[1.08] tracking-tight">
            Effortless pieces for the rhythm of everyday life.
          </h2>
          <Link
            href="/customer/products"
            className="mt-10 rounded-full border border-white/70 px-9 py-3.5 text-sm font-medium tracking-[0.05em] transition-all hover:bg-white hover:text-black"
          >
            View the Collection
          </Link>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-[#f7f5f0] px-6 py-28 text-center lg:py-40">
        <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#8f8a80]">Our Story</p>
        <h2 className="mx-auto mt-8 max-w-4xl font-[var(--font-playfair)] text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.2] tracking-[-0.01em] text-[#1a1a1a]">
          Zubayda <em className="font-normal italic">By A3</em> — A reflection of who you are.
        </h2>
        <div className="mx-auto mt-16 grid max-w-4xl gap-px border-y border-[#d3cbc0] bg-[#d3cbc0] sm:grid-cols-3">
          {[
            "Rooted in modesty. Defined by individuality.",
            "Tradition, interpreted through a modern lens.",
            "For every version of you.",
          ].map((s) => (
            <p key={s} className="bg-[#f7f5f0] px-6 py-10 font-[var(--font-playfair)] text-lg leading-[1.5] text-[#1a1a1a]">
              {s}
            </p>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#faf8f5] py-28 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="block font-[var(--font-playfair)] text-[120px] leading-[0.8] text-[#d4af37]" aria-hidden>
            &ldquo;
          </span>
          <blockquote key={t} className="mt-6 font-[var(--font-playfair)] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.4] text-[#1a1a1a]">
            {testimonials[t].q}
          </blockquote>
          <p className="mt-8 text-[12px] font-medium uppercase tracking-[0.25em] text-[#8f8a80]">
            {testimonials[t].n} — {testimonials[t].c}
          </p>
          <div className="mt-10 flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setT(i)}
                className={`h-2 rounded-full transition-all ${
                  i === t ? "w-8 bg-black" : "w-2 bg-[#d3cbc0] hover:bg-[#8f8a80]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}