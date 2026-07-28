import { ShippingAddress } from "@/types/order";

interface Props {

    address?: ShippingAddress;

}

export default function ShippingAddressCard({

                                                address,

                                            }: Props) {

    if (!address) return null;

    return (

        <div className="rounded-xl border border-neutral-200 bg-white p-8">

            <h2 className="mb-8 font-[var(--font-playfair)] text-3xl">

                Shipping Address

            </h2>

            <div className="space-y-2">

                <p className="font-semibold">

                    {address.fullName}

                </p>

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

    );

}