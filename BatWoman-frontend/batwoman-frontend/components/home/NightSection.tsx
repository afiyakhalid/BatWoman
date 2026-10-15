"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useScrub, mix } from "@/hooks/useScrub";

const couture = [
  {
    cat: "الحَيَاءُ وَالوِقَار",
    name: "Elegance, in Every Layer.",
    note: "Crafted with reverence for timeless modesty. Flowing silhouettes tailored to honor your grace in every room you enter.",
    url: "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img1",
  },
  {
    cat: "السَّكِينَةُ وَالجَمَال",
    name: "A Quiet Kind of Luxury.",
    note: "Heavy Japanese crepe with fluid drapes. Abayas designed for women whose dignity and faith are their greatest adornment.",
    url: "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img5",
  },
  {
    cat: "الأَصَالَةُ وَالتُّرَاث",
    name: "Rooted in Faith & Memory.",
    note: "Pure Korean Nida silk with meticulous embroidery. Honoring the legacy of Hazrat Zubayda bint Ja'far (RA) in every stitch.",
    url: "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img6",
  },
  {
    cat: "البَسَاطَةُ وَالنَّقَاء",
    name: "The Beauty of Simplicity.",
    note: "Timeless black abayas designed to transcend trends. Pure modesty, crafted for the rhythm of daily prayer and purpose.",
    url: "https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/img7",
  },
];

export default function NightSection() {
  const [ref, p] = useScrub("sticky");
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      style={{
        backgroundColor: mix([247, 245, 240], [0, 0, 0], p), // Scrubbed color shift into deep obsidian
        color: mix([17, 17, 17], [255, 255, 255], p),
      }}
    >
      {/* Scroll-scrubbed Portal Entrance */}
      <div ref={ref} className="relative h-[200vh]">
        <motion.div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>

          {/* 1. Large Traditional Arabic Calligraphy */}
          <motion.p
            lang="ar"
            dir="rtl"
            className="text-3xl font-normal tracking-wide sm:text-4xl md:text-5xl"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }}
            style={{
              fontFamily: "'Amiri', 'Noto Naskh Arabic', 'Scheherazade New', serif",
              color: mix([140, 109, 79], [212, 175, 55], p),
            }}
          >
            الحَيَاءُ زِينَةُ المَرْأَةِ
          </motion.p>

          {/* 2. Gold Overline Tag */}
          <motion.p variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }} className="mt-4 text-[11px] font-medium uppercase tracking-[0.4em] text-[#C5A059]">
            ✦ The Nobility of Haya ✦
          </motion.p>

          {/* 3. Main Headline */}
          <motion.h2 variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } }} className="mt-6 font-[var(--font-playfair)] text-[clamp(2.75rem,8.5vw,7rem)] font-semibold leading-[1.08] tracking-tight">
            Draped in Modesty, <br />
            <em className="font-normal italic">Crowned in Dignity.</em>
          </motion.h2>

          {/* 4. Expanding Gold Accent Line */}
          <span
            className="mt-8 block h-px w-44 origin-center bg-[#d4af37]"
            style={{ transform: `scaleX(${p})` }}
          />

          {/* 5. Islamic Modesty Quote */}
          <motion.p variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }} className="mt-6 max-w-xl text-[16px] font-normal leading-[1.9] opacity-85 font-[var(--font-playfair)] italic">
            &ldquo;Modesty is not about hiding who you are; it is about crowning your presence with quiet faith, dignity, and timeless grace.&rdquo;
          </motion.p>
        </motion.div>
      </div>

      {/* Pinned Asymmetric Split Showcase */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-32 md:px-12 lg:grid-cols-[620fr_700fr] lg:gap-20">

        {/* LEFT COLUMN: Pinned Sticky Image Box */}
        <div className="hidden lg:block">
          <div className="sticky top-28 h-[calc(100vh-8rem)] max-h-[860px] overflow-hidden rounded-xl bg-[#1a1a1a] shadow-2xl">
            {couture.map((c, i) => (
              <div
                key={c.name}
                className={`absolute inset-0 h-full w-full transition-opacity duration-[900ms] ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={c.url}
                  alt={c.name}
                  fill
                  sizes="620px"
                  className="object-cover"
                />
              </div>
            ))}
            <span className="absolute bottom-6 left-6 font-mono text-[12px] tracking-[0.25em] text-white/90">
              {String(active + 1).padStart(2, "0")} / {String(couture.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Editorial Cards */}
        <div>
          {couture.map((c, i) => (
            <div
              key={c.name}
              data-i={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="flex min-h-[90vh] flex-col justify-center gap-8 py-12"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#1a1a1a] lg:hidden">
                <Image
                  src={c.url}
                  alt={c.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#d4af37]">
                  {c.cat}
                </p>
                <h3 className="mt-5 font-[var(--font-playfair)] text-4xl font-medium leading-[1.2] md:text-5xl">
                  {c.name}
                </h3>
                <p className="mt-6 max-w-md text-base leading-[1.8] opacity-75">
                  {c.note}
                </p>
                <Link
                  href="/customer/products"
                  className="mt-8 inline-block text-sm font-medium underline decoration-[#d4af37] underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Find Your Abaya →
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
