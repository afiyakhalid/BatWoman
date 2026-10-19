"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { CartItem } from "@/types/cart";
import { useCart } from "@/hooks/useCart";

interface CheckoutItemsProps {
  items: CartItem[];
}

export default function CheckoutItems({ items }: CheckoutItemsProps) {
  const { updateCartItem, removeCartItem } = useCart();
  const totalPieces = items.reduce((total, i) => total + i.quantity, 0);

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
    <section className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
      {/* Header */}
      <div className="pb-5 border-b border-[#eee8e0] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4eee6] text-[#6b5541]">
            <ShoppingBag size={14} strokeWidth={1.8} />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block">
              Step 02
            </span>
            <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-900">
              Order Items
            </h2>
          </div>
        </div>

        <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-light">
          {totalPieces} {totalPieces === 1 ? "piece" : "pieces"}
        </span>
      </div>

      {/* Table Headers */}
      <div className="hidden sm:grid sm:grid-cols-[2.2fr_1fr_1fr_1.2fr] gap-4 py-3.5 px-4 my-4 bg-[#faf8f5] border-y border-[#eee8e0] text-[10px] uppercase tracking-[0.22em] font-medium text-[#8C6D4F]">
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
            className="py-5 sm:px-4 flex flex-col sm:grid sm:grid-cols-[2.2fr_1fr_1fr_1.2fr] sm:items-center gap-4 transition-colors hover:bg-[#fbfaf8]/60"
          >
            {/* Product Column */}
            <div className="flex items-center gap-4">
              <div className="relative aspect-[3/4] w-18 sm:w-20 shrink-0 overflow-hidden bg-[#f6f6f6] border border-[#e7e1d8]">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="90px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[9px] uppercase tracking-widest text-neutral-400">
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0">
                {item.categoryName && (
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8C6D4F] font-medium truncate mb-0.5">
                    {item.categoryName}
                  </p>
                )}
                <h3 className="font-[var(--font-playfair)] text-base sm:text-lg font-normal text-neutral-900 truncate">
                  {item.productName}
                </h3>
                <p className="text-xs text-neutral-500 tracking-wider font-light mt-0.5 sm:hidden">
                  Rs. {item.price.toLocaleString()} each
                </p>
              </div>
            </div>

            {/* Size & Color Column */}
            <div className="flex sm:flex-col sm:items-center text-xs tracking-wider text-neutral-700 gap-2 sm:gap-1">
              <span className="text-[10px] uppercase text-neutral-400 sm:hidden">
                Details:
              </span>
              <span className="px-2 py-0.5 bg-[#f3ece2] text-[#6b5541] text-[10px] uppercase tracking-[0.16em] font-medium">
                Size {item.size}
              </span>
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider">
                {item.color}
              </span>
            </div>

            {/* Quantity Stepper Column (- 1 +) */}
            <div className="flex sm:justify-center items-center gap-2">
              <span className="text-[10px] uppercase text-neutral-400 sm:hidden">
                Quantity:
              </span>
              <div className="flex items-center border border-[#d6cec2] bg-white">
                <button
                  type="button"
                  onClick={() => handleDecrease(item)}
                  className="px-2.5 py-1 text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 transition cursor-pointer min-w-[28px]"
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span className="px-2.5 text-xs font-medium text-neutral-900 select-none">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleIncrease(item)}
                  className="px-2.5 py-1 text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 transition cursor-pointer min-w-[28px]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal Column */}
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase text-neutral-400 sm:hidden mr-2">
                Total:
              </span>
              <span className="font-[var(--font-playfair)] text-base sm:text-lg text-neutral-900 font-normal tracking-wide">
                Rs. {item.subtotal.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}