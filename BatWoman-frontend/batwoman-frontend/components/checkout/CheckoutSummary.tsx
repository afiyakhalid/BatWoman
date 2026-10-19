"use client";

import { useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
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
      <aside className="sticky top-28 rounded-none border border-[#e7e1d8] bg-white p-6 shadow-[0_8px_30px_rgba(45,31,26,0.06)] sm:p-8">
        {/* Title */}
        <div className="border-b border-[#eee8e0] pb-5">
        <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8C6D4F]">
          Final Breakdown
        </span>
          <h2 className="font-[var(--font-playfair)] text-2xl font-normal text-neutral-900">
            Order Summary
          </h2>
        </div>

        {/* Mini item previews */}
        {items.length > 0 && (
            <div className="no-scrollbar max-h-60 space-y-4 overflow-y-auto border-b border-[#eee8e0] py-5">
              {items.map((item) => (
                  <div key={item.cartItemId} className="flex items-center gap-4">
                    {/* Thumbnail: use the supplied URL directly */}
                    <div className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden border border-[#e7e1d8] bg-[#faf8f5]">
                      {item.image ? (
                          <img
                              src={item.image}
                              alt={item.productName}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover object-top"
                          />
                      ) : (
                          <div className="flex h-full w-full items-center justify-center text-[8px] uppercase text-neutral-400">
                            No img
                          </div>
                      )}

                      <span className="absolute bottom-0 right-0 bg-black px-1.5 py-0.5 text-[9px] font-medium leading-none text-white">
                  {item.quantity}
                </span>
                    </div>

                    {/* Product title and quantity */}
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-xs font-medium uppercase tracking-[0.12em] text-neutral-900">
                        {item.productName}
                      </h4>
                      <p className="mt-0.5 text-[11px] tracking-wider text-neutral-400">
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

        {/* Gift or discount code */}
        <div className="border-b border-[#eee8e0] pb-5 pt-5">
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8C6D4F]">
            Gift or Discount Code
          </label>

          <div className="flex gap-2">
            <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Gift or Discount Code"
                className="flex-1 rounded-none border border-[#dcd6cd] bg-[#faf8f5] px-3.5 py-2.5 text-base tracking-wider text-neutral-900 transition-colors focus:border-black focus:bg-white focus:outline-none sm:text-xs"
            />

            <button
                type="button"
                onClick={handleApplyDiscount}
                className="cursor-pointer border border-[#cfc6ba] bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-800 transition hover:border-black hover:text-black"
            >
              Apply
            </button>
          </div>

          {discountApplied && (
              <p className="mt-2 text-[11px] font-light text-neutral-500">
                No active discount code matching &quot;{discountCode}&quot;.
              </p>
          )}
        </div>

        {/* Financial breakdown */}
        <div className="space-y-3.5 pb-6 pt-5 text-xs uppercase tracking-wider text-neutral-600">
          <div className="flex items-baseline justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-neutral-900">
            Rs. {subtotal.toLocaleString()}
          </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span>Tax</span>
            <span className="font-light text-neutral-400">Rs. 0.00</span>
          </div>

          <div className="flex items-baseline justify-between">
            <span>Shipping</span>
            <span className="font-medium text-[#6b5541]">
            {shipping === 0
                ? "Complimentary"
                : `Rs. ${shipping.toLocaleString()}`}
          </span>
          </div>

          <div className="flex items-baseline justify-between border-t border-[#eee8e0] pt-5 text-black">
          <span className="font-[var(--font-playfair)] text-xl normal-case italic">
            Total
          </span>
            <span className="font-[var(--font-playfair)] text-2xl font-normal tracking-wide">
            Rs. {total.toLocaleString()}
          </span>
          </div>
        </div>

        {/* Place order */}
        <button
            type="button"
            disabled={isLoading}
            onClick={onPlaceOrder}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-none bg-black py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-neutral-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{isLoading ? "Processing Order..." : "Place Order & Pay"}</span>
          {!isLoading && <ArrowRight size={14} />}
        </button>

        {/* Secure checkout badge */}
        <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#eee8e0] pt-4 text-neutral-500">
          <ShieldCheck
              size={14}
              strokeWidth={1.8}
              className="text-[#8C6D4F]"
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8C6D4F]">
          Secure SSL Checkout
        </span>
        </div>
      </aside>
  );
}