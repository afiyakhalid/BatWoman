"use client";

import { useRouter } from "next/navigation";

interface CartSummaryProps {

    subtotal: number;

    shipping: number;

    total: number;

}

export default function CartSummary({

    subtotal,

    shipping,

    total,

}: CartSummaryProps) {

    const router = useRouter();

    return (

        <div className="sticky top-32 border border-neutral-200 p-8">

            <h2 className="font-[var(--font-playfair)] text-3xl">
                Order Summary
            </h2>

            <div className="mt-10 space-y-6">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>

                    <span>
                        {shipping === 0
                            ? "FREE"
                            : `₹${shipping}`}
                    </span>

                </div>

                <div className="border-t pt-6 text-xl font-semibold flex justify-between">

                    <span>Total</span>

                    <span>₹{total}</span>

                </div>

            </div>

            <button

                onClick={() =>
                    router.push("/customer/address")
                }

                className="
                    mt-10
                    w-full
                    bg-black
                    py-5
                    text-lg
                    text-white
                    transition
                    hover:bg-neutral-800
                "

            >

                Proceed to Checkout

            </button>

        </div>

    );

}