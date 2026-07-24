"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

import { Address } from "@/services/address.service";
import { Button } from "@/components/ui/button";

interface CheckoutAddressProps {
    address: Address;
}

export default function CheckoutAddress({
    address,
}: CheckoutAddressProps) {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white p-8">

            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-semibold">
                        Shipping Address
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                        Your order will be delivered here.
                    </p>
                </div>

                <Link href="/customer/address">
                    <Button variant="outline">
                        Change
                    </Button>
                </Link>

            </div>

            <div className="flex gap-4">

                <div className="rounded-full bg-neutral-100 p-3">
                    <MapPin className="h-5 w-5" />
                </div>

                <div className="space-y-1">

                    <h3 className="font-semibold text-lg">
                        {address.fullName}
                    </h3>

                    <p>{address.phone}</p>

                    <p>{address.addressLine1}</p>

                    {address.addressLine2 && (
                        <p>{address.addressLine2}</p>
                    )}

                    <p>
                        {address.city}, {address.state}
                    </p>

                    <p>
                        {address.country} - {address.postalCode}
                    </p>

                </div>

            </div>

        </section>
    );
}