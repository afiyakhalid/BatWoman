"use client";

import { Package, TrendingUp } from "lucide-react";

import {
    TopProductAnalytics,
} from "@/services/adminDashboard.service";

interface TopProductsCardProps {
    products: TopProductAnalytics[];
}

export default function TopProductsCard({
                                            products,
                                        }: TopProductsCardProps) {
    return (
        <section className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-7">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C]">
                    <TrendingUp size={22} strokeWidth={1.6} />
                </div>

                <div>
                    <h2 className="font-[var(--font-playfair)] text-2xl text-[#3D3028] sm:text-3xl">
                        Top Selling Products
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#8A7A6C]">
                        Best performing products based on units sold.
                    </p>
                </div>
            </div>

            <div className="mt-7 space-y-3">
                {products.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#E5DCCE] bg-[#FAF7F2] px-5 py-12 text-center">
                        <Package
                            size={27}
                            strokeWidth={1.5}
                            className="mx-auto text-[#B49A73]"
                        />

                        <p className="mt-3 text-sm font-medium text-[#59483A]">
                            No products found
                        </p>

                        <p className="mt-1 text-xs text-[#9A8B7B]">
                            Product performance will appear here when available.
                        </p>
                    </div>
                ) : (
                    products.map((product, index) => (
                        <div
                            key={product.productId}
                            className="flex items-center justify-between gap-3 rounded-xl border border-[#EAE3D8] bg-white p-4 transition-colors duration-200 hover:border-[#D9C6A5] hover:bg-[#FAF7F2] sm:gap-4 sm:p-5"
                        >
                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C]">
                                    <Package
                                        size={19}
                                        strokeWidth={1.6}
                                    />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="break-words text-sm font-semibold leading-6 text-[#3D3028] sm:text-base">
                                        <span className="mr-1.5 text-[#B49A73]">
                                            {index + 1}.
                                        </span>
                                        {product.productName}
                                    </h3>

                                    <p className="mt-1 text-xs text-[#9A8B7B]">
                                        Product ID: {product.productId}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 text-right">
                                <p className="text-xl font-semibold tabular-nums text-[#3D3028] sm:text-2xl">
                                    {product.unitsSold.toLocaleString("en-IN")}
                                </p>

                                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#8A7A6C] sm:text-xs">
                                    Units Sold
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}