"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ArrowRight } from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { useCartDrawerStore } from "@/store/cart.store";
import { CartItem } from "@/types/cart";

export default function CartDrawer() {
  const router = useRouter();
  const { isOpen, closeCart } = useCartDrawerStore();
  const { data: cart, updateCartItem, removeCartItem } = useCart();

  // Close on Escape and prevent body scrolling while the drawer is open.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const items = cart?.items ?? [];
  const total = cart?.total ?? 0;

  const handleDecrease = (item: CartItem) => {
    if (item.quantity <= 1) {
      removeCartItem(item.cartItemId);
    } else {
      updateCartItem({
        cartItemId: item.cartItemId,
        quantity: item.quantity - 1,
      });
    }
  };

  const handleIncrease = (item: CartItem) => {
    updateCartItem({
      cartItemId: item.cartItemId,
      quantity: item.quantity + 1,
    });
  };

  const handleCheckout = () => {
    closeCart();
    router.push("/customer/address");
  };

  return (
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Dimmed backdrop */}
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeCart}
            aria-hidden="true"
        />

        {/* Slide-out drawer */}
        <aside
            className="relative z-10 flex h-full w-full max-w-[460px] flex-col border-l border-[#e7e1d8] bg-white shadow-[0_25px_60px_rgba(45,31,26,0.2)] transition-transform duration-300 ease-in-out"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#eee8e0] bg-white px-6 py-6 sm:px-8">
            <div>
            <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8C6D4F]">
              Your Bag
            </span>
              <h2 className="font-[var(--font-playfair)] text-2xl font-normal italic tracking-normal text-neutral-900 sm:text-[26px]">
                Shopping Cart
              </h2>
            </div>

            <button
                type="button"
                onClick={closeCart}
                className="-mr-2 cursor-pointer p-2 text-neutral-400 transition-colors hover:text-black"
                aria-label="Close cart"
            >
              <X size={20} strokeWidth={1.4} />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 divide-y divide-[#eee8e0] overflow-y-auto px-6 py-2 sm:px-8">
            {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-20 text-center">
              <span className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#8C6D4F]">
                Empty Bag
              </span>

                  <p className="font-[var(--font-playfair)] text-2xl italic text-neutral-800">
                    Your shopping bag is empty.
                  </p>

                  <p className="mt-2 max-w-xs text-xs font-light uppercase tracking-wider text-neutral-400">
                    Explore pieces cut for understated elegance and modest luxury
                  </p>

                  <Link
                      href="/customer/products"
                      onClick={closeCart}
                      className="mt-8 inline-block rounded-none border border-neutral-900 bg-transparent px-8 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white"
                  >
                    Explore Collection
                  </Link>
                </div>
            ) : (
                items.map((item) => (
                    <div
                        key={item.cartItemId}
                        className="flex gap-4 py-5 sm:gap-5"
                    >
                      {/* Product image: bypass Next.js image optimization. */}
                      <div className="relative aspect-[3/4] w-22 shrink-0 overflow-hidden border border-[#e7e1d8] bg-[#faf8f5] sm:w-26">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.productName}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover object-top"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest text-neutral-400">
                              No Image
                            </div>
                        )}
                      </div>

                      {/* Product details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          {item.categoryName && (
                              <p className="mb-0.5 truncate text-[9px] font-medium uppercase tracking-[0.22em] text-[#8C6D4F]">
                                {item.categoryName}
                              </p>
                          )}

                          <h3 className="truncate font-[var(--font-playfair)] text-base font-normal text-neutral-900 sm:text-lg">
                            {item.productName}
                          </h3>

                          <p className="mt-0.5 text-xs font-light tracking-wide text-neutral-800">
                            Rs. {item.price.toLocaleString()}
                          </p>

                          <div className="mt-1 flex items-center gap-2 text-[11px] tracking-wider text-neutral-500">
                            <span>Size: {item.size}</span>
                            <span>•</span>
                            <span>{item.color}</span>
                          </div>
                        </div>

                        {/* Quantity and remove */}
                        <div className="mt-4 flex items-center justify-between pt-1">
                          <div className="flex items-center border border-[#d6cec2] bg-white">
                            <button
                                type="button"
                                onClick={() => handleDecrease(item)}
                                className="min-w-[28px] cursor-pointer px-2.5 py-1 text-xs text-neutral-600 transition hover:text-black"
                                aria-label="Decrease quantity"
                            >
                              –
                            </button>

                            <span className="select-none px-2 text-xs font-medium text-neutral-900">
                        {item.quantity}
                      </span>

                            <button
                                type="button"
                                onClick={() => handleIncrease(item)}
                                className="min-w-[28px] cursor-pointer px-2.5 py-1 text-xs text-neutral-600 transition hover:text-black"
                                aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                              type="button"
                              onClick={() => removeCartItem(item.cartItemId)}
                              className="cursor-pointer py-1 text-xs tracking-wider text-neutral-700 underline underline-offset-4 transition hover:text-black"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
              <div className="border-t border-[#eee8e0] bg-[#fdfcfb] px-6 pb-8 pt-5 sm:px-8">
                <p className="mb-3 text-[11px] font-light tracking-normal text-neutral-400">
                  Tax calculated at checkout.
                </p>

                <div className="mb-5 flex items-baseline justify-between">
              <span className="font-[var(--font-playfair)] text-lg italic text-neutral-900 sm:text-xl">
                Total
              </span>
                  <span className="font-[var(--font-playfair)] text-xl font-normal tracking-wide text-neutral-900 sm:text-2xl">
                Rs. {total.toLocaleString()}
              </span>
                </div>

                <button
                    type="button"
                    onClick={handleCheckout}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-none bg-black py-4 text-xs font-medium uppercase tracking-[0.25em] text-white shadow-sm transition-all duration-300 hover:bg-neutral-800 active:scale-[0.99]"
                >
                  <span>Checkout</span>
                  <ArrowRight size={14} />
                </button>

                <Link
                    href="/customer/cart"
                    onClick={closeCart}
                    className="mt-4 block text-center text-xs tracking-[0.14em] text-neutral-700 underline underline-offset-4 transition hover:text-black"
                >
                  View Shopping Cart
                </Link>
              </div>
          )}
        </aside>
      </div>
  );
}