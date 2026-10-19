"use client";

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
      <div className="flex flex-col gap-6 border-b border-neutral-200/80 py-8 sm:flex-row sm:gap-8">
        {/* Product Image */}
        <div className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden bg-[#f6f6f6] sm:w-36">
          {item.image ? (
              <img
                  src={item.image}
                  alt={item.productName}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top"
              />
          ) : (
              <div className="flex h-full w-full items-center justify-center px-3 text-center text-[10px] font-light uppercase tracking-[0.2em] text-neutral-400">
                No Image
              </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            {item.categoryName && (
                <p className="mb-1 text-[10px] font-light uppercase tracking-[0.24em] text-neutral-400">
                  {item.categoryName}
                </p>
            )}

            <h3 className="font-[var(--font-playfair)] text-xl font-normal tracking-normal text-neutral-900 sm:text-2xl">
              {item.productName}
            </h3>

            {/* Variant Information */}
            <div className="mt-3 space-y-1 text-xs tracking-wider text-neutral-500">
              <p>
                Size : <span className="uppercase text-black">{item.size}</span>
              </p>
              <p>
                Color: <span className="uppercase text-black">{item.color}</span>
              </p>

              {item.sku && (
                  <p className="text-[10px] font-light uppercase tracking-widest text-neutral-400">
                    SKU: {item.sku}
                  </p>
              )}
            </div>

            <p className="mt-3 text-sm font-light tracking-wide text-neutral-900">
              Rs. {item.price.toLocaleString()}
            </p>
          </div>

          {/* Quantity, Subtotal, and Remove */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-neutral-200">
                <button
                    type="button"
                    onClick={onDecrease}
                    className="cursor-pointer px-3 py-1 text-xs text-neutral-600 transition hover:text-black"
                    aria-label="Decrease quantity"
                >
                  –
                </button>

                <span className="select-none px-3 text-xs font-medium text-black">
                {item.quantity}
              </span>

                <button
                    type="button"
                    onClick={onIncrease}
                    className="cursor-pointer px-3 py-1 text-xs text-neutral-600 transition hover:text-black"
                    aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                  type="button"
                  onClick={onRemove}
                  className="cursor-pointer text-xs tracking-wider text-neutral-700 underline underline-offset-4 transition hover:text-black"
                  aria-label={`Remove ${item.productName} from cart`}
              >
                Remove
              </button>
            </div>

            <div className="text-right">
            <span className="mr-2 block text-[11px] uppercase tracking-wider text-neutral-400 sm:inline">
              Item Total:
            </span>

              <span className="text-base font-light tracking-wide text-black">
              Rs. {item.subtotal.toLocaleString()}
            </span>
            </div>
          </div>
        </div>
      </div>
  );
}