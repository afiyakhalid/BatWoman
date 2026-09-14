"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/hooks/useProducts";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    const {
        data: products = [],
        isLoading,
        isError,
    } = useProducts({}, "name");

    const filteredProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return [];
        }

        return products.filter((product) =>
            product.name.toLowerCase().includes(normalizedQuery)
        );
    }, [products, query]);

    return (
        <section className="mx-auto min-h-screen max-w-7xl px-6 pt-32 pb-20">
            <h1 className="text-4xl font-semibold">Search Products</h1>

            <div className="mt-8">
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by product name..."
                    className="w-full rounded-md border border-neutral-300 px-4 py-3 text-base outline-none focus:border-black"
                />
            </div>

            {isLoading && (
                <p className="mt-8 text-neutral-600">Loading products...</p>
            )}

            {isError && (
                <p className="mt-8 text-red-600">Unable to load products.</p>
            )}

            {!isLoading && !isError && query.trim().length === 0 && (
                <p className="mt-8 text-neutral-600">
                    Type a product name to see matching results.
                </p>
            )}

            {!isLoading &&
                !isError &&
                query.trim().length > 0 &&
                filteredProducts.length === 0 && (
                    <p className="mt-8 text-neutral-600">No products found.</p>
                )}

            {!isLoading && !isError && filteredProducts.length > 0 && (
                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}