"use client";

import ProductCard from "./ProductCard";

import { useProducts } from "@/hooks/useProducts";
import { ProductFilters } from "@/services/product.service";
import { ProductSortOption } from "@/types/product";

interface ProductGridProps {
    filters: ProductFilters;
    sortBy: ProductSortOption;
}

export default function ProductGrid({
                                        filters,
                                        sortBy,
                                    }: ProductGridProps) {

    const {
        data: products,
        isLoading,
        isError,
    } = useProducts(
        filters,
        sortBy
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Unable to load products.</p>;
    }

    if (!products || products.length === 0) {
        return <p>No products found.</p>;
    }

    return (
        <section className="flex-1">

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">

                {products.map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        </section>
    );
}