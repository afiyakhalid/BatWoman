"use client";

import { Button } from "@/components/ui/button";

interface CheckoutSummaryProps {

    subtotal: number;

    shipping: number;

    total: number;

    onPlaceOrder: () => void;

    isLoading?: boolean;

}

export default function CheckoutSummary({

    subtotal,

    shipping,

    total,

    onPlaceOrder,

    isLoading,

}: CheckoutSummaryProps) {

    return (

        <aside className="sticky top-28 rounded-2xl border border-neutral-200 bg-white p-8">

            <h2 className="text-3xl font-[var(--font-playfair)]">

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

                <div className="border-t pt-6">

                    <div className="flex justify-between text-xl font-semibold">

                        <span>Total</span>

                        <span>₹{total}</span>

                    </div>

                </div>

            </div>

            <Button

                className="mt-10 h-12 w-full"

                onClick={onPlaceOrder}

                disabled={isLoading}

            >

                {isLoading

                    ? "Creating Order..."

                    : "Place Order"}

            </Button>

        </aside>

    );

}