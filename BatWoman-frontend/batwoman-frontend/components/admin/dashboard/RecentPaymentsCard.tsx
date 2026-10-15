"use client";

import {
    CreditCard,
    Clock3,
    CheckCircle2,
    Receipt,
} from "lucide-react";

import type { RecentPayment } from "@/services/adminDashboard.service";

interface RecentPaymentsCardProps {
    payments: RecentPayment[];
}

function getPaymentStatusStyles(status: string) {
    const normalizedStatus = status.toUpperCase();

    if (
        normalizedStatus === "SUCCESS" ||
        normalizedStatus === "SUCCESSFUL" ||
        normalizedStatus === "CAPTURED" ||
        normalizedStatus === "COMPLETED"
    ) {
        return "border-[#D7E5D2] bg-[#EDF4E9] text-[#56734D]";
    }

    if (
        normalizedStatus === "FAILED" ||
        normalizedStatus === "CANCELLED"
    ) {
        return "border-[#EAD1CC] bg-[#F8EBE8] text-[#A34E3E]";
    }

    if (
        normalizedStatus === "PENDING" ||
        normalizedStatus === "PROCESSING" ||
        normalizedStatus === "AUTHORIZED"
    ) {
        return "border-[#E8D8B9] bg-[#F8F0DF] text-[#96733E]";
    }

    return "border-[#E7DDD0] bg-[#F5EFE7] text-[#796954]";
}

export default function RecentPaymentsCard({
                                               payments,
                                           }: RecentPaymentsCardProps) {
    return (
        <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E7DDD0] bg-[#FFFDFA] p-4 shadow-[0_2px_8px_rgba(70,50,30,0.04)] sm:p-6 lg:p-7">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A18A6E]">
                        Payment activity
                    </p>

                    <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-[#30271F] sm:text-3xl">
                        Recent Payments
                    </h2>

                    <p className="mt-2 text-xs leading-relaxed text-[#8B8174] sm:text-sm">
                        Latest customer payments.
                    </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E6D8C5] bg-[#F1E7D9] text-[#8D6B43]">
                    <CreditCard size={18} strokeWidth={1.7} />
                </div>
            </div>

            {/* Payments */}
            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                {payments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E5D8C6] bg-[#FBF8F3] px-4 py-10 text-center">
                        <Receipt
                            size={26}
                            strokeWidth={1.4}
                            className="text-[#B29A7B]"
                        />

                        <p className="mt-3 text-sm font-medium text-[#5F5142]">
                            No payments found
                        </p>

                        <p className="mt-1 text-xs text-[#9A8C7C]">
                            Customer payment records will appear here.
                        </p>
                    </div>
                ) : (
                    payments.map((payment) => (
                        <article
                            key={payment.paymentId}
                            className="min-w-0 rounded-xl border border-[#EAE0D4] bg-white p-3.5 transition-colors duration-200 hover:border-[#D8C3A6] sm:p-4"
                        >
                            {/* Order number and status */}
                            <div className="flex min-w-0 items-start justify-between gap-2">
                                <div className="flex min-w-0 items-center gap-2">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5EDE2] text-[#8D6B43]">
                                        <CreditCard size={14} />
                                    </div>

                                    <h3 className="min-w-0 break-words text-sm font-semibold text-[#30271F]">
                                        {payment.orderNumber}
                                    </h3>
                                </div>

                                <span
                                    className={`shrink-0 rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-wide sm:px-2.5 sm:text-[10px] ${getPaymentStatusStyles(
                                        payment.status
                                    )}`}
                                >
                  {payment.status}
                </span>
                            </div>

                            {/* Razorpay payment ID */}
                            <div className="mt-3 rounded-lg bg-[#FBF8F3] px-3 py-2">
                                <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#A09484]">
                                    Razorpay payment ID
                                </p>

                                <p
                                    title={payment.razorpayPaymentId}
                                    className="mt-1 break-all font-mono text-[10px] leading-relaxed text-[#796954] sm:text-xs"
                                >
                                    {payment.razorpayPaymentId || "Not available"}
                                </p>
                            </div>

                            {/* Amount and paid date */}
                            <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-[#F0E8DE] pt-3">
                                <div>
                                    <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#A09484]">
                                        Payment amount
                                    </p>

                                    <p className="mt-1 text-base font-semibold text-[#30271F] sm:text-lg">
                                        ₹
                                        {Number(payment.amount).toLocaleString("en-IN")}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1.5 text-[10px] text-[#92816D] sm:text-xs">
                                    {payment.paidAt ? (
                                        <>
                                            <CheckCircle2
                                                size={13}
                                                className="shrink-0 text-[#718766]"
                                            />

                                            <time dateTime={payment.paidAt}>
                                                {new Date(payment.paidAt).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </time>
                                        </>
                                    ) : (
                                        <>
                                            <Clock3 size={13} className="shrink-0" />
                                            <span>Not paid yet</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}