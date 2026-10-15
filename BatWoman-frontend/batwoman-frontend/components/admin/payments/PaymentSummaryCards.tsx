"use client";

import {
    CreditCard,
    DollarSign,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import { Payment } from "@/services/adminPayment.service";

interface PaymentSummaryCardsProps {
    payments: Payment[];
}

export default function PaymentSummaryCards({
                                                payments,
                                            }: PaymentSummaryCardsProps) {
    const totalPayments = payments.length;

    const successfulPayments = payments.filter(
        (payment) => payment.status === "SUCCESS"
    ).length;

    const pendingPayments = payments.filter(
        (payment) => payment.status === "PENDING"
    ).length;

    const totalRevenue = payments
        .filter((payment) => payment.status === "SUCCESS")
        .reduce(
            (sum, payment) => sum + payment.amount,
            0
        );

    const cards = [
        {
            title: "Total Payments",
            value: totalPayments.toLocaleString("en-IN"),
            icon: CreditCard,
        },
        {
            title: "Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            icon: DollarSign,
        },
        {
            title: "Successful",
            value: successfulPayments.toLocaleString("en-IN"),
            icon: CheckCircle2,
        },
        {
            title: "Pending",
            value: pendingPayments.toLocaleString("en-IN"),
            icon: Clock3,
        },
    ];

    return (
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] transition duration-200 hover:border-[#D9C6A5] hover:shadow-[0_6px_20px_rgba(61,48,40,0.06)] sm:p-6"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8A7A6C]">
                                    {card.title}
                                </p>

                                <h2 className="mt-4 break-words text-2xl font-semibold tracking-tight text-[#3D3028] tabular-nums sm:text-3xl">
                                    {card.value}
                                </h2>
                            </div>

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C]">
                                <Icon
                                    size={21}
                                    strokeWidth={1.7}
                                />
                            </div>
                        </div>

                        <div className="mt-5 h-px bg-[#F0EAE1]" />

                        <p className="mt-3 text-xs text-[#9A8B7B]">
                            {card.title === "Revenue"
                                ? "From successful payments"
                                : card.title === "Successful"
                                    ? "Payments completed"
                                    : card.title === "Pending"
                                        ? "Awaiting completion"
                                        : "Across all payment statuses"}
                        </p>
                    </div>
                );
            })}
        </section>
    );
}