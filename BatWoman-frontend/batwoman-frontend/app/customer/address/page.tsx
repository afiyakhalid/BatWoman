"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

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

    // Auto-select default or first address once data is loaded
  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
        setSelectedAddress(addresses[0].id);
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
            <section className="mx-auto max-w-6xl px-6 py-32">
                <h1 className="font-[var(--font-playfair)] text-5xl">
                    Shipping Address
                </h1>
                <p className="mt-10">
                    Loading your saved addresses...
                </p>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="mx-auto max-w-6xl px-6 py-32">
                <h1 className="font-[var(--font-playfair)] text-5xl">
                    Shipping Address
                </h1>
                <p className="mt-10 text-red-600">
                    Failed to load addresses.
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

            <section className="mx-auto max-w-6xl px-6 pt-36 pb-24">
                <div className="mb-14">
                    <h1 className="font-[var(--font-playfair)] text-5xl">
                        Shipping Address
                    </h1>
                    <p className="mt-4 text-neutral-500">
                        Select where your order should be delivered.
                    </p>
                </div>

                {addresses.length === 0 ? (
                    <EmptyAddress onAdd={openCreateModal} />
                ) : (
                    <div className="space-y-10">
                        <AddressList
                            addresses={addresses}
                           selectedId={selectedAddress}
                            onSelect={setSelectedAddress}
                            onEdit={openEditModal}
                           
                        />

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={openCreateModal}
                            >
                                + Add New Address
                            </Button>

                            <Button
                                type="button"
                                onClick={continueCheckout}
                                disabled={!selectedAddress}
                            >
                                Continue to Checkout
                            </Button>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}