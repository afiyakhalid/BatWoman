"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F6F2]">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-stone-300 blur-3xl" />
        <div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-neutral-200 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[65vh] max-w-7xl items-center px-6 pt-36 pb-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-xs uppercase tracking-[0.45em] text-neutral-500 font-medium"
          >
            GET IN TOUCH
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-[var(--font-playfair)] text-6xl leading-tight text-neutral-900 md:text-7xl"
          >
            We'd love
            <br />
            to hear from you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600 font-light"
          >
            Whether you have questions about sizing, your order, or our
            collections, our team is here to assist you. We aim to respond
            within one business day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center gap-8"
          >
            {/* Luxury Text Link CTA */}
            <Link
              href="/customer/products"
              className="group inline-flex items-center gap-3 border-b border-neutral-900 pb-1 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 transition hover:text-neutral-500 hover:border-neutral-500"
            >
              <span>Continue Shopping</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>

            <div className="hidden sm:block h-px w-16 bg-neutral-300" />

            <span className="text-xs uppercase tracking-[0.35em] text-neutral-400 font-medium">
              Premium Support
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}