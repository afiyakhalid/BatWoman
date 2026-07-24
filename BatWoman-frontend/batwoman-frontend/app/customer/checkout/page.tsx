"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";

import CheckoutAddress from "@/components/checkout/CheckoutAddress";
import CheckoutItems from "@/components/checkout/CheckoutItems";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import { useCheckout } from "@/hooks/useOrders";
import { useCreatePayment, useVerifyPayment } from "@/hooks/usePayments";

import { useAddress } from "@/hooks/useAddresses";
import { useCart } from "@/hooks/useCart";

export default function CheckoutPage() {

    const searchParams = useSearchParams();
    const checkoutMutation = useCheckout();
    const createPaymentMutation = useCreatePayment();
    const verifyPaymentMutation = useVerifyPayment();

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

    async function handlePlaceOrder() {
        if (!addressId) return;

        try {
            // 1. Create Order in local backend
            const order = await checkoutMutation.mutateAsync({
                addressId,
            });

            // 2. Pass backend order ID to initialize Razorpay Order payload
            const payment = await createPaymentMutation.mutateAsync({
                orderId: order.orderId,
            });

            // 3. Configure Checkout Options
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
                },
                theme: {
                    color: "#000000",
                },
                handler: async function (response: any) {
                    try {
                        await verifyPaymentMutation.mutateAsync({
                            paymentId: payment.paymentId,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                        });

                        console.log("Payment verified successfully.");
                        
                        // We'll redirect to success page later
                        // router.push("/customer/orders/success");
                    } catch (error) {
                        console.error("Payment verification failed", error);
                    }
                }
            };

            // Using type assertion (window as any) to keep TypeScript happy 
            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error(error);
        }
    }

    if (!addressId) {
        return (
            <section className="mx-auto max-w-6xl px-6 py-32 text-center">
                <h1 className="text-3xl font-semibold">
                    No shipping address selected.
                </h1>
            </section>
        );
    }

    if (addressLoading || cartLoading) {
        return (
            <section className="mx-auto max-w-6xl px-6 py-32 text-center">
                Loading checkout...
            </section>
        );
    }

    if (addressError || cartError || !address || !cart) {
        return (
            <section className="mx-auto max-w-6xl px-6 py-32 text-center">
                Failed to load checkout.
            </section>
        );
    }

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
            />
            
            <section className="mx-auto max-w-7xl px-6 pt-36 pb-24">
                <div className="mb-14">
                    <h1 className="font-[var(--font-playfair)] text-5xl">
                        Checkout
                    </h1>
                    <p className="mt-4 text-neutral-500">
                        Review your order before proceeding to payment.
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
                    <div className="space-y-10">
                        <CheckoutAddress address={address} />
                        <CheckoutItems items={cart.items} />
                        <PaymentMethod />
                    </div>

                    <CheckoutSummary
                        subtotal={cart.subtotal}
                        shipping={cart.shipping}
                        total={cart.total}
                        onPlaceOrder={handlePlaceOrder}
                        // Loading stays active throughout backend tasks
                        isLoading={checkoutMutation.isPending || createPaymentMutation.isPending}
                    />
                </div>
            </section>
        </>
    );
}