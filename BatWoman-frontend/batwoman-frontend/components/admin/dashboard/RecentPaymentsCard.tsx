"use client";

import { RecentPayment } from "@/services/adminDashboard.service";

interface RecentPaymentsCardProps {

    payments: RecentPayment[];

}

export default function RecentPaymentsCard({

    payments,

}: RecentPaymentsCardProps) {

    return (

        <div className="rounded-2xl border border-neutral-200 bg-white p-8">

            <h2 className="font-[var(--font-playfair)] text-3xl">

                Recent Payments

            </h2>

            <p className="mt-2 text-neutral-500">

                Latest successful customer payments.

            </p>

            <div className="mt-8 space-y-5">

                {payments.length === 0 ? (

                    <p className="text-neutral-500">

                        No payments found.

                    </p>

                ) : (

                    payments.map((payment) => (

                        <div

                            key={payment.paymentId}

                            className="rounded-xl border border-neutral-200 p-5"

                        >

                            <div className="flex items-center justify-between">

                                <h3 className="font-semibold">

                                    {payment.orderNumber}

                                </h3>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                                    {payment.status}

                                </span>

                            </div>

                            <p className="mt-3 text-sm text-neutral-500">

                                {payment.razorpayPaymentId}

                            </p>

                            <div className="mt-4 flex items-center justify-between">

                                <p className="font-semibold">

                                    ₹{payment.amount.toLocaleString()}

                                </p>

                                <p className="text-sm text-neutral-500">

                                    {payment.paidAt
                                        ? new Date(payment.paidAt).toLocaleDateString()
                                        : "-"}

                                </p>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}