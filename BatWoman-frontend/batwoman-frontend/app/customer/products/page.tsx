"use client";

import { useState } from "react";

import ProductHeader from "@/components/product/ProductHeader";
import ProductSidebar from "@/components/product/ProductSidebar";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer/Footer";

import { ProductFilters } from "@/services/product.service";
import { ProductSortOption } from "@/types/product";

export default function ProductsPage() {

    const [filters, setFilters] =
        useState<ProductFilters>({});

    const [sortBy, setSortBy] =
        useState<ProductSortOption>("price-low");

    return (
        <>
            <section className="mx-auto max-w-7xl px-6 pt-32 pb-20">

                <ProductHeader
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />

                <div className="mt-12 flex gap-12">

                    <ProductSidebar
                        filters={filters}
                        onFiltersChange={setFilters}
                    />

                    <ProductGrid
                        filters={filters}
                        sortBy={sortBy}
                    />

                </div>

            </section>

            <Footer />
        </>
    );
}