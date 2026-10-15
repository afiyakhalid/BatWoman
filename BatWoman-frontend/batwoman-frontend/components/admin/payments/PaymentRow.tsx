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
        <tr className="border-b border-[#F0EAE1] transition-colors duration-200 last:border-b-0 hover:bg-[#FAF7F1]">
            {/* Payment ID */}
            <td className="whitespace-nowrap px-5 py-5 font-medium text-[#59483A] sm:px-6">
                <span className="rounded-md bg-[#F5EFE5] px-2.5 py-1 font-mono text-xs text-[#80643D]">
                    {payment.paymentId.slice(0, 8)}
                </span>
            </td>

            {/* Razorpay Order ID */}
            <td className="max-w-[220px] px-5 py-5 sm:px-6">
                <span
                    title={payment.razorpayOrderId}
                    className="block truncate text-sm text-[#6F6256]"
                >
                    {payment.razorpayOrderId}
                </span>
            </td>

            {/* Amount */}
            <td className="whitespace-nowrap px-5 py-5 font-semibold tabular-nums text-[#3D3028] sm:px-6">
                ₹{payment.amount.toLocaleString("en-IN")}
            </td>

            {/* Currency */}
            <td className="whitespace-nowrap px-5 py-5 text-sm text-[#7D7063] sm:px-6">
                {payment.currency}
            </td>

            {/* Status */}
            <td className="whitespace-nowrap px-5 py-5 sm:px-6">
                <PaymentStatusBadge status={payment.status} />
            </td>

            {/* Paid At */}
            <td className="whitespace-nowrap px-5 py-5 text-sm text-[#7D7063] sm:px-6">
                {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }
                    )
                    : "—"}
            </td>

            {/* Actions */}
            <td className="whitespace-nowrap px-5 py-5 text-right sm:px-6">
                <button
                    type="button"
                    onClick={() => onView(payment)}
                    aria-label={`View payment ${payment.paymentId}`}
                    title="View payment details"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#EAE3D8] bg-white text-[#80643D] transition hover:border-[#C8AD7E] hover:bg-[#F5EFE5] hover:text-[#59452D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A68] focus-visible:ring-offset-2"
                >
                    <Eye size={17} strokeWidth={1.8} />
                </button>
            </td>
        </tr>
    );
}