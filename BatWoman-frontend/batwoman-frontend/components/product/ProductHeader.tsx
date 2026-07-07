"use client";

import Breadcrumb from "./BreadCrumb";

export default function ProductHeader() {
  return (
    <section className="border-b border-neutral-200 pb-8">

      <Breadcrumb />

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        {/* LEFT */}

        <div>

          <h1 className="font-[var(--font-playfair)] text-4xl tracking-wide">
            Shop
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            Discover our curated collection of luxury abayas.
          </p>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          <span className="text-sm text-neutral-500">
            Sort by
          </span>

          <select
            className="
              rounded-none
              border
              border-neutral-300
              bg-white
              px-4
              py-2
              text-sm
              outline-none
              transition
              focus:border-black
            "
          >
            <option>Featured</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Name: A-Z</option>
          </select>

        </div>

      </div>

    </section>
  );
}