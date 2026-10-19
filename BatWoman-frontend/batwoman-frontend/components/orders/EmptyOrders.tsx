import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyOrders() {
  return (
    <div className="bg-white border border-[#e7e1d8] p-12 sm:p-20 text-center shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none max-w-2xl mx-auto">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4eee6] text-[#6b5541]">
        <ShoppingBag size={22} strokeWidth={1.5} />
      </div>

      <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-2">
        Client History
      </span>

      <h2 className="font-[var(--font-playfair)] italic text-3xl sm:text-4xl font-normal text-neutral-900">
        No Orders Yet
      </h2>

      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
        Once you complete an acquisition, your order details, receipts, and live tracking will appear here.
      </p>

      <Link
        href="/customer/products"
        className="mt-8 inline-block bg-black px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition hover:bg-neutral-800 rounded-none shadow-sm"
      >
        Discover Collection
      </Link>
    </div>
  );
}