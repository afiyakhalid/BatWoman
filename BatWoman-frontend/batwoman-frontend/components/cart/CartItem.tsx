"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

import {
    CartItem as CartItemType,
} from "@/types/cart";

import QuantitySelector from "./QuantitySelector";

interface CartItemProps {

    item: CartItemType;

    onIncrease: () => void;

    onDecrease: () => void;

    onRemove: () => void;

}

export default function CartItem({

                                     item,

                                     onIncrease,

                                     onDecrease,

                                     onRemove,

                                 }: CartItemProps) {

    return (

        <div className="flex gap-8 border-b border-neutral-200 py-8">

            {/* Product Image */}

            <div className="relative h-44 w-32 flex-shrink-0 overflow-hidden bg-neutral-100">

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

                    <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs uppercase tracking-[0.15em] text-neutral-400">
                        No Image
                    </div>

                )}

            </div>

            {/* Product Details */}

            <div className="flex flex-1 flex-col justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">

                        {
                            item.categoryName
                        }

                    </p>

                    <h2 className="mt-2 font-[var(--font-playfair)] text-2xl">

                        {
                            item.productName
                        }

                    </h2>

                    {/* Variant Information */}

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

                    <p className="mt-4 text-xl font-medium">

                        ₹
                        {
                            item.price
                        }

                    </p>

                </div>

                <div className="mt-8 flex items-end justify-between">

                    <QuantitySelector

                        quantity={
                            item.quantity
                        }

                        onIncrease={
                            onIncrease
                        }

                        onDecrease={
                            onDecrease
                        }

                    />

                    <div className="flex items-center gap-8">

                        <p className="text-lg font-semibold">

                            ₹
                            {
                                item.subtotal
                            }

                        </p>

                        <button

                            type="button"

                            onClick={
                                onRemove
                            }

                            className="text-neutral-500 transition hover:text-red-600"

                            aria-label={
                                `Remove ${item.productName} from cart`
                            }

                        >

                            <Trash2
                                size={20}
                            />

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}