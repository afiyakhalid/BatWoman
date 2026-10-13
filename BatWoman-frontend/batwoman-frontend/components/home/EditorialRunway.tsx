"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useScrub } from "@/hooks/useScrub";
import Card3D from "@/components/ui/Card3D";

const looks = [
  { name: "The Doorway Abaya", line: "Designed for understated elegance", url: "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img1" },
  { name: "Navy Over Beige", line: "Where modesty meets modernity", url: "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img5" },
  { name: "The Pair", line: "Timeless silhouettes. Considered details.", url: "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img6" },
  { name: "The Navy Overcoat", line: "Less, but more meaningful.", url: "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img7" },
  { name: "Noir, Everyday", line: "Everyday elegance, reimagined", url: "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img3" },
  { name: "Quiet Black", line: "An expression of effortless grace", url: "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img4" },
];

export default function EditorialRunway() {
  const [ref, p] = useScrub("sticky");
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (t) setShift(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={ref} id="collections" className="relative h-[300vh] bg-[#f7f5f0]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[72px]">
        <div className="mb-8 flex items-end justify-between gap-6 px-5 md:px-12">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#8f8a80]">THE RUNWAY</p>
            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold md:text-5xl text-[#1a1a1a]">
              Six looks, one season
            </h2>
            <p className="mt-3 text-[15px] text-[#6b6660]">Distinctive silhouettes, timeless appeal.</p>
          </div>
          <div className="hidden w-48 shrink-0 items-center gap-4 md:flex">
            <span className="text-[12px] tracking-[0.2em] text-[#8f8a80]">
              {String(Math.min(6, Math.floor(p * 6) + 1)).padStart(2, "0")}/06
            </span>
            <span className="h-px flex-1 bg-[#d3cbc0]">
              <span className="block h-px origin-left bg-black" style={{ transform: `scaleX(${p})` }} />
            </span>
          </div>
        </div>
        <div
          ref={trackRef}
          className="flex w-max gap-8 px-5 will-change-transform md:gap-12 md:px-12"
          style={{ transform: `translateX(${-p * shift}px)` }}
        >
          {looks.map((l, i) => (
            <article
              key={l.name}
              className="relative shrink-0"
              style={{ height: "min(62vh, 680px)", aspectRatio: "3/4" }}
            >
              <Card3D intensity={12} className="h-full w-full">
                <div className="relative h-full w-full overflow-hidden rounded-sm bg-[#faf8f5] shadow-lg">
                  <Image
                    src={l.url}
                    alt={l.name}
                    fill
                    sizes="(max-width: 768px) 320px, 420px"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 text-white">
                    <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-white/70">
                      Look {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-[var(--font-playfair)] text-2xl">{l.name}</h3>
                    <p className="mt-1 text-sm text-white/85">{l.line}</p>
                  </div>
                </div>
              </Card3D>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}