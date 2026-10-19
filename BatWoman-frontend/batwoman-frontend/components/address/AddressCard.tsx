"use client";

import { Address } from "@/services/address.service";
import { Pencil, Check } from "lucide-react";

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
        relative cursor-pointer transition-all duration-300 rounded-none p-6 sm:p-7
        ${
          selected
            ? "border-2 border-black bg-[#fbfaf8] shadow-[0_4px_25px_rgba(44,36,32,0.06)] ring-1 ring-black/5"
            : "border border-[#e7e1d8] bg-white hover:border-[#b8aba0] hover:shadow-[0_4px_20px_rgba(44,36,32,0.03)]"
        }
      `}
    >
      {/* Top Bar: Radio/Selection status + Address Tag + Edit */}
      <div className="flex items-center justify-between pb-4 border-b border-[#eee8e0]">
        <div className="flex items-center gap-3">
          {/* Custom Luxury Radio Indicator */}
          <div
            className={`
              flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-200
              ${
                selected
                  ? "border-black bg-black text-white"
                  : "border-[#cfc6ba] bg-white group-hover:border-black"
              }
            `}
          >
            {selected && <Check size={11} strokeWidth={3} />}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.18em] font-medium text-neutral-900">
              {address.defaultAddress ? "Default Address" : "Saved Address"}
            </span>

            {selected && (
              <span className="hidden sm:inline-block px-2 py-0.5 bg-[#f3ece2] text-[#6b5541] text-[9px] uppercase tracking-[0.2em] font-medium">
                Active
              </span>
            )}
          </div>
        </div>

        {/* Edit Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-black underline underline-offset-4 transition cursor-pointer flex items-center gap-1.5 py-1 px-1.5"
          aria-label="Edit address"
        >
          <Pencil size={12} strokeWidth={1.5} />
          <span>Edit</span>
        </button>
      </div>

      {/* Address Details with Editorial Hierarchy */}
      <div className="pt-4 sm:pt-5 space-y-1.5">
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
    </div>
  );
}