"use client";

interface EmptyAddressProps {
  onAdd: () => void;
}

export default function EmptyAddress({ onAdd }: EmptyAddressProps) {
  return (
    <div className="border border-neutral-200/80 p-10 sm:p-14 text-center bg-[#faf9f7]/40 rounded-none">
      <h3 className="font-[var(--font-playfair)] italic text-2xl sm:text-3xl font-normal text-neutral-900">
        No Address Found
      </h3>

      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-neutral-400 font-light max-w-sm mx-auto">
        Please add a shipping address to complete your delivery and proceed to checkout.
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-8 bg-black px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition hover:bg-neutral-800 rounded-none cursor-pointer"
      >
        + Add Shipping Address
      </button>
    </div>
  );
}