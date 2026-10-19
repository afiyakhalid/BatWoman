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
    <div className="sticky top-32 bg-[#faf9f7] p-8 sm:p-10 border border-neutral-200/80">
      <h2 className="font-[var(--font-playfair)] italic text-2xl text-neutral-900 pb-6 border-b border-neutral-200">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4 text-xs tracking-wider uppercase text-neutral-600">
        <div className="flex justify-between items-baseline">
          <span>Subtotal</span>
          <span className="font-medium text-black">
            Rs. {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-baseline">
          <span>Shipping</span>
          <span className="font-medium text-black">
            {shipping === 0 ? "Complimentary" : `Rs. ${shipping.toLocaleString()}`}
          </span>
        </div>

        <div className="pt-2 text-[11px] font-light text-neutral-400 lowercase first-letter:uppercase tracking-normal">
          Tax calculated at checkout.
        </div>

        <div className="border-t border-neutral-200 pt-6 flex justify-between items-baseline text-black">
          <span className="font-[var(--font-playfair)] italic text-xl normal-case">
            Total
          </span>
          <span className="font-[var(--font-playfair)] text-xl tracking-wide font-normal">
            Rs. {total.toLocaleString()}
          </span>
        </div>
      </div>

      <button
        onClick={() => router.push("/customer/address")}
        className="mt-8 w-full bg-black py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition-all duration-300 hover:bg-neutral-800 active:scale-[0.99] rounded-none cursor-pointer"
      >
        Checkout
      </button>

      <p className="mt-4 text-center text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-light">
        Complimentary express delivery & 14-day returns
      </p>
    </div>
  );
}