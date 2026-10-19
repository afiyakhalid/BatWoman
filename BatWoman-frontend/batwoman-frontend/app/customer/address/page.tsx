"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Lock, ChevronRight } from "lucide-react";

import AddressList from "@/components/address/AddressList";
import EmptyAddress from "@/components/address/EmptyAddress";
import AddressFormModal from "@/components/address/AddressFormModal";

import { Address } from "@/services/address.service";
import { useAddresses } from "@/hooks/useAddresses";

export default function AddressPage() {
  const router = useRouter();

  const {
    data: addresses = [],
    isLoading,
    isError,
  } = useAddresses();

  const [selectedAddress, setSelectedAddress] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(true);

  // Auto-select default or first address once data is loaded
  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.defaultAddress) ?? addresses[0];
      setSelectedAddress(defaultAddr.id);
    }
  }, [addresses, selectedAddress]);

  function openCreateModal() {
    setEditingAddress(null);
    setModalOpen(true);
  }

  function openEditModal(address: Address) {
    setEditingAddress(address);
    setModalOpen(true);
  }

  function continueCheckout() {
    if (!selectedAddress) {
      return;
    }
    router.push(`/customer/checkout?addressId=${selectedAddress}`);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center py-32 px-6">
        <p className="font-[var(--font-playfair)] italic text-2xl text-neutral-600">
          Preparing your delivery options...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center py-32 px-6 text-center">
        <h1 className="font-[var(--font-playfair)] italic text-3xl font-normal text-neutral-900">
          Shipping Address
        </h1>
        <p className="mt-3 text-xs uppercase tracking-wider text-red-600">
          Failed to load addresses. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 sm:py-20">
      <AddressFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        address={editingAddress}
      />

      <main className="mx-auto max-w-4xl px-4 sm:px-8">
        {/* =========================================================
            TOP NAVIGATION: BACK LINK & STEP PROGRESS BAR
        ========================================================== */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/customer/cart")}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6D4F] hover:text-black transition cursor-pointer"
            aria-label="Return to bag"
          >
            <ArrowLeft size={15} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
            <span>Return to Bag</span>
          </button>

          {/* Couture Step Indicators */}
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em]">
            <span className="font-semibold text-black border-b border-black pb-0.5">
              01 Shipping
            </span>
            <ChevronRight size={11} className="text-[#cfc6ba]" />
            <span className="text-[#a89f91]">02 Payment</span>
            <ChevronRight size={11} className="text-[#cfc6ba]" />
            <span className="text-[#a89f91]">03 Review</span>
          </div>
        </div>

        {/* =========================================================
            ACTIVE STEP 1: SHIPPING CONTAINER CARD
        ========================================================== */}
        <div className="bg-white border border-[#e7e1d8] p-6 sm:p-10 shadow-[0_4px_30px_rgba(45,31,26,0.04)] mb-6">
          <div className="mb-8 pb-5 border-b border-[#eee8e0] flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-1">
                Step 01 of 03
              </span>
              <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl font-normal text-neutral-900 tracking-normal">
                1. Shipping Address
              </h1>
            </div>

            <p className="text-xs uppercase tracking-[0.16em] text-neutral-400 font-light">
              Select or create delivery address
            </p>
          </div>

          {addresses.length === 0 ? (
            <EmptyAddress onAdd={openCreateModal} />
          ) : (
            <div className="space-y-7">
              {/* Address List */}
              <AddressList
                addresses={addresses}
                selectedId={selectedAddress}
                onSelect={setSelectedAddress}
                onEdit={openEditModal}
              />

              {/* Confirmation Checkbox (from reference screenshot) */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer select-none group">
                  <div
                    onClick={() => setIsConfirmed(!isConfirmed)}
                    className={`
                      flex h-4 w-4 shrink-0 items-center justify-center border transition-all rounded-none
                      ${
                        isConfirmed
                          ? "border-black bg-black text-white"
                          : "border-[#cfc6ba] bg-white group-hover:border-black"
                      }
                    `}
                  >
                    {isConfirmed && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="text-xs tracking-wide text-neutral-700">
                    I hereby confirm that all my delivery information is accurate.
                  </span>
                </label>
              </div>

              {/* Action Buttons: Add Address + Continue */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-[#eee8e0]">
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="border border-[#d6cec2] bg-white px-6 py-4 text-xs uppercase tracking-[0.2em] font-medium text-neutral-900 transition hover:border-black rounded-none cursor-pointer text-center"
                >
                  + Add New Address
                </button>

                <button
                  type="button"
                  onClick={continueCheckout}
                  disabled={!selectedAddress || !isConfirmed}
                  className="bg-black px-10 py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-none cursor-pointer text-center active:scale-[0.99] shadow-sm"
                >
                  Confirm & Continue
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================
            INACTIVE STEP 2: PAYMENT (SLEEK ACCORDION RIBBON)
        ========================================================== */}
        <div className="bg-white/70 border border-[#e8e2d8] p-5 sm:p-6 mb-4 flex items-center justify-between transition-opacity opacity-75 select-none">
          <div className="flex items-center gap-4">
            <span className="flex h-7 w-7 items-center justify-center border border-[#d6cec2] text-[11px] font-medium text-neutral-600">
              02
            </span>
            <div>
              <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-800">
                Payment Method
              </h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light hidden sm:block">
                Razorpay Secure Online Checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
            <Lock size={12} strokeWidth={1.5} />
            <span>Upcoming Step</span>
          </div>
        </div>

        {/* =========================================================
            INACTIVE STEP 3: ORDER REVIEW (SLEEK ACCORDION RIBBON)
        ========================================================== */}
        <div className="bg-white/70 border border-[#e8e2d8] p-5 sm:p-6 flex items-center justify-between transition-opacity opacity-75 select-none">
          <div className="flex items-center gap-4">
            <span className="flex h-7 w-7 items-center justify-center border border-[#d6cec2] text-[11px] font-medium text-neutral-600">
              03
            </span>
            <div>
              <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-800">
                Order Review
              </h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light hidden sm:block">
                Final Garment Summary & Confirmation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
            <Lock size={12} strokeWidth={1.5} />
            <span>Upcoming Step</span>
          </div>
        </div>
      </main>
    </div>
  );
}