"use client";

import { Address } from "@/services/address.service";
import AddressCard from "./AddressCard";

interface AddressListProps {

    addresses: Address[];

    selectedId?: string;

    onSelect: (id: string) => void;

    onEdit: (address: Address) => void;

}

export default function AddressList({

    addresses,

    selectedId,

    onSelect,

    onEdit,

}: AddressListProps) {

    return (

        <div className="space-y-6">

            {addresses.map((address) => (

                <AddressCard

                    key={address.id}

                    address={address}

                    selected={
                        selectedId === address.id
                    }

                    onSelect={() =>
                        onSelect(address.id)
                    }

                    onEdit={() =>
                        onEdit(address)
                    }

                />

            ))}

        </div>

    );

}