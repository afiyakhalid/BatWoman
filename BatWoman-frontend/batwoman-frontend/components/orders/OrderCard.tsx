"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Package } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { Order } from "@/types/order";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  const router = useRouter();

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const totalQuantity =
    order.items?.reduce((sum, item) => sum + item.quantity, 0) ||
    order.items?.length ||
    1;

  return (
    <div className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none transition-all duration-300 hover:border-[#cfc6ba] hover:shadow-[0_8px_30px_rgba(45,31,26,0.06)]">
      {/* Top Header: Order Number + Date + Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-[#eee8e0] gap-4">
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-0.5">
            Order Reference
          </span>
          <h2 className="font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-900">
            #{order.orderNumber}
          </h2>
          <p className="mt-1 text-xs text-neutral-500 tracking-wider font-light">
            Placed on {formattedDate}
          </p>
        </div>

        <div className="self-start sm:self-center">
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Middle Row: Item Previews */}
      {order.items && order.items.length > 0 && (
        <div className="py-5 border-b border-[#eee8e0]">
          <div className="flex items-center gap-2 mb-3">
            <Package size={14} className="text-[#8C6D4F]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-600">
              {totalQuantity} {totalQuantity === 1 ? "Abaya" : "Abayas"} in this Order
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {order.items.map((item, idx) => (
              <span
                key={`${item.productId}-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#faf8f5] border border-[#e7e1d8] text-xs text-neutral-800 font-light tracking-wide"
              >
                <span className="font-medium text-black">{item.productName}</span>
                {item.size && (
                  <span className="text-neutral-400 text-[10px] uppercase">
                    ({item.size})
                  </span>
                )}
                <span className="text-neutral-400 text-[10px]">× {item.quantity}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Row: Total & Action Button */}
      <div className="pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block font-light">
            Order Total
          </span>
          <p className="font-[var(--font-playfair)] text-xl sm:text-2xl font-normal text-neutral-900 tracking-wide mt-0.5">
            Rs. {order.total.toLocaleString()}
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/customer/orders/${order.orderId}`)}
          className="group inline-flex items-center justify-center gap-2 bg-black px-7 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-white transition hover:bg-neutral-800 rounded-none cursor-pointer active:scale-[0.99] shadow-sm"
        >
          <span>View Details</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}