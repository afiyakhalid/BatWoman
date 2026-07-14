"use client";

interface QuantitySelectorProps {

    quantity: number;

    onIncrease: () => void;

    onDecrease: () => void;

}

export default function QuantitySelector({

    quantity,

    onIncrease,

    onDecrease,

}: QuantitySelectorProps) {

    return (

        <div className="flex h-12 w-36 items-center border border-neutral-300">

            <button
                onClick={onDecrease}
                className="flex-1 text-xl transition hover:bg-neutral-100"
            >
                −
            </button>

            <span className="flex-1 text-center font-medium">
                {quantity}
            </span>

            <button
                onClick={onIncrease}
                className="flex-1 text-xl transition hover:bg-neutral-100"
            >
                +
            </button>

        </div>

    );

}