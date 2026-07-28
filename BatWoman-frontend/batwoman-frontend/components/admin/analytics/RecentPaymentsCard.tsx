"use client";

import { CreditCard } from "lucide-react";

import { RecentPayment } from "@/services/adminAnalytics.service";

interface RecentPaymentsCardProps {

    payments: RecentPayment[];

}

export default function RecentPaymentsCard({

    payments,

}: RecentPaymentsCardProps) {

    return (

        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-semibold">

                        Recent Payments

                    </h2>

                    <p className="mt-2 text-neutral-500">

                        Latest successful transactions.

                    </p>

                </div>

                <CreditCard className="text-neutral-400" />

            </div>

            <div className="space-y-5">

                {payments.map((payment) => (

                    <div
                        key={payment.paymentId}
                        className="flex items-center justify-between rounded-2xl border border-neutral-100 p-4 transition hover:bg-neutral-50"
                    >

                        <div>

                            <h3 className="font-semibold">

                                {payment.orderNumber}

                            </h3>

                            <p className="text-sm text-neutral-500">

                                {payment.razorpayPaymentId}

                            </p>

                        </div>

                        <div className="text-right">

                            <p className="font-semibold">

                                ₹{payment.amount.toLocaleString()}

                            </p>

                            <span className="text-xs uppercase tracking-wide text-neutral-500">

                                {payment.status}

                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}