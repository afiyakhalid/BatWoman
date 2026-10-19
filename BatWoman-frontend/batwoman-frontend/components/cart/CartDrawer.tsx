"use client";

import { useEffect } from "react";
import Image from "next/image";
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

  // Close on Escape key and prevent body scrolling when drawer is open
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
      {/* Dimmed backdrop with soft luxury blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-out drawer panel */}
      <aside
        className="relative z-10 flex h-full w-full max-w-[460px] flex-col bg-white shadow-[0_25px_60px_rgba(45,31,26,0.2)] transition-transform duration-300 ease-in-out border-l border-[#e7e1d8]"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* =========================================================
            HEADER: "Shopping Cart" in italic serif + minimal close
        ========================================================== */}
        <div className="flex items-center justify-between border-b border-[#eee8e0] px-6 sm:px-8 py-6 bg-white">
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-0.5">
              Your Bag
            </span>
            <h2 className="font-[var(--font-playfair)] italic text-2xl sm:text-[26px] font-normal text-neutral-900 tracking-normal">
              Shopping Cart
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="p-2 -mr-2 text-neutral-400 hover:text-black transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>

        {/* =========================================================
            DRAWER BODY: LIST OF CART ITEMS
        ========================================================== */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-2 divide-y divide-[#eee8e0]">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-20 text-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-medium mb-2">
                Empty Bag
              </span>
              <p className="font-[var(--font-playfair)] italic text-2xl text-neutral-800">
                Your shopping bag is empty.
              </p>
              <p className="mt-2 text-xs text-neutral-400 tracking-wider uppercase font-light max-w-xs">
                Explore pieces cut for understated elegance and modest luxury
              </p>
              <Link
                href="/customer/products"
                onClick={closeCart}
                className="mt-8 bg-black px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition hover:bg-neutral-800 rounded-none shadow-sm"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className="flex gap-4 sm:gap-5 py-5">
                {/* Product Image */}
                <div className="relative aspect-[3/4] w-22 sm:w-26 shrink-0 overflow-hidden bg-[#faf8f5] border border-[#e7e1d8]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      sizes="120px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest text-neutral-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    {item.categoryName && (
                      <p className="text-[9px] uppercase tracking-[0.22em] text-[#8C6D4F] font-medium truncate mb-0.5">
                        {item.categoryName}
                      </p>
                    )}
                    <h3 className="font-[var(--font-playfair)] text-base sm:text-lg font-normal text-neutral-900 truncate">
                      {item.productName}
                    </h3>
                    <p className="mt-0.5 text-xs text-neutral-800 tracking-wide font-light">
                      Rs. {item.price.toLocaleString()}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500 tracking-wider">
                      <span>Size: {item.size}</span>
                      <span>•</span>
                      <span>{item.color}</span>
                    </div>
                  </div>

                  {/* Quantity and Remove Row */}
                  <div className="mt-4 flex items-center justify-between pt-1">
                    {/* Minimalist - 1 + Stepper */}
                    <div className="flex items-center border border-[#d6cec2] bg-white">
                      <button
                        type="button"
                        onClick={() => handleDecrease(item)}
                        className="px-2.5 py-1 text-xs text-neutral-600 hover:text-black transition cursor-pointer min-w-[28px]"
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>
                      <span className="px-2 text-xs font-medium text-neutral-900 select-none">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrease(item)}
                        className="px-2.5 py-1 text-xs text-neutral-600 hover:text-black transition cursor-pointer min-w-[28px]"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Underlined Remove Link */}
                    <button
                      type="button"
                      onClick={() => removeCartItem(item.cartItemId)}
                      className="text-xs tracking-wider text-neutral-700 hover:text-black underline underline-offset-4 transition cursor-pointer py-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* =========================================================
            DRAWER FOOTER: TAX NOTE, TOTAL, CHECKOUT, VIEW CART
        ========================================================== */}
        {items.length > 0 && (
          <div className="border-t border-[#eee8e0] bg-[#fdfcfb] px-6 sm:px-8 pt-5 pb-8">
            <p className="text-[11px] font-light text-neutral-400 mb-3 tracking-normal">
              Tax calculated at checkout.
            </p>

            <div className="flex items-baseline justify-between mb-5">
              <span className="font-[var(--font-playfair)] italic text-lg sm:text-xl text-neutral-900">
                Total
              </span>
              <span className="font-[var(--font-playfair)] text-xl sm:text-2xl text-neutral-900 tracking-wide font-normal">
                Rs. {total.toLocaleString()}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-black py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition-all duration-300 hover:bg-neutral-800 active:scale-[0.99] rounded-none cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Checkout</span>
              <ArrowRight size={14} />
            </button>

            <Link
              href="/customer/cart"
              onClick={closeCart}
              className="mt-4 block text-center text-xs tracking-[0.14em] text-neutral-700 underline underline-offset-4 hover:text-black transition"
            >
              View Shopping Cart
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
