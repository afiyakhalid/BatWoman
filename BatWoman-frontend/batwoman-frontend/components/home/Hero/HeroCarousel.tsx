"use client";

import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "./heroData";

export default function HeroCarousel() {
  const slide = heroSlides[0];

  return (
    <section className="relative flex h-screen items-center">

      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-white">

        <h1 className="mb-6 max-w-xl text-6xl font-bold">
          {slide.title}
        </h1>

        <p className="mb-8 max-w-lg text-lg">
          {slide.subtitle}
        </p>

        <Link
          href={slide.href}
          className="rounded-full bg-white px-8 py-4 text-black transition hover:bg-neutral-200"
        >
          {slide.button}
        </Link>

      </div>

    </section>
  );
}