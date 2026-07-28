"use client";

import { Payment } from "@/services/adminPayment.service";

import PaymentRow from "./PaymentRow";

interface PaymentTableProps {

    payments: Payment[];

    onView: (payment: Payment) => void;

}

export default function PaymentTable({

    payments,

    onView,

}: PaymentTableProps) {

    return (

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-neutral-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                                Payment ID
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                                Razorpay Order ID
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                                Amount
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                                Currency
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                                Paid At
                            </th>

                            <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wide text-neutral-500">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {payments.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="px-6 py-16 text-center text-neutral-500"
                                >
                                    No payments found.
                                </td>

                            </tr>

                        ) : (

                            payments.map((payment) => (

                                <PaymentRow
                                    key={payment.paymentId}
                                    payment={payment}
                                    onView={onView}
                                />

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}