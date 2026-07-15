"use client";

interface EmptyAddressProps {

    onAdd: () => void;

}

export default function EmptyAddress({

    onAdd,

}: EmptyAddressProps) {

    return (

        <div className="rounded-xl border p-10 text-center">

            <h2 className="text-2xl font-semibold">

                No Address Found

            </h2>

            <p className="mt-3 text-neutral-500">

                Add a shipping address before
                checking out.

            </p>

            <button

                onClick={onAdd}

                className="
                    mt-8
                    rounded-lg
                    bg-black
                    px-8
                    py-4
                    text-white
                "

            >

                Add Address

            </button>

        </div>

    );

}