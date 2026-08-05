"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContactInfo() {
    return (
        <section className="border-y border-neutral-200 py-28">

            <div className="mx-auto max-w-7xl px-8 lg:px-12">

                <div className="grid gap-20 lg:grid-cols-2">

                    <div>

                        <p className="text-xs uppercase tracking-[0.45em] text-neutral-400">

                            Contact Details

                        </p>

                        <h2 className="mt-6 font-[var(--font-playfair)] text-5xl">

                            Visit or reach us.

                        </h2>

                    </div>

                    <div className="space-y-12">

                        <div>

                            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">

                                Boutique

                            </p>

                            <p className="mt-3 text-xl leading-9">

                                Bengaluru,
                                <br />
                                Karnataka,
                                <br />
                                India

                            </p>

                        </div>

                        <div className="h-px bg-neutral-200" />

                        <div>

                            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">

                                Email

                            </p>

                            <p className="mt-3 text-xl">

                                support@batwoman.com

                            </p>

                        </div>

                        <div className="h-px bg-neutral-200" />

                        <div>

                            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">

                                Phone

                            </p>

                            <p className="mt-3 text-xl">

                                +91 XXXXX XXXXX

                            </p>

                        </div>

                        <div className="h-px bg-neutral-200" />

                        <div>

                            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">

                                Business Hours

                            </p>

                            <p className="mt-3 text-xl leading-9">

                                Monday — Saturday
                                <br />
                                10:00 AM — 7:00 PM

                            </p>

                        </div>

                        <div className="pt-8">

                            <Link
                                href="#"
                                className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.35em]"
                            >

                                WhatsApp Us

                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-2"
                                />

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}