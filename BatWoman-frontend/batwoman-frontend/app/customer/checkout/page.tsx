//
// "use client";
//
// import { Suspense, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Script from "next/script";
// import { ArrowLeft, Check, ChevronRight } from "lucide-react";
//
// import CheckoutAddress from "@/components/checkout/CheckoutAddress";
// import CheckoutItems from "@/components/checkout/CheckoutItems";
// import CheckoutSummary from "@/components/checkout/CheckoutSummary";
// import PaymentMethod from "@/components/checkout/PaymentMethod";
//
// import { useCheckout } from "@/hooks/useOrders";
// import {
//   useCreatePayment,
//   useVerifyPayment,
//   useHandlePaymentFailure,
// } from "@/hooks/usePayments";
//
// import { useAddress } from "@/hooks/useAddresses";
// import { useCart } from "@/hooks/useCart";
// import { useCurrentUser } from "@/hooks/useCurrentUser";
//
// interface RazorpaySuccessResponse {
//   razorpay_payment_id: string;
//   razorpay_order_id: string;
//   razorpay_signature: string;
// }
//
// interface RazorpayFailureResponse {
//   error: {
//     code?: string;
//     description?: string;
//     source?: string;
//     step?: string;
//     reason?: string;
//     metadata?: {
//       order_id?: string;
//       payment_id?: string;
//     };
//   };
// }
//
// interface RazorpayOptions {
//   key?: string;
//   amount: number;
//   currency: string;
//   name: string;
//   description: string;
//   order_id: string;
//   prefill: {
//     name: string;
//     contact: string;
//     email?: string;
//   };
//   theme: {
//     color: string;
//   };
//   modal: {
//     ondismiss: () => void | Promise<void>;
//   };
//   handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
// }
//
// interface RazorpayInstance {
//   open: () => void;
//   on: (
//       event: "payment.failed",
//       callback: (response: RazorpayFailureResponse) => void | Promise<void>
//   ) => void;
// }
//
// interface RazorpayConstructor {
//   new (options: RazorpayOptions): RazorpayInstance;
// }
//
// function CheckoutContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//
//   const checkoutMutation = useCheckout();
//   const createPaymentMutation = useCreatePayment();
//   const verifyPaymentMutation = useVerifyPayment();
//   const handlePaymentFailureMutation = useHandlePaymentFailure();
//
//   const paymentSucceeded = useRef(false);
//
//   const addressId = searchParams.get("addressId");
//
//   const {
//     data: address,
//     isLoading: addressLoading,
//     isError: addressError,
//   } = useAddress(addressId ?? undefined);
//
//   const {
//     data: cart,
//     isLoading: cartLoading,
//     isError: cartError,
//   } = useCart();
//
//   const { data: user } = useCurrentUser();
//
//   async function handlePlaceOrder() {
//     if (!addressId || !address) return;
//
//     paymentSucceeded.current = false;
//
//     try {
//       // 1. Create order in the backend.
//       const order = await checkoutMutation.mutateAsync({
//         addressId,
//       });
//
//       // 2. Initialize Razorpay order.
//       const payment = await createPaymentMutation.mutateAsync({
//         orderId: order.orderId,
//       });
//
//       // 3. Configure Razorpay Checkout.
//       const options: RazorpayOptions = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: payment.amount * 100,
//         currency: payment.currency,
//         name: "BatWoman",
//         description: "Luxury Abaya Purchase",
//         order_id: payment.razorpayOrderId,
//
//         prefill: {
//           name: address.fullName,
//           contact: address.phone,
//           email: user?.email,
//         },
//
//         theme: {
//           color: "#000000",
//         },
//
//         modal: {
//           async ondismiss() {
//             if (paymentSucceeded.current) return;
//
//             try {
//               await handlePaymentFailureMutation.mutateAsync(
//                   payment.paymentId
//               );
//
//               alert("Payment cancelled.");
//             } catch (error) {
//               console.error(
//                   "Failed to release inventory after payment cancellation",
//                   error
//               );
//             }
//           },
//         },
//
//         handler: async (response: RazorpaySuccessResponse) => {
//           try {
//             await verifyPaymentMutation.mutateAsync({
//               paymentId: payment.paymentId,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//             });
//
//             paymentSucceeded.current = true;
//
//             router.push("/customer/orders");
//           } catch (error) {
//             console.error("Payment verification failed", error);
//           }
//         },
//       };
//
//       const Razorpay = (
//           window as Window & { Razorpay: RazorpayConstructor }
//       ).Razorpay;
//
//       const razorpay = new Razorpay(options);
//
//       razorpay.on(
//           "payment.failed",
//           async (response: RazorpayFailureResponse) => {
//             console.error(response.error);
//
//             if (paymentSucceeded.current) return;
//
//             try {
//               await handlePaymentFailureMutation.mutateAsync(
//                   payment.paymentId
//               );
//
//               alert("Payment failed. Please try again.");
//             } catch (error) {
//               console.error(
//                   "Failed to release inventory after payment failure",
//                   error
//               );
//             }
//           }
//       );
//
//       razorpay.open();
//     } catch (error) {
//       console.error("Unable to initiate checkout", error);
//     }
//   }
//
//   if (!addressId) {
//     return (
//         <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center py-36 px-6 text-center">
//           <h1 className="font-[var(--font-playfair)] italic text-3xl font-normal text-neutral-900">
//             No shipping address selected.
//           </h1>
//
//           <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#8C6D4F] font-light">
//             Please select a delivery address to proceed.
//           </p>
//
//           <button
//               type="button"
//               onClick={() => router.push("/customer/address")}
//               className="mt-8 bg-black px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition hover:bg-neutral-800 rounded-none cursor-pointer"
//           >
//             Select Shipping Address
//           </button>
//         </div>
//     );
//   }
//
//   if (addressLoading || cartLoading) {
//     return (
//         <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center py-36 px-6">
//           <p className="font-[var(--font-playfair)] italic text-2xl text-neutral-600">
//             Loading checkout review...
//           </p>
//         </div>
//     );
//   }
//
//   if (addressError || cartError || !address || !cart) {
//     return (
//         <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center py-36 px-6 text-center">
//           <h1 className="font-[var(--font-playfair)] italic text-3xl font-normal text-neutral-900">
//             Unable to Load Checkout
//           </h1>
//
//           <p className="mt-3 text-xs uppercase tracking-[0.2em] text-neutral-400 font-light">
//             We could not load your order details. Please try refreshing.
//           </p>
//
//           <button
//               type="button"
//               onClick={() => router.push("/customer/cart")}
//               className="mt-8 bg-black px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium text-white transition hover:bg-neutral-800 rounded-none cursor-pointer"
//           >
//             Return to Shopping Bag
//           </button>
//         </div>
//     );
//   }
//
//   return (
//       <div className="min-h-screen bg-[#faf8f5] py-12 sm:py-20">
//         <Script
//             src="https://checkout.razorpay.com/v1/checkout.js"
//             strategy="lazyOnload"
//         />
//
//         <main className="mx-auto max-w-7xl px-4 sm:px-8">
//           <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <button
//                 type="button"
//                 onClick={() => router.push("/customer/address")}
//                 className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6D4F] hover:text-black transition cursor-pointer"
//             >
//               <ArrowLeft
//                   size={15}
//                   strokeWidth={1.5}
//                   className="transition-transform group-hover:-translate-x-1"
//               />
//               <span>Back to Shipping Address</span>
//             </button>
//
//             <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em]">
//               <button
//                   type="button"
//                   onClick={() => router.push("/customer/address")}
//                   className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition"
//               >
//                 <Check size={11} className="text-[#6b5541]" />
//                 <span>01 Shipping</span>
//               </button>
//
//               <ChevronRight size={11} className="text-[#cfc6ba]" />
//
//               <span className="font-semibold text-black border-b border-black pb-0.5">
//               02 Review &amp; Pay
//             </span>
//             </div>
//           </div>
//
//           <div className="mb-10 pb-6 border-b border-[#eee8e0]">
//           <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-1">
//             Final Step
//           </span>
//
//             <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900">
//               Order Review &amp; Payment
//             </h1>
//
//             <p className="mt-2 text-xs uppercase tracking-[0.16em] text-neutral-400 font-light">
//               Review delivery details and finalize your acquisition
//             </p>
//           </div>
//
//           <div className="grid gap-8 lg:grid-cols-[1.85fr_1.15fr] items-start">
//             <div className="space-y-6">
//               <CheckoutAddress address={address} />
//               <CheckoutItems items={cart.items} />
//               <PaymentMethod />
//             </div>
//
//             <CheckoutSummary
//                 items={cart.items}
//                 subtotal={cart.subtotal}
//                 shipping={cart.shipping}
//                 total={cart.total}
//                 onPlaceOrder={handlePlaceOrder}
//                 isLoading={
//                     checkoutMutation.isPending ||
//                     createPaymentMutation.isPending
//                 }
//             />
//           </div>
//         </main>
//       </div>
//   );
// }
//
// export default function CheckoutPage() {
//   return (
//       <Suspense
//           fallback={
//             <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center py-36 px-6">
//               <p className="font-[var(--font-playfair)] italic text-2xl text-neutral-600">
//                 Loading checkout...
//               </p>
//             </div>
//           }
//       >
//         <CheckoutContent />
//       </Suspense>
//   );
// }

