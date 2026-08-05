import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import FaqSection from "@/components/contact/FaqSection";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="bg-white">

            {/* Hero */}

            <ContactHero />

            {/* Contact Form */}

            <section className="py-24">

                <ContactForm />

            </section>

            {/* FAQ */}

            <section className="py-20">

                <FaqSection />

            </section>

            {/* CTA */}

            <section className="bg-black py-28 text-white">

                <div className="mx-auto max-w-5xl px-6 text-center">

                    <p className="text-xs uppercase tracking-[0.45em] text-neutral-400">

                        Discover BatWoman

                    </p>

                    <h2 className="mt-6 font-[var(--font-playfair)] text-5xl leading-tight md:text-6xl">

                        Timeless elegance,
                        <br />
                        crafted for every occasion.

                    </h2>

                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-300">

                        Explore our carefully curated collection of
                        luxury abayas designed with premium fabrics,
                        refined craftsmanship, and modern sophistication.

                    </p>

                    <Link
                        href="/customer/products"
                        className="group mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] transition hover:text-neutral-400"
                    >

                        Explore Collection

                        <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />

                    </Link>

                </div>

            </section>

        </main>
    );
}