"use client";

import { MapPin, Pencil } from "lucide-react";
import { Address } from "@/services/address.service";
import {Trash}  from "lucide-react";

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
                cursor-pointer
                rounded-xl
                border-2
                p-6
                transition
                ${
                    selected
                        ? "border-black"
                        : "border-neutral-200"
                }
            `}
        >

            <div className="flex justify-between">

                <div className="flex items-center gap-2">

                    <input

                        type="radio"

                        checked={selected}

                        readOnly

                    />

                    <span className="font-semibold">

                        {address.defaultAddress
                            ? "Default Address"
                            : "Address"}

                    </span>

                </div>

                <button

                    onClick={(e) => {

                        e.stopPropagation();

                        onEdit();

                    }}

                >

                    <Pencil size={18} />

                </button>

            </div>

            <div className="mt-5 flex gap-3">

                <MapPin className="mt-1" />

                <div>

                    <h3 className="font-semibold">

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

        </div>

    );

}