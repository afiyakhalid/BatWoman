"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center py-36 px-6">
        <p className="font-[var(--font-playfair)] italic text-2xl text-neutral-600">
          Loading your shopping bag...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center py-36 px-6 text-center">
        <h1 className="font-[var(--font-playfair)] italic text-3xl font-normal text-neutral-900">
          Shopping Cart
        </h1>
        <p className="mt-3 text-xs uppercase tracking-wider text-red-600">
          Failed to load your shopping bag. Please try refreshing.
        </p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5] py-16 sm:py-24 px-4 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <EmptyCart />
        </div>
      </div>
    );
  }

  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 sm:py-20">
      <main className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Top Back Link */}
        <div className="mb-8">
          <Link
            href="/customer/products"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6D4F] hover:text-black transition cursor-pointer"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.5}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Editorial Header */}
        <div className="mb-10 pb-6 border-b border-[#eee8e0] flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-1">
              Your Selection
            </span>
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900">
              Shopping Cart
            </h1>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-light">
            {totalItems} {totalItems === 1 ? "garment" : "garments"}
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.85fr_1.15fr] items-start">
          <div className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
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
          </div>

          <CartSummary
            subtotal={cart.subtotal}
            shipping={cart.shipping}
            total={cart.total}
          />
        </div>
      </main>
    </div>
  );
}