"use client";

import Image from "next/image";
import Link from "next/link";
import { promotion } from "./bannerData";
import { motion } from "framer-motion";

export default function PromotionalBanner() {
  return (
    <section className="bg-[#faf8f5] py-28">

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >

          <div className="relative h-[550px] w-full">

            <Image
              src={promotion.image}
              alt={promotion.title}
              fill
              sizes="(max-width:768px)100vw,50vw"
              className="object-cover"
            />

          </div>

        </motion.div>

        {/* TEXT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >

          <p className="mb-5 text-sm uppercase tracking-[0.45em] text-neutral-500">
            Limited Time
          </p>

          <h2 className="font-[var(--font-playfair)] text-7xl leading-none text-black">
            {promotion.offer}
          </h2>

          <h3 className="mt-8 font-[var(--font-playfair)] text-5xl leading-tight">
            {promotion.title}
          </h3>

          <p className="mt-4 text-xl text-neutral-700">
            {promotion.subtitle}
          </p>

          <p className="mt-8 leading-8 text-neutral-600">
            {promotion.description}
          </p>

        <Link
  href={promotion.buttonLink}
  className="mt-12 inline-flex items-center justify-center rounded-full bg-black px-8 py-4 font-medium tracking-wide text-white transition-all duration-300 hover:scale-105 hover:bg-neutral-800"
>
  <span className="text-white">{promotion.buttonText}</span>
</Link>

        </motion.div>

      </div>

    </section>
  );
}