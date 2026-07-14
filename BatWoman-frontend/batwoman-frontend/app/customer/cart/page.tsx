"use client";

import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

import { useCart } from "@/hooks/useCart";

export default function CartPage() {

    const {

        data: cart,

        isLoading,

        isError,

        updateCartItem,

        removeCartItem,

    } = useCart();

    if (isLoading) {

        return (

            <div className="pt-40 text-center">

                Loading your cart...

            </div>

        );

    }

    if (isError) {

        return (

            <div className="pt-40 text-center">

                Failed to load cart.

            </div>

        );

    }

    if (!cart || cart.items.length === 0) {

        return <EmptyCart />;

    }

    return (

        <section className="mx-auto max-w-7xl px-6 pt-36 pb-24">

            <h1 className="mb-16 font-[var(--font-playfair)] text-5xl">

                Shopping Cart

            </h1>

            <div className="grid gap-16 lg:grid-cols-[2fr_1fr]">

                <CartList

                    items={cart.items}

                    onIncrease={(item) =>
                        updateCartItem({

                            cartItemId: item.cartItemId,

                            quantity: item.quantity + 1,

                        })
                    }

                    onDecrease={(item) => {

                        if (item.quantity === 1) {

                            removeCartItem(item.cartItemId);

                            return;

                        }

                        updateCartItem({

                            cartItemId: item.cartItemId,

                            quantity: item.quantity - 1,

                        });

                    }}

                    onRemove={(item) =>
                        removeCartItem(item.cartItemId)
                    }

                />

                <CartSummary

                    subtotal={cart.subtotal}

                    shipping={cart.shipping}

                    total={cart.total}

                />

            </div>

        </section>

    );

}