"use client";

import { useParams } from "next/navigation";

import { useAdminPayment } from "@/hooks/useAdminPayment";

import PaymentStatusBadge from "@/components/admin/payments/PaymentStatusBadge";

export default function PaymentDetailsPage() {

    const params = useParams();

    const id = params.id as string;

    const {

        data: payment,

        isLoading,

    } = useAdminPayment(id);

    if (isLoading) {

        return (

            <div className="p-8">

                Loading payment...

            </div>

        );

    }

    if (!payment) {

        return (

            <div className="p-8">

                Payment not found.

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="font-[var(--font-playfair)] text-5xl">

                    Payment Details

                </h1>

                <p className="mt-3 text-neutral-500">

                    View complete payment information.

                </p>

            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-8">

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                    <div>

                        <p className="text-sm text-neutral-500">

                            Payment ID

                        </p>

                        <p className="mt-2 font-medium break-all">

                            {payment.paymentId}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Order ID

                        </p>

                        <p className="mt-2 font-medium break-all">

                            {payment.orderId}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Razorpay Order ID

                        </p>

                        <p className="mt-2 font-medium break-all">

                            {payment.razorpayOrderId}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Razorpay Payment ID

                        </p>

                        <p className="mt-2 font-medium break-all">

                            {payment.razorpayPaymentId ?? "-"}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Amount

                        </p>

                        <p className="mt-2 font-medium">

                            ₹{payment.amount.toLocaleString()}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Currency

                        </p>

                        <p className="mt-2 font-medium">

                            {payment.currency}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Status

                        </p>

                        <div className="mt-2">

                            <PaymentStatusBadge
                                status={payment.status}
                            />

                        </div>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Paid At

                        </p>

                        <p className="mt-2 font-medium">

                            {payment.paidAt
                                ? new Date(payment.paidAt).toLocaleString()
                                : "-"}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}