"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { CartItem } from "@/types/cart";

interface CheckoutSummaryProps {
  items?: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onPlaceOrder: () => void;
  isLoading?: boolean;
}

export default function CheckoutSummary({
  items = [],
  subtotal,
  shipping,
  total,
  onPlaceOrder,
  isLoading,
}: CheckoutSummaryProps) {
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) return;
    setDiscountApplied(true);
  };

  return (
    <aside className="sticky top-28 bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_8px_30px_rgba(45,31,26,0.06)] rounded-none">
      {/* Title */}
      <div className="pb-5 border-b border-[#eee8e0]">
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-1">
          Final Breakdown
        </span>
        <h2 className="font-[var(--font-playfair)] text-2xl font-normal text-neutral-900">
          Order Summary
        </h2>
      </div>

      {/* Mini Items Preview (matching Image 1 reference) */}
      {items.length > 0 && (
        <div className="py-5 space-y-4 border-b border-[#eee8e0] max-h-60 overflow-y-auto no-scrollbar">
          {items.map((item) => (
            <div key={item.cartItemId} className="flex items-center gap-4">
              {/* Thumbnail with Quantity Pill (matches Image 1) */}
              <div className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden bg-[#faf8f5] border border-[#e7e1d8]">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="60px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[8px] uppercase text-neutral-400">
                    No img
                  </div>
                )}
                {/* Quantity Pill Badge on bottom-right */}
                <span className="absolute bottom-0 right-0 bg-black text-white text-[9px] font-medium px-1.5 py-0.5 leading-none">
                  {item.quantity}
                </span>
              </div>

              {/* Title & Qty */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs uppercase tracking-[0.12em] font-medium text-neutral-900 truncate">
                  {item.productName}
                </h4>
                <p className="text-[11px] text-neutral-400 tracking-wider mt-0.5">
                  Qty {item.quantity} • {item.size}
                </p>
              </div>

              {/* Price */}
              <div className="text-right">
                <span className="text-xs font-light text-neutral-900">
                  Rs. {item.subtotal.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gift or Discount Code (matching Image 1 reference) */}
      <div className="pt-5 pb-5 border-b border-[#eee8e0]">
        <label className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#8C6D4F] block mb-2">
          Gift or Discount Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Gift or Discount Code"
            className="flex-1 bg-[#faf8f5] border border-[#dcd6cd] text-base sm:text-xs px-3.5 py-2.5 rounded-none focus:border-black focus:bg-white focus:outline-none tracking-wider text-neutral-900 transition-colors"
          />
          <button
            type="button"
            onClick={handleApplyDiscount}
            className="border border-[#cfc6ba] bg-white px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-800 hover:border-black hover:text-black transition cursor-pointer"
          >
            Apply
          </button>
        </div>
        {discountApplied && (
          <p className="mt-2 text-[11px] text-neutral-500 font-light">
            No active discount code matching &quot;{discountCode}&quot;.
          </p>
        )}
      </div>

      {/* Financial Breakdown */}
      <div className="pt-5 pb-6 space-y-3.5 text-xs tracking-wider uppercase text-neutral-600">
        <div className="flex justify-between items-baseline">
          <span>Subtotal</span>
          <span className="font-medium text-neutral-900">
            Rs. {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-baseline">
          <span>Tax</span>
          <span className="font-light text-neutral-400">Rs. 0.00</span>
        </div>

        <div className="flex justify-between items-baseline">
          <span>Shipping</span>
          <span className="font-medium text-[#6b5541]">
            {shipping === 0 ? "Complimentary" : `Rs. ${shipping.toLocaleString()}`}
          </span>
        </div>

        <div className="border-t border-[#eee8e0] pt-5 flex justify-between items-baseline text-black">
          <span className="font-[var(--font-playfair)] italic text-xl normal-case">
            Total
          </span>
          <span className="font-[var(--font-playfair)] text-2xl font-normal tracking-wide">
            Rs. {total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Place Order Primary Action Button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={onPlaceOrder}
        className="w-full bg-black py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition-all duration-300 hover:bg-neutral-800 active:scale-[0.99] rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span>{isLoading ? "Processing Order..." : "Place Order & Pay"}</span>
        {!isLoading && <ArrowRight size={14} />}
      </button>

      {/* Trust SSL Badge (exact match to Image 1 reference) */}
      <div className="mt-5 pt-4 border-t border-[#eee8e0] flex items-center justify-center gap-2 text-neutral-500">
        <ShieldCheck size={14} strokeWidth={1.8} className="text-[#8C6D4F]" />
        <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#8C6D4F]">
          Secure SSL Checkout
        </span>
      </div>
    </aside>
  );
}