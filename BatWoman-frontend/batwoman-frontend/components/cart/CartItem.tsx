"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 border-b border-neutral-200/80 py-8">
      {/* Product Image */}
      <div className="relative aspect-[3/4] w-28 sm:w-36 shrink-0 overflow-hidden bg-[#f6f6f6]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.productName}
            fill
            sizes="160px"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
            No Image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {item.categoryName && (
            <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400 font-light mb-1">
              {item.categoryName}
            </p>
          )}

          <h3 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-900 tracking-normal">
            {item.productName}
          </h3>

          {/* Variant Information */}
          <div className="mt-3 space-y-1 text-xs tracking-wider text-neutral-500">
            <p>
              Size : <span className="text-black uppercase">{item.size}</span>
            </p>
            <p>
              Color: <span className="text-black uppercase">{item.color}</span>
            </p>
            {item.sku && (
              <p className="text-[10px] text-neutral-400 tracking-widest uppercase font-light">
                SKU: {item.sku}
              </p>
            )}
          </div>

          <p className="mt-3 text-sm text-neutral-900 tracking-wide font-light">
            Rs. {item.price.toLocaleString()}
          </p>
        </div>

        {/* Stepper, Subtotal, and Remove */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-6">
            {/* Minimalist - 1 + Stepper */}
            <div className="flex items-center border border-neutral-200">
              <button
                type="button"
                onClick={onDecrease}
                className="px-3 py-1 text-xs text-neutral-600 hover:text-black transition cursor-pointer"
                aria-label="Decrease quantity"
              >
                –
              </button>
              <span className="px-3 text-xs font-medium text-black select-none">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={onIncrease}
                className="px-3 py-1 text-xs text-neutral-600 hover:text-black transition cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="text-xs tracking-wider text-neutral-700 hover:text-black underline underline-offset-4 transition cursor-pointer"
              aria-label={`Remove ${item.productName} from cart`}
            >
              Remove
            </button>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 block sm:inline mr-2">
              Item Total:
            </span>
            <span className="text-base font-light text-black tracking-wide">
              Rs. {item.subtotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}