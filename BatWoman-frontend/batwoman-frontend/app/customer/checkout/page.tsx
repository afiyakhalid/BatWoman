"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";

import CheckoutAddress from "@/components/checkout/CheckoutAddress";
import CheckoutItems from "@/components/checkout/CheckoutItems";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";

import { useCheckout } from "@/hooks/useOrders";
import {
  useCreatePayment,
  useVerifyPayment,
  useHandlePaymentFailure,
} from "@/hooks/usePayments";

import { useAddress } from "@/hooks/useAddresses";
import { useCart } from "@/hooks/useCart";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const checkoutMutation = useCheckout();
  const createPaymentMutation = useCreatePayment();
  const verifyPaymentMutation = useVerifyPayment();
  const handlePaymentFailureMutation = useHandlePaymentFailure();

  const addressId = searchParams.get("addressId");

  const {
    data: address,
    isLoading: addressLoading,
    isError: addressError,
  } = useAddress(addressId ?? undefined);

  const {
    data: cart,
    isLoading: cartLoading,
    isError: cartError,
  } = useCart();

  const { data: user } = useCurrentUser();

  async function handlePlaceOrder() {
    if (!addressId) return;

    try {
      // 1. Create Order in local backend
      const order = await checkoutMutation.mutateAsync({
        addressId,
      });

      // 2. Initialize Razorpay Order
      const payment = await createPaymentMutation.mutateAsync({
        orderId: order.orderId,
      });

      // 3. Configure Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: payment.amount * 100,
        currency: payment.currency,
        name: "BatWoman",
        description: "Luxury Abaya Purchase",
        order_id: payment.razorpayOrderId,
        prefill: {
          name: address!.fullName,
          contact: address!.phone,
          email: user?.email,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          async ondismiss() {
            try {
              await handlePaymentFailureMutation.mutateAsync(
                payment.paymentId
              );
              alert("Payment cancelled.");
            } catch (error) {
              console.error(
                "Failed to release inventory after payment cancellation",
                error
              );
            }
          },
        },
        handler: async function (response: any) {
          try {
            await verifyPaymentMutation.mutateAsync({
              paymentId: payment.paymentId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            // Redirect to Customer Orders list
            router.push("/customer/orders");
          } catch (error) {
            console.error("Payment verification failed", error);
          }
        },
      };

      const razorpay = new (window as any).Razorpay(options);

      razorpay.on("payment.failed", async function (response: any) {
        console.error(response.error);
        try {
          await handlePaymentFailureMutation.mutateAsync(
            payment.paymentId
          );
          alert("Payment failed. Please try again.");
        } catch (error) {
          console.error(
            "Failed to release inventory after payment failure",
            error
          );
        }
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
    }
  }

  if (!addressId) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center py-36 px-6 text-center">
        <h1 className="font-[var(--font-playfair)] italic text-3xl font-normal text-neutral-900">
          No shipping address selected.
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#8C6D4F] font-light">
          Please select a delivery address to proceed.
        </p>
        <button
          type="button"
          onClick={() => router.push("/customer/address")}
          className="mt-8 bg-black px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition hover:bg-neutral-800 rounded-none cursor-pointer"
        >
          Select Shipping Address
        </button>
      </div>
    );
  }

  if (addressLoading || cartLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center py-36 px-6">
        <p className="font-[var(--font-playfair)] italic text-2xl text-neutral-600">
          Loading checkout review...
        </p>
      </div>
    );
  }

  if (addressError || cartError || !address || !cart) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center py-36 px-6 text-center">
        <h1 className="font-[var(--font-playfair)] italic text-3xl font-normal text-neutral-900">
          Unable to Load Checkout
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-neutral-400 font-light">
          We could not load your order details. Please try refreshing.
        </p>
        <button
          type="button"
          onClick={() => router.push("/customer/cart")}
          className="mt-8 bg-black px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition hover:bg-neutral-800 rounded-none cursor-pointer"
        >
          Return to Shopping Bag
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 sm:py-20">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* =========================================================
            TOP NAVIGATION: BACK LINK & STEP PROGRESS BAR
        ========================================================== */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/customer/address")}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6D4F] hover:text-black transition cursor-pointer"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.5}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Shipping Address</span>
          </button>

          {/* Couture Step Indicators */}
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em]">
            <button
              onClick={() => router.push("/customer/address")}
              className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition"
            >
              <Check size={11} className="text-[#6b5541]" />
              <span>01 Shipping</span>
            </button>
            <ChevronRight size={11} className="text-[#cfc6ba]" />
            <span className="font-semibold text-black border-b border-black pb-0.5">
              02 Review & Pay
            </span>
          </div>
        </div>

        {/* =========================================================
            PAGE HEADER
        ========================================================== */}
        <div className="mb-10 pb-6 border-b border-[#eee8e0]">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-1">
            Final Step
          </span>
          <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900">
            Order Review & Payment
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-neutral-400 font-light">
            Review delivery details and finalize your acquisition
          </p>
        </div>

        {/* =========================================================
            MAIN 2-COLUMN LAYOUT
        ========================================================== */}
        <div className="grid gap-8 lg:grid-cols-[1.85fr_1.15fr] items-start">
          {/* Left Column: Delivery Address, Garment Items, Payment Method */}
          <div className="space-y-6">
            <CheckoutAddress address={address} />
            <CheckoutItems items={cart.items} />
            <PaymentMethod />
          </div>

          {/* Right Column: Order Summary with Discounts and SSL Badge */}
          <CheckoutSummary
            items={cart.items}
            subtotal={cart.subtotal}
            shipping={cart.shipping}
            total={cart.total}
            onPlaceOrder={handlePlaceOrder}
            isLoading={
              checkoutMutation.isPending ||
              createPaymentMutation.isPending
            }
          />
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center py-36 px-6">
          <p className="font-[var(--font-playfair)] italic text-2xl text-neutral-600">
            Loading checkout...
          </p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}