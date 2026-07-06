"use client";

import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "./heroData";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  };

  const previousSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  const slide = heroSlides[current];

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background */}

      <AnimatePresence mode="wait">

        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />
        </motion.div>

      </AnimatePresence>

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}

      <div className="relative z-20 flex h-full items-center">

        <div className="mx-auto flex w-full max-w-7xl px-6">

          <AnimatePresence mode="wait">

            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >

              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-neutral-300">
                Luxury Collection
              </p>

              <h1 className="mb-6 font-[var(--font-playfair)] text-5xl font-semibold leading-tight md:text-6xl xl:text-7xl">
                {slide.title}
              </h1>

              <p className="mb-10 max-w-xl text-lg leading-8 text-neutral-200">
                {slide.subtitle}
              </p>
<Link
  href={slide.buttonLink}
  className="
    mt-10
    inline-flex
    items-center
    justify-center
    rounded-full
    bg-black
    px-8
    py-4
    font-medium
    tracking-wide
    text-white
    transition-all
    duration-300
    hover:bg-neutral-800
    hover:scale-105
  "
>
  {slide.buttonText}
</Link>

            </motion.div>

          </AnimatePresence>

        </div>

      </div>

      {/* Left Arrow */}

      <button
        onClick={previousSlide}
        className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur transition hover:bg-white/40"
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* Right Arrow */}

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur transition hover:bg-white/40"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Dots */}

      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-3">

        {heroSlides.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              current === index
                ? "bg-white"
                : "bg-white/40"
            }`}
          />

        ))}

      </div>

    </section>
  );
}