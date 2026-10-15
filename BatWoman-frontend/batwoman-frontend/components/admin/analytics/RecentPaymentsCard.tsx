"use client";

import { CreditCard, ArrowUpRight } from "lucide-react";

import {
    RecentPayment,
} from "@/services/adminAnalytics.service";

interface RecentPaymentsCardProps {
    payments: RecentPayment[];
}

export default function RecentPaymentsCard({
                                               payments,
                                           }: RecentPaymentsCardProps) {
    return (
        <section className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
                <div>
                    <h2 className="font-[var(--font-playfair)] text-2xl text-[#3D3028] sm:text-3xl">
                        Recent Payments
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#8A7A6C]">
                        Latest successful transactions.
                    </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C]">
                    <CreditCard size={20} />
                </div>
            </div>

            <div className="space-y-3">
                {payments.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#E5DCCE] bg-[#FAF7F2] px-4 py-10 text-center">
                        <CreditCard
                            size={25}
                            strokeWidth={1.5}
                            className="mx-auto text-[#B5A48F]"
                        />

                        <p className="mt-3 text-sm font-medium text-[#59483A]">
                            No recent payments
                        </p>

                        <p className="mt-1 text-xs text-[#9A8B7B]">
                            Recent transactions will appear here.
                        </p>
                    </div>
                ) : (
                    payments.map((payment) => (
                        <div
                            key={payment.paymentId}
                            className="flex items-center justify-between gap-3 rounded-xl border border-[#EEE7DD] bg-white p-4 transition-colors hover:border-[#D9C6A5] hover:bg-[#FCF9F3] sm:gap-4"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F5EFE5] text-[#94764C]">
                                    <ArrowUpRight size={18} />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-semibold text-[#3D3028]">
                                        {payment.orderNumber}
                                    </h3>

                                    <p className="mt-1 max-w-[180px] truncate text-xs text-[#8A7A6C]">
                                        {payment.razorpayPaymentId}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 text-right">
                                <p className="text-sm font-semibold tabular-nums text-[#3D3028] sm:text-base">
                                    ₹{(payment.amount ?? 0).toLocaleString("en-IN")}
                                </p>

                                <span className="mt-1 inline-block max-w-[130px] truncate text-[10px] font-semibold uppercase tracking-wider text-[#94764C]">
                                    {payment.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}