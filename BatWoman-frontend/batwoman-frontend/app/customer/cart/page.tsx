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
      <div className="pt-40 pb-32 text-center">
        <p className="font-[var(--font-playfair)] italic text-xl text-neutral-500">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pt-40 pb-32 text-center">
        <p className="text-sm text-neutral-500 tracking-wider uppercase">
          Failed to load your cart. Please try refreshing.
        </p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-10 pt-28 sm:pt-36 pb-24">
      {/* Editorial Header */}
      <div className="mb-12 pb-6 border-b border-neutral-200/80 flex items-baseline justify-between">
        <h1 className="font-[var(--font-playfair)] italic text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900">
          Shopping Cart
        </h1>
        <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-light">
          {cart.items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
          {cart.items.reduce((acc, item) => acc + item.quantity, 0) === 1
            ? "item"
            : "items"}
        </span>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr] items-start">
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
          onRemove={(item) => removeCartItem(item.cartItemId)}
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