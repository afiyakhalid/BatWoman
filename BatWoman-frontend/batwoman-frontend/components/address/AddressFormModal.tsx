"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Address,
  CreateAddressRequest,
} from "@/services/address.service";

import {
  useCreateAddress,
  useUpdateAddress,
} from "@/hooks/useAddresses";

interface AddressFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address?: Address | null;
}

const initialForm: CreateAddressRequest = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "India",
  postalCode: "",
  defaultAddress: false,
};

export default function AddressFormModal({
  open,
  onOpenChange,
  address,
}: AddressFormModalProps) {
  const [form, setForm] = useState<CreateAddressRequest>(initialForm);

  const createMutation = useCreateAddress();
  const updateMutation = useUpdateAddress();

  useEffect(() => {
    if (address) {
      setForm({
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
        defaultAddress: address.defaultAddress,
      });
    } else {
      setForm(initialForm);
    }
  }, [address, open]);

  function updateField(
    key: keyof CreateAddressRequest,
    value: string | boolean
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    try {
      if (address) {
        await updateMutation.mutateAsync({
          addressId: address.id,
          request: form,
        });
      } else {
        await createMutation.mutateAsync(form);
      }
      onOpenChange(false);
    } catch {
      // Handled in hook
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto rounded-none border border-[#e7e1d8] bg-white p-6 sm:p-10 shadow-[0_20px_50px_rgba(45,31,26,0.12)]">
        <DialogHeader className="pb-4 border-b border-[#eee8e0]">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-medium block mb-1">
            Delivery Profile
          </span>
          <DialogTitle className="font-[var(--font-playfair)] italic text-2xl sm:text-3xl font-normal text-neutral-900 tracking-normal">
            {address ? "Edit Shipping Address" : "New Shipping Address"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 pt-3">
          <div>
            <Label className="text-[11px] uppercase tracking-[0.18em] font-medium text-neutral-600 mb-1.5 block">
              Full Name
            </Label>
            <input
              type="text"
              value={form.fullName}
              placeholder="e.g. Kathryn Murphy"
              onChange={(e) => updateField("fullName", e.target.value)}
              className="w-full rounded-none border border-[#e2dcd2] bg-[#fdfcfb] px-3.5 py-3 text-base sm:text-xs tracking-wider text-neutral-900 transition-colors focus:bg-white focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <Label className="text-[11px] uppercase tracking-[0.18em] font-medium text-neutral-600 mb-1.5 block">
              Phone Number
            </Label>
            <input
              type="tel"
              value={form.phone}
              placeholder="e.g. +91 98765 43210"
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full rounded-none border border-[#e2dcd2] bg-[#fdfcfb] px-3.5 py-3 text-base sm:text-xs tracking-wider text-neutral-900 transition-colors focus:bg-white focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <Label className="text-[11px] uppercase tracking-[0.18em] font-medium text-neutral-600 mb-1.5 block">
              Address Line 1
            </Label>
            <input
              type="text"
              value={form.addressLine1}
              placeholder="Street address, building or suite"
              onChange={(e) => updateField("addressLine1", e.target.value)}
              className="w-full rounded-none border border-[#e2dcd2] bg-[#fdfcfb] px-3.5 py-3 text-base sm:text-xs tracking-wider text-neutral-900 transition-colors focus:bg-white focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <Label className="text-[11px] uppercase tracking-[0.18em] font-medium text-neutral-600 mb-1.5 block">
              Address Line 2 (Optional)
            </Label>
            <input
              type="text"
              value={form.addressLine2}
              placeholder="Landmark or apartment number"
              onChange={(e) => updateField("addressLine2", e.target.value)}
              className="w-full rounded-none border border-[#e2dcd2] bg-[#fdfcfb] px-3.5 py-3 text-base sm:text-xs tracking-wider text-neutral-900 transition-colors focus:bg-white focus:border-black focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-[11px] uppercase tracking-[0.18em] font-medium text-neutral-600 mb-1.5 block">
                City
              </Label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="w-full rounded-none border border-[#e2dcd2] bg-[#fdfcfb] px-3.5 py-3 text-base sm:text-xs tracking-wider text-neutral-900 transition-colors focus:bg-white focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <Label className="text-[11px] uppercase tracking-[0.18em] font-medium text-neutral-600 mb-1.5 block">
                State
              </Label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                className="w-full rounded-none border border-[#e2dcd2] bg-[#fdfcfb] px-3.5 py-3 text-base sm:text-xs tracking-wider text-neutral-900 transition-colors focus:bg-white focus:border-black focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-[11px] uppercase tracking-[0.18em] font-medium text-neutral-600 mb-1.5 block">
                Postal Code
              </Label>
              <input
                type="text"
                value={form.postalCode}
                onChange={(e) => updateField("postalCode", e.target.value)}
                className="w-full rounded-none border border-[#e2dcd2] bg-[#fdfcfb] px-3.5 py-3 text-base sm:text-xs tracking-wider text-neutral-900 transition-colors focus:bg-white focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <Label className="text-[11px] uppercase tracking-[0.18em] font-medium text-neutral-600 mb-1.5 block">
                Country
              </Label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => updateField("country", e.target.value)}
                className="w-full rounded-none border border-[#e2dcd2] bg-[#fdfcfb] px-3.5 py-3 text-base sm:text-xs tracking-wider text-neutral-900 transition-colors focus:bg-white focus:border-black focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Checkbox
              id="modalDefaultAddress"
              checked={form.defaultAddress}
              onCheckedChange={(value) =>
                updateField("defaultAddress", Boolean(value))
              }
              className="rounded-none border-[#cfc6ba] data-[state=checked]:bg-black data-[state=checked]:border-black"
            />
            <label
              htmlFor="modalDefaultAddress"
              className="text-xs uppercase tracking-[0.14em] text-neutral-700 cursor-pointer select-none"
            >
              Set as default delivery address
            </label>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                createMutation.isPending ||
                updateMutation.isPending ||
                !form.fullName ||
                !form.phone ||
                !form.addressLine1 ||
                !form.city ||
                !form.state ||
                !form.postalCode
              }
              className="w-full bg-black py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition-all hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-none cursor-pointer active:scale-[0.99]"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : address
                ? "Update Address"
                : "Save Address"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}