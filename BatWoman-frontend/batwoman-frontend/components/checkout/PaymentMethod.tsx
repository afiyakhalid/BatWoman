"use client";

import { CreditCard, Lock, ShieldCheck } from "lucide-react";

export default function PaymentMethod() {
  return (
    <section className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
      {/* Header */}
      <div className="pb-5 border-b border-[#eee8e0] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4eee6] text-[#6b5541]">
            <CreditCard size={14} strokeWidth={1.8} />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block">
              Step 03
            </span>
            <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-900">
              Payment Method
            </h2>
          </div>
        </div>

        <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D4F] font-medium hidden sm:inline-block">
          Encrypted
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {/* Selected Payment Option Card */}
        <div className="border-2 border-black bg-[#fbfaf8] p-5 sm:p-6 rounded-none flex items-start gap-4 shadow-[0_2px_15px_rgba(44,36,32,0.04)]">
          <div className="mt-1">
            <div className="h-5 w-5 rounded-full border-2 border-black flex items-center justify-center bg-white">
              <div className="h-2.5 w-2.5 rounded-full bg-black" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-[0.18em] font-semibold text-black">
                Online Payment via Razorpay
              </span>

              {/* Payment Pill Badges */}
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 bg-[#f3ece2] text-[#6b5541] text-[9px] uppercase tracking-wider font-medium">
                  UPI
                </span>
                <span className="px-2 py-0.5 bg-[#f3ece2] text-[#6b5541] text-[9px] uppercase tracking-wider font-medium">
                  Cards
                </span>
                <span className="px-2 py-0.5 bg-[#f3ece2] text-[#6b5541] text-[9px] uppercase tracking-wider font-medium">
                  NetBanking
                </span>
              </div>
            </div>

            <p className="mt-2.5 text-xs text-neutral-600 font-light leading-relaxed">
              Pay securely using <strong className="font-medium text-black">UPI (Google Pay, PhonePe, Paytm)</strong>, credit/debit cards, or net banking. You will be redirected to the secure Razorpay payment gateway upon confirmation.
            </p>

            <div className="mt-4 pt-3.5 border-t border-[#eee8e0] flex items-center justify-between text-[11px] text-neutral-500 font-light">
              <div className="flex items-center gap-2">
                <Lock size={12} strokeWidth={1.5} className="text-[#8C6D4F]" />
                <span>256-Bit Bank Grade SSL Encryption</span>
              </div>
              <ShieldCheck size={16} className="text-[#6b5541]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}