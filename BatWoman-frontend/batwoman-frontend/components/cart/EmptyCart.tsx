"use client";

import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <h2 className="font-[var(--font-playfair)] italic text-3xl sm:text-4xl text-neutral-900 font-normal">
        Your Shopping Bag is Empty
      </h2>

      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-neutral-400 font-light max-w-md">
        Explore modern modest silhouettes crafted with timeless elegance.
      </p>

      <Link
        href="/customer/products"
        className="mt-10 bg-black px-10 py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition hover:bg-neutral-800 rounded-none cursor-pointer"
      >
        Explore Collection
      </Link>
    </div>
  );
}