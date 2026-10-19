"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useOrder } from "@/hooks/useOrders";

import OrderTimeline from "@/components/orders/OrderTimeline";
import OrderTrackingCard from "@/components/orders/OrderTrackingCard";
import ShippingAddressCard from "@/components/orders/ShippingAddressCard";
import OrderItemsCard from "@/components/orders/OrderItemsCard";
import OrderSummaryCard from "@/components/orders/OrderSummaryCard";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const { data: order, isLoading, isError } = useOrder(orderId);

  // Loading State UI
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#faf8f5] py-16 sm:py-24">
        <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="animate-pulse space-y-8">
            <div className="h-4 w-32 bg-[#e8e2d8]" />
            <div className="space-y-3">
              <div className="h-10 w-72 bg-[#e8e2d8]" />
              <div className="h-4 w-48 bg-[#e8e2d8]" />
            </div>
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-6">
                <div className="h-48 w-full bg-white border border-[#e7e1d8]" />
                <div className="h-48 w-full bg-white border border-[#e7e1d8]" />
                <div className="h-64 w-full bg-white border border-[#e7e1d8]" />
              </div>
              <div className="h-80 w-full bg-white border border-[#e7e1d8]" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Error State UI
  if (isError || !order) {
    return (
      <main className="min-h-screen bg-[#faf8f5] py-20 sm:py-32">
        <section className="mx-auto max-w-xl px-6 text-center">
          <div className="bg-white border border-[#e7e1d8] p-8 sm:p-12 shadow-[0_4px_25px_rgba(45,31,26,0.03)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f4eee6] text-[#8C6D4F]">
              <AlertCircle size={24} />
            </div>
            <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-neutral-900 font-normal">
              Order Record Not Found
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500 max-w-md mx-auto">
              We were unable to retrieve the archives for order #{orderId}. The identifier may be incorrect or undergoing database synchronisation.
            </p>
            <div className="mt-8">
              <Link
                href="/customer/orders"
                className="inline-flex items-center gap-2 bg-black px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-neutral-800 rounded-none"
              >
                <ArrowLeft size={14} />
                <span>Return to Orders</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] py-10 sm:py-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* TOP NAVIGATION LINK */}
        <div className="mb-8">
          <Link
            href="/customer/orders"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500 hover:text-black transition"
          >
            <ArrowLeft size={14} />
            <span>Back to All Orders</span>
          </Link>
        </div>

        {/* HEADER SECTION */}
        <div className="mb-10 pb-8 border-b border-[#e7e1d8] flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900">
              Order #{order.orderNumber}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500 tracking-wide">
              {order.items.length}{" "}
              {order.items.length === 1 ? "abaya" : "abayas"} · Review your order details
            </p>
          </div>

          <div className="sm:self-center">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        {/* MAIN GRID LAYOUT */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">
          {/* LEFT COLUMN: Main Details & Updates */}
          <div className="space-y-8">
            {/* Timeline / Status */}
            <OrderTimeline
              status={order.status}
              createdAt={order.createdAt}
            />

            {/* Shipment Tracking */}
            <OrderTrackingCard orderId={orderId} />

            {/* Shipping Address Details */}
            <ShippingAddressCard address={order.shippingAddress} />

            {/* List of Items Purchased */}
            <OrderItemsCard items={order.items} />
          </div>

          {/* RIGHT COLUMN: Order Financial Summary (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-8">
            <OrderSummaryCard
              subtotal={order.subtotal}
              shipping={order.shippingCharge}
              discount={order.discount}
              total={order.total}
            />
          </div>
        </div>
      </section>
    </main>
  );
}