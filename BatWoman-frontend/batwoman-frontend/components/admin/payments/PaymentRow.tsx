"use client";

import { Eye } from "lucide-react";

import PaymentStatusBadge from "./PaymentStatusBadge";

import { Payment } from "@/services/adminPayment.service";

interface PaymentRowProps {

    payment: Payment;

    onView: (payment: Payment) => void;

}

export default function PaymentRow({

    payment,

    onView,

}: PaymentRowProps) {

    return (

        <tr className="border-b border-neutral-200 transition hover:bg-neutral-50">

            {/* Razorpay Payment ID */}

            <td className="px-6 py-5 font-medium">

                {payment.paymentId.slice(0, 8)}

            </td>

            {/* Razorpay Order ID */}

            <td className="px-6 py-5">

                {payment.razorpayOrderId}

            </td>

            {/* Amount */}

            <td className="px-6 py-5">

                ₹{payment.amount.toLocaleString()}

            </td>

            {/* Currency */}

            <td className="px-6 py-5">

                {payment.currency}

            </td>

            {/* Status */}

            <td className="px-6 py-5">

                <PaymentStatusBadge
                    status={payment.status}
                />

            </td>

            {/* Paid At */}

            <td className="px-6 py-5">

                {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleDateString()
                    : "-"}

            </td>

            <td className="px-6 py-5 text-right">

                <button
                    onClick={() => onView(payment)}
                    className="rounded-lg p-2 transition hover:bg-neutral-100"
                >

                    <Eye size={18} />

                </button>

            </td>

        </tr>

    );

}