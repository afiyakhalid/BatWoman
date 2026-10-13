"use client";

import { useEffect, useRef, useState } from "react";
import EditorialHero from "@/components/home/EditorialHero";
import EditorialTicker from "@/components/home/EditorialTicker";
import EditorialRunway from "@/components/home/EditorialRunway";
import NightSection from "@/components/home/NightSection";
import EditorialParallax from "@/components/home/EditorialParallax";
import CurtainFooter from "@/components/home/CurtainFooter";

export default function Home() {
  const footerRef = useRef<HTMLElement>(null);
  const [fh, setFh] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setFh(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#111]">
      {/*
        Main Content Area
        Lifts smoothly like a stage curtain over the fixed bottom footer
      */}
      <div
        id="top"
        className="relative z-10 bg-[#f7f5f0] shadow-[0_-20px_40px_rgba(0,0,0,0.08)] lg:mb-[var(--fh)]"
        style={{ "--fh": `${fh}px` } as React.CSSProperties}
      >
        {/* 1. Pinned Zoom Hero */}
        <EditorialHero />

        {/* 2. Quiet Luxury Continuous Ticker */}
        <EditorialTicker />

        {/* 3. Pinned 3D Horizontal Runway ("Six looks, one season") */}
        <EditorialRunway />

        {/* 4. The Occasion Edit (Color Inversion Portal & Pinned Split Showcase) */}
        <NightSection />

        {/* 5. Full-Bleed Everyday Parallax */}
        <EditorialParallax />
      </div>

      {/* 6. Curtain-Revealed Dark Footer */}
      <CurtainFooter ref={footerRef} />
    </div>
  );
}