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
            value: totalPayments,
            icon: CreditCard,
        },

        {
            title: "Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
        },

        {
            title: "Successful",
            value: successfulPayments,
            icon: CheckCircle2,
        },

        {
            title: "Pending",
            value: pendingPayments,
            icon: Clock3,
        },

    ];

    return (

        <section className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-neutral-500">

                                    {card.title}

                                </p>

                                <h2 className="mt-3 text-4xl font-semibold">

                                    {card.value}

                                </h2>

                            </div>

                            <div className="rounded-xl bg-black p-4">

                                <Icon
                                    size={22}
                                    className="text-white"
                                />

                            </div>

                        </div>

                    </div>

                );

            })}

        </section>

    );

}