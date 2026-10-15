"use client";

import { CreditCard } from "lucide-react";

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
        <div className="overflow-hidden rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] shadow-[0_2px_12px_rgba(61,48,40,0.03)]">
            <div className="flex flex-col gap-3 border-b border-[#EAE3D8] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                    <h2 className="font-[var(--font-playfair)] text-xl text-[#3D3028] sm:text-2xl">
                        Payment Transactions
                    </h2>

                    <p className="mt-1 text-sm text-[#8A7A6C]">
                        Review payment records and transaction details.
                    </p>
                </div>

                <span className="inline-flex w-fit items-center rounded-full border border-[#E8DCC7] bg-[#F5EFE5] px-3 py-1.5 text-xs font-medium text-[#80643D]">
                    {payments.length}{" "}
                    {payments.length === 1 ? "payment" : "payments"}
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                    <thead className="border-b border-[#EAE3D8] bg-[#F7F3EC]">
                    <tr>
                        <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7A6C] sm:px-6">
                            Payment ID
                        </th>

                        <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7A6C] sm:px-6">
                            Razorpay Order ID
                        </th>

                        <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7A6C] sm:px-6">
                            Amount
                        </th>

                        <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7A6C] sm:px-6">
                            Currency
                        </th>

                        <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7A6C] sm:px-6">
                            Status
                        </th>

                        <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7A6C] sm:px-6">
                            Paid At
                        </th>

                        <th className="px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7A6C] sm:px-6">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {payments.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-20">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#EAE3D8] bg-[#F7F3EC] text-[#A58A60]">
                                        <CreditCard
                                            size={25}
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    <h3 className="mt-5 font-[var(--font-playfair)] text-xl text-[#3D3028]">
                                        No Payments Found
                                    </h3>

                                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#8A7A6C]">
                                        Payment transactions will appear
                                        here when records are available.
                                    </p>
                                </div>
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

            {payments.length > 0 && (
                <div className="border-t border-[#EAE3D8] bg-[#FCFAF6] px-5 py-3 sm:px-6">
                    <p className="text-xs text-[#9A8B7B]">
                        Showing {payments.length}{" "}
                        {payments.length === 1
                            ? "transaction"
                            : "transactions"}
                    </p>
                </div>
            )}
        </div>
    );
}