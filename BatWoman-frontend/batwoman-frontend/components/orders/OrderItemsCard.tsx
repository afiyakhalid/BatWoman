import { Package } from "lucide-react";
import { OrderItem } from "@/types/order";

interface Props {
  items: OrderItem[];
}

export default function OrderItemsCard({ items }: Props) {
  const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
      <div className="flex items-center justify-between pb-5 border-b border-[#eee8e0]">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4eee6] text-[#6b5541]">
            <Package size={14} strokeWidth={1.8} />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block">
              Manifest
            </span>
            <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-900">
              Purchased Abayas
            </h2>
          </div>
        </div>

        <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-light">
          {totalPieces} {totalPieces === 1 ? "piece" : "pieces"}
        </span>
      </div>

      {/* Table Column Headers */}
      <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-3.5 px-4 my-4 bg-[#faf8f5] border-y border-[#eee8e0] text-[10px] uppercase tracking-[0.22em] font-medium text-[#8C6D4F]">
        <span>Abaya</span>
        <span className="text-center">Variant</span>
        <span className="text-center">Quantity</span>
        <span className="text-right">Total Price</span>
      </div>

      {/* Items Rows */}
      <div className="divide-y divide-[#eee8e0]">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.variantId || item.size}`}
            className="py-4 sm:px-4 flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr] sm:items-center gap-3 transition-colors hover:bg-[#fbfaf8]/60"
          >
            {/* Product Title */}
            <div>
              <h3 className="font-[var(--font-playfair)] text-base sm:text-lg font-normal text-neutral-900">
                {item.productName}
              </h3>
              <p className="text-xs text-neutral-500 tracking-wider font-light mt-0.5">
                Rs. {item.unitPrice.toLocaleString()} each
              </p>
            </div>

            {/* Variant Pills */}
            <div className="flex sm:flex-col sm:items-center text-xs tracking-wider text-neutral-700 gap-2 sm:gap-1">
              <span className="px-2 py-0.5 bg-[#f3ece2] text-[#6b5541] text-[10px] uppercase tracking-[0.16em] font-medium">
                Size {item.size}
              </span>
              {item.color && (
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider">
                  {item.color}
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex sm:justify-center items-center gap-2">
              <span className="text-[10px] uppercase text-neutral-400 sm:hidden">
                Qty:
              </span>
              <span className="px-3 py-1 bg-[#faf8f5] border border-[#d6cec2] text-xs text-neutral-900 font-medium">
                {item.quantity}
              </span>
            </div>

            {/* Subtotal */}
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase text-neutral-400 sm:hidden mr-2">
                Total:
              </span>
              <span className="font-[var(--font-playfair)] text-base sm:text-lg text-neutral-900 font-normal tracking-wide">
                Rs. {item.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}