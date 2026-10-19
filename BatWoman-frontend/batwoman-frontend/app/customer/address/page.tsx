"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

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
      <section className="mx-auto max-w-4xl px-6 pt-36 pb-24 text-center">
        <h1 className="font-[var(--font-playfair)] italic text-3xl sm:text-4xl text-neutral-800">
          Loading your saved addresses...
        </h1>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-4xl px-6 pt-36 pb-24 text-center">
        <h1 className="font-[var(--font-playfair)] italic text-3xl sm:text-4xl text-neutral-900">
          Shipping Address
        </h1>
        <p className="mt-4 text-xs uppercase tracking-wider text-red-600">
          Failed to load addresses. Please try again.
        </p>
      </section>
    );
  }

  return (
    <>
      <AddressFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        address={editingAddress}
      />

      <section className="mx-auto max-w-4xl px-6 sm:px-10 pt-28 sm:pt-36 pb-28">
        {/* =========================================================
            TOP ROW: BACK BUTTON
        ========================================================== */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.push("/customer/cart")}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-black transition cursor-pointer"
            aria-label="Back to cart"
          >
            <ArrowLeft size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Cart</span>
          </button>
        </div>

        {/* =========================================================
            STEP 1: SHIPPING (ACTIVE STEP)
        ========================================================== */}
        <div className="pb-12">
          <div className="mb-8 pb-4 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl font-normal text-neutral-900 tracking-normal">
              1. Shipping
            </h1>
            <p className="text-xs uppercase tracking-[0.16em] text-neutral-400 font-light">
              Select or manage delivery address
            </p>
          </div>

          {addresses.length === 0 ? (
            <EmptyAddress onAdd={openCreateModal} />
          ) : (
            <div className="space-y-8">
              {/* Address List */}
              <AddressList
                addresses={addresses}
                selectedId={selectedAddress}
                onSelect={setSelectedAddress}
                onEdit={openEditModal}
              />

              {/* Confirmation Checkbox (matching reference layout) */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setIsConfirmed(!isConfirmed)}
                    className={`
                      flex h-4 w-4 shrink-0 items-center justify-center border transition-colors rounded-none
                      ${isConfirmed ? "border-black bg-black text-white" : "border-neutral-300 bg-white"}
                    `}
                  >
                    {isConfirmed && <Check size={11} strokeWidth={2.5} />}
                  </div>
                  <span className="text-xs tracking-wide text-neutral-700">
                    I hereby confirm that all my information is correct.
                  </span>
                </label>
              </div>

              {/* Action Buttons: Add Address + Continue */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-neutral-200/80">
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="border border-neutral-300 bg-white px-6 py-4 text-xs uppercase tracking-[0.2em] font-medium text-neutral-900 transition hover:border-black rounded-none cursor-pointer text-center"
                >
                  + Add New Address
                </button>

                <button
                  type="button"
                  onClick={continueCheckout}
                  disabled={!selectedAddress || !isConfirmed}
                  className="bg-black px-10 py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-none cursor-pointer text-center active:scale-[0.99]"
                >
                  Continue to Checkout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================
            STEP 2: PAYMENT (INACTIVE ACCORDION / STEP)
        ========================================================== */}
        <div className="pt-8 pb-8 border-t border-neutral-200">
          <div className="flex items-center justify-between text-neutral-300 select-none">
            <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-normal">
              2. Payment
            </h2>
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-300 font-light">
              Step 2
            </span>
          </div>
        </div>

        {/* =========================================================
            STEP 3: ORDER REVIEW (INACTIVE ACCORDION / STEP)
        ========================================================== */}
        <div className="pt-8 pb-4 border-t border-neutral-200">
          <div className="flex items-center justify-between text-neutral-300 select-none">
            <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-normal">
              3. Order Review
            </h2>
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-300 font-light">
              Step 3
            </span>
          </div>
        </div>
      </section>
    </>
  );
}