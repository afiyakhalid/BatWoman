"use client";

import { ProductDetail } from "@/types/product-detail";

interface ProductInfoProps {

    product: ProductDetail;

}

export default function ProductInfo({

    product,

}: ProductInfoProps) {

    return (

        <div>

            <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">

                {product.fabric}

            </p>

            <h1 className="mt-4 font-[var(--font-playfair)] text-5xl">

                {product.name}

            </h1>

            <div className="mt-8 flex items-center gap-4">

                {product.discountPrice ? (

                    <>

                        <span className="text-3xl font-semibold">

                            ₹{product.discountPrice}

                        </span>

                        <span className="text-xl text-neutral-400 line-through">

                            ₹{product.price}

                        </span>

                    </>

                ) : (

                    <span className="text-3xl font-semibold">

                        ₹{product.price}

                    </span>

                )}

            </div>

            <p className="mt-8 leading-8 text-neutral-600">

                {product.description}

            </p>

            <div className="mt-10 space-y-3">

                <p>

                    <span className="font-medium">
                        Fabric:
                    </span>{" "}
                    {product.fabric}
                </p>

                <p>

                    <span className="font-medium">
                        Color:
                    </span>{" "}
                    {product.color}
                </p>

                <p>

                    <span className="font-medium">
                        Size:
                    </span>{" "}
                    {product.size}
                </p>

                <p>

                    <span className="font-medium">
                        Available:
                    </span>{" "}
                    {product.availableQuantity}

                </p>

            </div>

            <div className="mt-12 flex gap-4">

                <button
                    className="
                    flex-1
                    bg-black
                    py-4
                    text-white
                    transition
                    hover:bg-neutral-800
                    "
                >
                    Add to Cart
                </button>

                <button
                    className="
                    flex-1
                    border
                    border-black
                    py-4
                    transition
                    hover:bg-black
                    hover:text-white
                    "
                >
                    Buy Now
                </button>

            </div>

        </div>

    );

}