"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
    ArrowLeft,
    Check,
    ChevronRight,
    Truck,
    RefreshCw,
} from "lucide-react";

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

import {
    getShippingRates,
    CourierOption,
} from "@/services/shipping.service";

interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface RazorpayFailureResponse {
    error: {
        code?: string;
        description?: string;
        source?: string;
        step?: string;
        reason?: string;
        metadata?: {
            order_id?: string;
            payment_id?: string;
        };
    };
}

interface RazorpayOptions {
    key?: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    prefill: {
        name: string;
        contact: string;
        email?: string;
    };
    theme: {
        color: string;
    };
    modal: {
        ondismiss: () => void | Promise<void>;
    };
    handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
}

interface RazorpayInstance {
    open: () => void;
    on: (
        event: "payment.failed",
        callback: (response: RazorpayFailureResponse) => void | Promise<void>
    ) => void;
}

interface RazorpayConstructor {
    new (options: RazorpayOptions): RazorpayInstance;
}

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const checkoutMutation = useCheckout();
    const createPaymentMutation = useCreatePayment();
    const verifyPaymentMutation = useVerifyPayment();
    const handlePaymentFailureMutation = useHandlePaymentFailure();

    const paymentSucceeded = useRef(false);

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

    const [couriers, setCouriers] = useState<CourierOption[]>([]);
    const [selectedCourierId, setSelectedCourierId] = useState<number | null>(null);
    const [ratesLoading, setRatesLoading] = useState(false);
    const [ratesError, setRatesError] = useState("");

    useEffect(() => {
        if (!addressId || !address) return;

        let cancelled = false;

        async function fetchRates() {
            setRatesLoading(true);
            setRatesError("");
            setCouriers([]);
            setSelectedCourierId(null);

            try {
                const response = await getShippingRates(addressId!, false);

                if (cancelled) return;

                const available = response.availableCouriers ?? [];

                setCouriers(available);

                if (available.length === 0) {
                    setRatesError(
                        "No delivery partners are currently available for this address."
                    );
                }
            } catch (error) {
                if (cancelled) return;

                console.error("Unable to fetch shipping rates", error);

                setRatesError(
                    "Unable to load delivery options. Please try again."
                );
            } finally {
                if (!cancelled) {
                    setRatesLoading(false);
                }
            }
        }

        fetchRates();

        return () => {
            cancelled = true;
        };
    }, [addressId, address]);

    const selectedCourier =
        couriers.find(
            (courier) => courier.courierCompanyId === selectedCourierId
        ) ?? null;

    const shippingCharge = selectedCourier
        ? Number(selectedCourier.rate)
        : 0;

    const subtotal = Number(cart?.subtotal ?? 0);
    const total = subtotal + shippingCharge;

    async function handlePlaceOrder() {
        if (!addressId || !address || !selectedCourier) return;

        paymentSucceeded.current = false;

        try {
            // 1. Create the order with the selected courier.
            const order = await checkoutMutation.mutateAsync({
                addressId,
                courierCompanyId: selectedCourier.courierCompanyId,
            });

            // 2. Initialize Razorpay order.
            const payment = await createPaymentMutation.mutateAsync({
                orderId: order.orderId,
            });

            // 3. Configure Razorpay Checkout.
            const options: RazorpayOptions = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: payment.amount * 100,
                currency: payment.currency,
                name: "BatWoman",
                description: "Luxury Abaya Purchase",
                order_id: payment.razorpayOrderId,

                prefill: {
                    name: address.fullName,
                    contact: address.phone,
                    email: user?.email,
                },

                theme: {
                    color: "#000000",
                },

                modal: {
                    async ondismiss() {
                        if (paymentSucceeded.current) return;

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

                handler: async (response: RazorpaySuccessResponse) => {
                    try {
                        await verifyPaymentMutation.mutateAsync({
                            paymentId: payment.paymentId,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                        });

                        paymentSucceeded.current = true;

                        router.push("/customer/orders");
                    } catch (error) {
                        console.error("Payment verification failed", error);
                    }
                },
            };

            const Razorpay = (
                window as Window & { Razorpay: RazorpayConstructor }
            ).Razorpay;

            const razorpay = new Razorpay(options);

            razorpay.on(
                "payment.failed",
                async (response: RazorpayFailureResponse) => {
                    console.error(response.error);

                    if (paymentSucceeded.current) return;

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
                }
            );

            razorpay.open();
        } catch (error) {
            console.error("Unable to initiate checkout", error);
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

                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em]">
                        <button
                            type="button"
                            onClick={() => router.push("/customer/address")}
                            className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition"
                        >
                            <Check size={11} className="text-[#6b5541]" />
                            <span>01 Shipping</span>
                        </button>

                        <ChevronRight size={11} className="text-[#cfc6ba]" />

                        <span className="font-semibold text-black border-b border-black pb-0.5">
                            02 Review &amp; Pay
                        </span>
                    </div>
                </div>

                <div className="mb-10 pb-6 border-b border-[#eee8e0]">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-1">
                        Final Step
                    </span>

                    <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900">
                        Order's Review &amp; Payment
                    </h1>

                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-neutral-400 font-light">
                        Review delivery details and finalize your acquisition
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.85fr_1.15fr] items-start">
                    <div className="space-y-6">
                        <CheckoutAddress address={address} />

                        <CheckoutItems items={cart.items} />

                        {/* SHIPROCKET COURIER SELECTION */}
                        <section className="border border-[#e7e1d8] bg-white p-6 sm:p-8">
                            <div className="mb-6 border-b border-[#eee8e0] pb-5">
                                <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8C6D4F]">
                                    Delivery Options
                                </span>

                                <h2 className="font-[var(--font-playfair)] text-2xl font-normal text-neutral-900">
                                    Choose Your Delivery Partner
                                </h2>

                                <p className="mt-2 text-[11px] tracking-wide text-neutral-400">
                                    Live shipping rates based on your delivery address
                                </p>
                            </div>

                            {ratesLoading && (
                                <div className="flex items-center gap-3 py-6 text-sm text-neutral-500">
                                    <RefreshCw size={16} className="animate-spin" />
                                    Fetching available delivery partners...
                                </div>
                            )}

                            {!ratesLoading && ratesError && (
                                <div className="py-5">
                                    <p className="text-sm text-red-700">
                                        {ratesError}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedCourierId(null);
                                            setRatesError("");
                                            setRatesLoading(true);

                                            getShippingRates(addressId, false)
                                                .then((response) => {
                                                    setCouriers(response.availableCouriers ?? []);

                                                    if (!response.availableCouriers?.length) {
                                                        setRatesError("No delivery partners are currently available for this address.");
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.error("Unable to fetch shipping rates", error);
                                                    setRatesError("Unable to load delivery options. Please try again.");
                                                })
                                                .finally(() => setRatesLoading(false));
                                        }}
                                        className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#8C6D4F] underline underline-offset-4"
                                    >
                                        Retry
                                    </button>
                                </div>
                            )}

                            {!ratesLoading && !ratesError && couriers.length > 0 && (
                                <div className="space-y-3">
                                    {couriers.map((courier) => {
                                        const selected =
                                            selectedCourierId === courier.courierCompanyId;

                                        return (
                                            <button
                                                key={courier.courierCompanyId}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedCourierId(courier.courierCompanyId)
                                                }
                                                className={`w-full border p-4 text-left transition ${
                                                    selected
                                                        ? "border-black bg-[#faf8f5]"
                                                        : "border-[#e7e1d8] hover:border-[#8C6D4F]"
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`flex h-9 w-9 items-center justify-center border ${
                                                            selected
                                                                ? "border-black bg-black text-white"
                                                                : "border-[#e7e1d8] text-[#8C6D4F]"
                                                        }`}>
                                                            {selected ? (
                                                                <Check size={16} />
                                                            ) : (
                                                                <Truck size={16} />
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-900">
                                                                {courier.courierName}
                                                            </p>

                                                            <p className="mt-1 text-[11px] text-neutral-500">
                                                                Estimated delivery: {courier.estimatedDeliveryDays} days
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-neutral-900">
                                                            Rs. {Number(courier.rate).toLocaleString("en-IN")}
                                                        </p>

                                                        {courier.rating != null && (
                                                            <p className="mt-1 text-[10px] text-[#8C6D4F]">
                                                                Rating: {courier.rating}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {courier.estimatedDeliveryDate && (
                                                    <p className="mt-3 pl-12 text-[10px] uppercase tracking-wider text-neutral-400">
                                                        Expected by {courier.estimatedDeliveryDate}
                                                    </p>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        <PaymentMethod />
                    </div>

                    <CheckoutSummary
                        items={cart.items}
                        subtotal={subtotal}
                        shipping={shippingCharge}
                        total={total}
                        onPlaceOrder={handlePlaceOrder}
                        isLoading={
                            checkoutMutation.isPending ||
                            createPaymentMutation.isPending
                        }
                        isPlaceOrderDisabled={
                            ratesLoading ||
                            !selectedCourier ||
                            couriers.length === 0
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
