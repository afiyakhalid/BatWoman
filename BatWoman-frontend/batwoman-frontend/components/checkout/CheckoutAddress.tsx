"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Address } from "@/services/address.service";

interface CheckoutAddressProps {
  address: Address;
}

export default function CheckoutAddress({ address }: CheckoutAddressProps) {
  return (
    <section className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
      <div className="flex items-center justify-between pb-5 border-b border-[#eee8e0]">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4eee6] text-[#6b5541]">
            <MapPin size={14} strokeWidth={1.8} />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block">
              Step 01
            </span>
            <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-900">
              Delivery Address
            </h2>
          </div>
        </div>

        <Link
          href="/customer/address"
          className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-neutral-600 hover:text-black transition py-1"
        >
          <span className="underline underline-offset-4">Change</span>
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="pt-5 space-y-1.5 text-neutral-800">
        <div className="flex items-baseline justify-between">
          <h3 className="font-[var(--font-playfair)] text-base sm:text-lg font-normal text-neutral-900 tracking-normal">
            {address.fullName}
          </h3>
          <span className="text-xs text-neutral-500 tracking-wider font-light">
            {address.phone}
          </span>
        </div>

        <p className="text-xs sm:text-[13px] text-neutral-700 tracking-wide font-light leading-relaxed pt-1">
          {address.addressLine1}
          {address.addressLine2 ? `, ${address.addressLine2}` : ""}
        </p>

        <p className="text-xs sm:text-[13px] text-neutral-600 tracking-wide font-light">
          {address.city}, {address.state} <span className="text-neutral-400">—</span> {address.postalCode}
        </p>

        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8C6D4F] font-medium pt-1">
          {address.country}
        </p>
      </div>
    </section>
  );
}