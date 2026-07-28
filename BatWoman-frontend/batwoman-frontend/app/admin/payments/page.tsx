"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useAdminPayments } from "@/hooks/useAdminPayments";

import PaymentSummaryCards from "@/components/admin/payments/PaymentSummaryCards";
import PaymentTable from "@/components/admin/payments/PaymentTable";
import PaymentToolbar from "@/components/admin/payments/PaymentToolbar";

export default function PaymentsPage() {

    const router = useRouter();

    const {
        data: payments = [],
        isLoading,
    } = useAdminPayments();

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("ALL");

    const filteredPayments = useMemo(() => {

        return payments.filter((payment) => {

            const matchesSearch =

                (payment.razorpayPaymentId ?? "")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                (payment.razorpayOrderId ?? "")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                payment.orderId
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =

                status === "ALL"
                    ? true
                    : payment.status === status;

            return matchesSearch && matchesStatus;

        });

    }, [payments, search, status]);

    if (isLoading) {

        return (

            <div className="p-8">

                Loading payments...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <PaymentToolbar

                search={search}

                onSearchChange={setSearch}

                status={status}

                onStatusChange={setStatus}

            />

            <PaymentSummaryCards

                payments={payments}

            />

            <PaymentTable

                payments={filteredPayments}

                onView={(payment) =>
                    router.push(
                        `/admin/payments/${payment.paymentId}`
                    )
                }

            />

        </div>

    );

}