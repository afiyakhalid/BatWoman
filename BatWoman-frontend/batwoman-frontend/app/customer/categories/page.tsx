"use client";

import Link from "next/link";

import { useCategories } from "@/hooks/useCategories";

export default function CategoriesPage() {

    const {
        data: categories = [],
        isLoading,
    } = useCategories();

    if (isLoading) {
        return (
            <div className="mx-auto max-w-7xl px-6 py-20">
                <p>Loading categories...</p>
            </div>
        );
    }

    return (

        <main className="mx-auto max-w-7xl px-6 py-16">

            <h1 className="font-[var(--font-playfair)] text-5xl">
                Categories
            </h1>

            <p className="mt-4 text-neutral-500">
                Browse all our collections.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {categories.map((category) => (

                    <Link
                        key={category.id}
                        href="#"
                        className="rounded-2xl border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
                    >

                        <h2 className="font-[var(--font-playfair)] text-3xl">

                            {category.name}

                        </h2>

                        <p className="mt-3 text-neutral-600">

                            {category.description}

                        </p>

                    </Link>

                ))}

            </div>

        </main>

    );

}