"use client";

import { Package } from "lucide-react";

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

        <div className="rounded-2xl border border-neutral-200 bg-white p-8">

            <h2 className="font-[var(--font-playfair)] text-3xl">

                Top Selling Products

            </h2>

            <p className="mt-2 text-neutral-500">

                Best performing products based on units sold.

            </p>

            <div className="mt-8 space-y-5">

                {products.length === 0 ? (

                    <p className="text-neutral-500">

                        No products found.

                    </p>

                ) : (

                    products.map((product, index) => (

                        <div

                            key={product.productId}

                            className="flex items-center justify-between rounded-xl border border-neutral-200 p-5"

                        >

                            <div className="flex items-center gap-4">

                                <div className="rounded-xl bg-neutral-100 p-3">

                                    <Package size={22} />

                                </div>

                                <div>

                                    <h3 className="font-semibold">

                                        {index + 1}. {product.productName}

                                    </h3>

                                    <p className="text-sm text-neutral-500">

                                        Product ID

                                    </p>

                                </div>

                            </div>

                            <div className="text-right">

                                <p className="text-xl font-bold">

                                    {product.unitsSold}

                                </p>

                                <p className="text-sm text-neutral-500">

                                    Units Sold

                                </p>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}