"use client";

import Link from "next/link";

export default function EmptyCart() {

    return (

        <div className="flex flex-col items-center py-32">

            <h2 className="font-[var(--font-playfair)] text-4xl">

                Your cart is empty

            </h2>

            <p className="mt-4 text-neutral-500">

                Continue shopping to add your favorite abayas.

            </p>

            <Link

                href="/customer/products"

                className="
                    mt-10
                    bg-black
                    px-8
                    py-4
                    text-white
                    transition
                    hover:bg-neutral-800
                "

            >

                Continue Shopping

            </Link>

        </div>

    );

}