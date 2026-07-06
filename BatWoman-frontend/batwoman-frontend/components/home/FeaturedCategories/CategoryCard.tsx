"use client";

import Image from "next/image";
import Link from "next/link";
import { Category } from "./categoryData";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={category.href}
      className="group relative overflow-hidden rounded-3xl"
    >
      <div className="relative h-[500px] w-full overflow-hidden">

        <Image
  src={category.image}
  alt={category.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
  className="object-cover transition duration-700 group-hover:scale-110"
/>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-8 left-8 text-white">

          <h3 className="font-[var(--font-playfair)] text-4xl">
            {category.title}
          </h3>

          <p className="mt-3 text-neutral-200">
            {category.description}
          </p>

          <span className="mt-5 inline-block text-sm uppercase tracking-[0.3em]">
            Explore →
          </span>

        </div>

      </div>
    </Link>
  );
}