// "use client";
//
// import { useParams } from "next/navigation";
//
// import { useOrder } from "@/hooks/useOrders";
//
// import OrderTimeline from "@/components/orders/OrderTimeline";
// import ShippingAddressCard from "@/components/orders/ShippingAddressCard";
// import OrderItemsCard from "@/components/orders/OrderItemsCard";
// import OrderSummaryCard from "@/components/orders/OrderSummaryCard";
//
// export default function OrderDetailsPage() {
//
//     const params = useParams();
//
//     const orderId = params.orderId as string;
//
//     const {
//
//         data: order,
//
//         isLoading,
//
//         isError,
//
//     } = useOrder(orderId);
//
//     if (isLoading) {
//
//         return (
//
//             <section className="mx-auto max-w-7xl px-6 py-36">
//
//                 Loading...
//
//             </section>
//
//         );
//
//     }
//
//     if (isError || !order) {
//
//         return (
//
//             <section className="mx-auto max-w-7xl px-6 py-36">
//
//                 Failed to load order.
//
//             </section>
//
//         );
//
//     }
//
//     return (
//
//         <section className="mx-auto max-w-7xl px-6 py-36">
//
//             <div className="mb-12">
//
//                 <h1 className="font-[var(--font-playfair)] text-5xl">
//
//                     {order.orderNumber}
//
//                 </h1>
//
//                 <p className="mt-3 text-neutral-500">
//
//                     Review your order details.
//
//                 </p>
//
//             </div>
//
//             <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
//
//                 <div className="space-y-8">
//
//                     <OrderTimeline
//
//                         status={order.status}
//
//                         createdAt={order.createdAt}
//
//                     />
//
//                     <ShippingAddressCard
//
//                         address={order.shippingAddress}
//
//                     />
//
//                     <OrderItemsCard
//
//                         items={order.items}
//
//                     />
//
//                 </div>
//
//                 <OrderSummaryCard
//
//                     subtotal={order.subtotal}
//
//                     shipping={order.shippingCharge}
//
//                     discount={order.discount}
//
//                     total={order.total}
//
//                 />
//
//             </div>
//
//         </section>
//
//     );
//
// }
"use client";

import { useParams } from "next/navigation";
import { useOrder } from "@/hooks/useOrders";

import OrderTimeline from "@/components/orders/OrderTimeline";
import OrderTrackingCard from "@/components/orders/OrderTrackingCard";
import ShippingAddressCard from "@/components/orders/ShippingAddressCard";
import OrderItemsCard from "@/components/orders/OrderItemsCard";
import OrderSummaryCard from "@/components/orders/OrderSummaryCard";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const { data: order, isLoading, isError } = useOrder(orderId);

  // Loading State UI
  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-36">
        <div className="animate-pulse space-y-8">
          <div className="space-y-3">
            <div className="h-10 w-64 rounded bg-neutral-200" />
            <div className="h-4 w-48 rounded bg-neutral-200" />
          </div>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="h-32 w-full rounded-xl bg-neutral-200" />
              <div className="h-40 w-full rounded-xl bg-neutral-200" />
              <div className="h-48 w-full rounded-xl bg-neutral-200" />
            </div>
            <div className="h-72 w-full rounded-xl bg-neutral-200" />
          </div>
        </div>
      </section>
    );
  }

  // Error State UI
  if (isError || !order) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-24 text-center md:py-36">
        <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900">
            Failed to load order
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            We couldn't retrieve the details for order #{orderId}. Please check
            the order ID or try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-24">
      {/* Header Section */}
      <div className="mb-10 border-b border-neutral-200 pb-6">
        <h1 className="font-[var(--font-playfair)] text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
          Order {order.orderNumber}
        </h1>
        <p className="mt-2 text-base text-neutral-500">
          Review your shipment progress, order details, and item summary.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-start">
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
  );
}