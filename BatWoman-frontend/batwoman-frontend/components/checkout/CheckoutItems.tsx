"use client";

import Image from "next/image";

import {
    CartItem,
} from "@/types/cart";

interface CheckoutItemsProps {
    items: CartItem[];
}

export default function CheckoutItems({
                                          items,
                                      }: CheckoutItemsProps) {

    return (

        <section className="rounded-2xl border border-neutral-200 bg-white p-8">

            <div className="mb-10">

                <h2 className="text-3xl font-[var(--font-playfair)]">
                    Order Items
                </h2>

                <p className="mt-2 text-neutral-500">
                    Review the items in your order before proceeding to payment.
                </p>

            </div>

            <div className="space-y-8">

                {items.map(
                    (item) => (

                        <div
                            key={
                                item.cartItemId
                            }
                            className="flex items-start justify-between border-b border-neutral-200 pb-8 last:border-b-0 last:pb-0"
                        >

                            <div className="flex gap-6">

                                <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden rounded-lg border bg-neutral-100">

                                    {item.image ? (

                                        <Image
                                            src={
                                                item.image
                                            }
                                            alt={
                                                item.productName
                                            }
                                            fill
                                            className="object-cover"
                                        />

                                    ) : (

                                        <div className="flex h-full w-full items-center justify-center px-2 text-center text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                                            No Image
                                        </div>

                                    )}

                                </div>

                                <div>

                                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">

                                        {
                                            item.categoryName
                                        }

                                    </p>

                                    <h3 className="mt-2 text-2xl">

                                        {
                                            item.productName
                                        }

                                    </h3>

                                    <div className="mt-3 space-y-1 text-sm text-neutral-500">

                                        <p>
                                            Color:{" "}
                                            <span className="text-neutral-800">
                                                {
                                                    item.color
                                                }
                                            </span>
                                        </p>

                                        <p>
                                            Size:{" "}
                                            <span className="text-neutral-800">
                                                {
                                                    item.size
                                                }
                                            </span>
                                        </p>

                                        <p>
                                            SKU:{" "}
                                            <span className="text-neutral-800">
                                                {
                                                    item.sku
                                                }
                                            </span>
                                        </p>

                                    </div>

                                    <p className="mt-4 text-neutral-500">
                                        Quantity
                                    </p>

                                    <p className="font-medium">
                                        {
                                            item.quantity
                                        }
                                    </p>

                                </div>

                            </div>

                            <div className="ml-6 text-right">

                                <p className="text-neutral-500">
                                    Price
                                </p>

                                <p className="mt-2 text-2xl font-semibold">
                                    ₹
                                    {
                                        item.subtotal
                                    }
                                </p>

                            </div>

                        </div>

                    )
                )}

            </div>

        </section>

    );

}