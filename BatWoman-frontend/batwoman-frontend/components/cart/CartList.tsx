"use client";

import { CartItem as CartItemType } from "@/types/cart";

import CartItem from "./CartItem";

interface CartListProps {

    items: CartItemType[];

    onIncrease: (item: CartItemType) => void;

    onDecrease: (item: CartItemType) => void;

    onRemove: (item: CartItemType) => void;

}

export default function CartList({

    items,

    onIncrease,

    onDecrease,

    onRemove,

}: CartListProps) {

    return (

        <div className="flex flex-col">

            {items.map((item) => (

                <CartItem

                    key={item.cartItemId}

                    item={item}

                    onIncrease={() => onIncrease(item)}

                    onDecrease={() => onDecrease(item)}

                    onRemove={() => onRemove(item)}

                />

            ))}

        </div>

    );

}