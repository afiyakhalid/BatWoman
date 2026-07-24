"use client";

import { ShieldCheck } from "lucide-react";

export default function PaymentMethod() {

    return (

        <section className="rounded-2xl border border-neutral-200 bg-white p-8">

            <div className="mb-8">

                <h2 className="text-3xl font-[var(--font-playfair)]">
                    Payment Method
                </h2>

                <p className="mt-2 text-neutral-500">
                    Secure online payment powered by Razorpay.
                </p>

            </div>

            <div className="flex items-start gap-5 rounded-xl border border-black p-5">

                <div className="mt-1">

                    <input
                        type="radio"
                        checked
                        readOnly
                        className="h-5 w-5"
                    />

                </div>

                <div className="flex-1">

                    <div className="flex items-center gap-2">

                        <h3 className="text-lg font-semibold">
                            Razorpay
                        </h3>

                        <ShieldCheck
                            className="text-green-600"
                            size={18}
                        />

                    </div>

                    <p className="mt-2 text-sm text-neutral-500">

                        Pay securely using

                        <span className="font-medium text-black">
                            {" "}UPI
                        </span>,

                        <span className="font-medium text-black">
                            {" "}Credit/Debit Cards
                        </span>,

                        <span className="font-medium text-black">
                            {" "}Net Banking
                        </span>,

                        <span className="font-medium text-black">
                            {" "}Wallets
                        </span>

                    </p>

                    <p className="mt-4 text-sm text-green-600">

                        Your payment information is securely processed by Razorpay.

                    </p>

                </div>

            </div>

        </section>

    );

}