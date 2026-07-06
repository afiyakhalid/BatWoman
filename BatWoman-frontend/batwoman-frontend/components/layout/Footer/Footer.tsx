"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
} from "react-icons/fa";

import {
  companyLinks,
  shopLinks,
  supportLinks,
} from "./footerData";

export default function Footer() {
  return (
    <footer className="mt-32 border-t bg-[#faf8f5]">

      <div className="mx-auto max-w-7xl px-6">

        {/* Newsletter */}

        <section className="border-b py-20 text-center">

          <p className="uppercase tracking-[0.45em] text-sm text-neutral-500">
            Newsletter
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-5xl">
            Stay Inspired
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-neutral-600">
            Be the first to discover new collections,
            exclusive offers and timeless luxury.
          </p>

          <form className="mx-auto mt-12 flex max-w-xl flex-col gap-4 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-b border-black bg-transparent py-4 outline-none"
            />

            <button
              className="rounded-full bg-black px-8 py-4 text-white transition duration-300 hover:bg-neutral-800"
            >
              Subscribe
            </button>

          </form>

        </section>

        {/* Links */}

        <section className="grid gap-16 py-20 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand */}

          <div>

            <h2 className="font-[var(--font-playfair)] text-5xl tracking-[0.2em]">
              BATWOMAN
            </h2>

            <p className="mt-8 max-w-md leading-8 text-neutral-600">
              Premium abayas designed for women who embrace
              elegance, confidence and timeless sophistication.
            </p>

            <div className="mt-10 space-y-4 text-neutral-700">

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                Bangalore, Karnataka
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                support@batwoman.com
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                +91 98765 43210
              </div>

            </div>

          </div>

          {/* Shop */}

          <div>

            <h3 className="mb-8 uppercase tracking-[0.3em]">
              Shop
            </h3>

            <div className="space-y-5">

              {shopLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block transition hover:text-black text-neutral-600"
                >
                  {link.title}
                </Link>
              ))}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-8 uppercase tracking-[0.3em]">
              Company
            </h3>

            <div className="space-y-5">

              {companyLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block transition hover:text-black text-neutral-600"
                >
                  {link.title}
                </Link>
              ))}

            </div>

          </div>

          {/* Support */}

          <div>

            <h3 className="mb-8 uppercase tracking-[0.3em]">
              Support
            </h3>

            <div className="space-y-5">

              {supportLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block transition hover:text-black text-neutral-600"
                >
                  {link.title}
                </Link>
              ))}

            </div>

          </div>

        </section>

        {/* Bottom */}

        <section className="flex flex-col items-center justify-between gap-8 border-t py-8 md:flex-row">

          <p className="text-neutral-500">
            © {new Date().getFullYear()} BATWOMAN. All Rights Reserved.
          </p>

          <div className="flex gap-6">

           <FaInstagram
  size={20}
  className="cursor-pointer transition hover:scale-110"
/>

<FaFacebookF
  size={20}
  className="cursor-pointer transition hover:scale-110"
/>

<FaPinterestP
  size={20}
  className="cursor-pointer transition hover:scale-110"
/>

          </div>

        </section>

      </div>

    </footer>
  );
}