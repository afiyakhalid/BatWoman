"use client";

import { ShoppingBag } from "lucide-react";
import { CartItem } from "@/types/cart";
import { useCart } from "@/hooks/useCart";

interface CheckoutItemsProps {
  items: CartItem[];
}

export default function CheckoutItems({ items }: CheckoutItemsProps) {
  const { updateCartItem, removeCartItem } = useCart();
  const totalPieces = items.reduce((total, item) => total + item.quantity, 0);

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

  return (
      <section className="rounded-none border border-[#e7e1d8] bg-white p-6 shadow-[0_4px_25px_rgba(45,31,26,0.03)] sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eee8e0] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4eee6] text-[#6b5541]">
              <ShoppingBag size={14} strokeWidth={1.8} />
            </div>

            <div>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8C6D4F]">
              Step 02
            </span>
              <h2 className="font-[var(--font-playfair)] text-xl font-normal text-neutral-900 sm:text-2xl">
                Order Items
              </h2>
            </div>
          </div>

          <span className="text-[11px] font-light uppercase tracking-[0.2em] text-neutral-400">
          {totalPieces} {totalPieces === 1 ? "piece" : "pieces"}
        </span>
        </div>

        {/* Table headers */}
        <div className="my-4 hidden grid-cols-[2.2fr_1fr_1fr_1.2fr] gap-4 border-y border-[#eee8e0] bg-[#faf8f5] px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#8C6D4F] sm:grid">
          <span>Product</span>
          <span className="text-center">Variant</span>
          <span className="text-center">Quantity</span>
          <span className="text-right">Price</span>
        </div>

        {/* Item rows */}
        <div className="divide-y divide-[#eee8e0]">
          {items.map((item) => (
              <div
                  key={item.cartItemId}
                  className="flex flex-col gap-4 py-5 transition-colors hover:bg-[#fbfaf8]/60 sm:grid sm:grid-cols-[2.2fr_1fr_1fr_1.2fr] sm:items-center sm:px-4"
              >
                {/* Product column */}
                <div className="flex items-center gap-4">
                  <div className="relative aspect-[3/4] w-18 shrink-0 overflow-hidden border border-[#e7e1d8] bg-[#f6f6f6] sm:w-20">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.productName}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-[9px] uppercase tracking-widest text-neutral-400">
                          No image
                        </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    {item.categoryName && (
                        <p className="mb-0.5 truncate text-[10px] font-medium uppercase tracking-[0.22em] text-[#8C6D4F]">
                          {item.categoryName}
                        </p>
                    )}

                    <h3 className="truncate font-[var(--font-playfair)] text-base font-normal text-neutral-900 sm:text-lg">
                      {item.productName}
                    </h3>

                    <p className="mt-0.5 text-xs font-light tracking-wider text-neutral-500 sm:hidden">
                      Rs. {item.price.toLocaleString()} each
                    </p>
                  </div>
                </div>

                {/* Size and color */}
                <div className="flex items-center gap-2 text-xs tracking-wider text-neutral-700 sm:flex-col sm:items-center sm:gap-1">
              <span className="text-[10px] uppercase text-neutral-400 sm:hidden">
                Details:
              </span>

                  <span className="bg-[#f3ece2] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#6b5541]">
                Size {item.size}
              </span>

                  <span className="text-[11px] uppercase tracking-wider text-neutral-500">
                {item.color}
              </span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 sm:justify-center">
              <span className="text-[10px] uppercase text-neutral-400 sm:hidden">
                Quantity:
              </span>

                  <div className="flex items-center border border-[#d6cec2] bg-white">
                    <button
                        type="button"
                        onClick={() => handleDecrease(item)}
                        className="min-w-[28px] cursor-pointer px-2.5 py-1 text-xs text-neutral-600 transition hover:bg-neutral-50 hover:text-black"
                        aria-label="Decrease quantity"
                    >
                      –
                    </button>

                    <span className="select-none px-2.5 text-xs font-medium text-neutral-900">
                  {item.quantity}
                </span>

                    <button
                        type="button"
                        onClick={() => handleIncrease(item)}
                        className="min-w-[28px] cursor-pointer px-2.5 py-1 text-xs text-neutral-600 transition hover:bg-neutral-50 hover:text-black"
                        aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-left sm:text-right">
              <span className="mr-2 text-[10px] uppercase text-neutral-400 sm:hidden">
                Total:
              </span>

                  <span className="font-[var(--font-playfair)] text-base font-normal tracking-wide text-neutral-900 sm:text-lg">
                Rs. {item.subtotal.toLocaleString()}
              </span>
                </div>
              </div>
          ))}
        </div>
      </section>
  );
}