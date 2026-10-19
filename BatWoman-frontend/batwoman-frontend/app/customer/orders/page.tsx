"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";

import EmptyOrders from "@/components/orders/EmptyOrders";
import OrderCard from "@/components/orders/OrderCard";

export default function OrdersPage() {
  const { data: orders = [], isLoading, isError } = useOrders();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center py-36 px-6">
        <p className="font-[var(--font-playfair)] italic text-2xl text-neutral-600">
          Loading your acquisition records...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center py-36 px-6 text-center">
        <h1 className="font-[var(--font-playfair)] italic text-3xl font-normal text-neutral-900">
          My Orders
        </h1>
        <p className="mt-3 text-xs uppercase tracking-wider text-red-600">
          Failed to load your orders. Please try refreshing.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 sm:py-20">
      <main className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Top Back Navigation */}
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
            <span>Explore Collection</span>
          </Link>
        </div>

        {/* Editorial Header */}
        <div className="mb-10 pb-6 border-b border-[#eee8e0] flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-1">
              Client Acquisitions
            </span>
            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900">
              My Orders
            </h1>
          </div>

          {orders.length > 0 && (
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-light">
              {orders.length} {orders.length === 1 ? "order placed" : "orders placed"}
            </span>
          )}
        </div>

        {/* Orders Listing or Empty State */}
        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.orderId} order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}