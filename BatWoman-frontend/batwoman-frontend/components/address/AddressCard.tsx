"use client";

import { Address } from "@/services/address.service";
import { Pencil } from "lucide-react";

interface AddressCardProps {
  address: Address;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

export default function AddressCard({
  address,
  selected,
  onSelect,
  onEdit,
}: AddressCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        relative cursor-pointer border p-6 sm:p-7 transition-all duration-200 rounded-none
        ${
          selected
            ? "border-black ring-1 ring-black bg-[#faf9f7]/50"
            : "border-neutral-200 bg-white hover:border-neutral-400"
        }
      `}
    >
      {/* Top row: Radio + Label + Edit button */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          {/* Custom Minimalist Radio Indicator */}
          <div
            className={`
              flex h-4 w-4 items-center justify-center rounded-full border transition-colors
              ${selected ? "border-black bg-white" : "border-neutral-300"}
            `}
          >
            {selected && <div className="h-2 w-2 rounded-full bg-black" />}
          </div>

          <span className="text-xs uppercase tracking-[0.18em] font-medium text-neutral-900">
            {address.defaultAddress ? "Default Shipping Address" : "Saved Address"}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-[11px] uppercase tracking-[0.16em] text-neutral-500 hover:text-black underline underline-offset-4 transition cursor-pointer flex items-center gap-1.5"
          aria-label="Edit address"
        >
          <Pencil size={12} strokeWidth={1.5} />
          <span>Edit</span>
        </button>
      </div>

      {/* Address details */}
      <div className="pt-4 space-y-1.5">
        <h3 className="text-sm uppercase tracking-[0.14em] font-medium text-neutral-900">
          {address.fullName}
        </h3>

        <p className="text-xs text-neutral-500 tracking-wider">
          {address.phone}
        </p>

        <p className="text-xs text-neutral-700 tracking-wide font-light pt-1 leading-relaxed">
          {address.addressLine1}
          {address.addressLine2 ? `, ${address.addressLine2}` : ""}
        </p>

        <p className="text-xs text-neutral-700 tracking-wide font-light">
          {address.city}, {address.state} — {address.postalCode}
        </p>

        <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-light">
          {address.country}
        </p>
      </div>
    </div>
  );
}