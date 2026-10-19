"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";

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
    <aside className="sticky top-28 bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_8px_30px_rgba(45,31,26,0.06)] rounded-none">
      <div className="pb-5 border-b border-[#eee8e0]">
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-1">
          Estimate
        </span>
        <h2 className="font-[var(--font-playfair)] text-2xl font-normal text-neutral-900">
          Order Summary
        </h2>
      </div>

      <div className="mt-6 space-y-4 text-xs tracking-wider uppercase text-neutral-600">
        <div className="flex justify-between items-baseline">
          <span>Subtotal</span>
          <span className="font-medium text-neutral-900">
            Rs. {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-baseline">
          <span>Shipping</span>
          <span className="font-medium text-[#6b5541]">
            {shipping === 0 ? "Complimentary" : `Rs. ${shipping.toLocaleString()}`}
          </span>
        </div>

        <div className="pt-1 text-[11px] font-light text-neutral-400 lowercase first-letter:uppercase tracking-normal">
          Taxes and final delivery details calculated at checkout.
        </div>

        <div className="border-t border-[#eee8e0] pt-5 flex justify-between items-baseline text-black">
          <span className="font-[var(--font-playfair)] italic text-xl normal-case">
            Total
          </span>
          <span className="font-[var(--font-playfair)] text-2xl tracking-wide font-normal">
            Rs. {total.toLocaleString()}
          </span>
        </div>
      </div>

      <button
        onClick={() => router.push("/customer/address")}
        className="mt-8 w-full bg-black py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition-all duration-300 hover:bg-neutral-800 active:scale-[0.99] rounded-none cursor-pointer flex items-center justify-center gap-2"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight size={14} />
      </button>

      <div className="mt-5 pt-4 border-t border-[#eee8e0] flex items-center justify-center gap-2 text-[#8C6D4F]">
        <ShieldCheck size={14} strokeWidth={1.8} />
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
          Complimentary Delivery & Returns
        </span>
      </div>
    </aside>
  );
}