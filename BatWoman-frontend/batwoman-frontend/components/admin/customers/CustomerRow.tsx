"use client";

import { Eye } from "lucide-react";

import CustomerStatusBadge from "./CustomerStatusBadge";
import { Customer } from "@/services/adminCustomer.service";

interface CustomerRowProps {
    customer: Customer;
    onView: (customer: Customer) => void;
}

export default function CustomerRow({
                                        customer,
                                        onView,
                                    }: CustomerRowProps) {
    return (
        <tr className="border-b border-[#EAE3D8] transition-colors duration-200 hover:bg-[#FAF7F2]">
            <td className="whitespace-nowrap px-5 py-5 font-medium text-[#3D3028] sm:px-6">
                {customer.firstName} {customer.lastName}
            </td>

            <td className="whitespace-nowrap px-5 py-5 text-sm text-[#75675C] sm:px-6">
                {customer.email}
            </td>

            <td className="whitespace-nowrap px-5 py-5 text-sm text-[#75675C] sm:px-6">
                {customer.phone || "-"}
            </td>

            <td className="px-5 py-5 text-sm font-medium tabular-nums text-[#3D3028] sm:px-6">
                {customer.totalOrders}
            </td>

            <td className="whitespace-nowrap px-5 py-5 sm:px-6">
                <CustomerStatusBadge
                    active={customer.active}
                    verified={customer.verified}
                />
            </td>

            <td className="whitespace-nowrap px-5 py-5 text-sm text-[#75675C] sm:px-6">
                {new Date(customer.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </td>

            <td className="px-5 py-5 text-right sm:px-6">
                <button
                    type="button"
                    onClick={() => onView(customer)}
                    aria-label={`View ${customer.firstName} ${customer.lastName}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5D8C4] bg-white text-[#806744] transition-colors duration-200 hover:border-[#B99A65] hover:bg-[#F5EFE5] hover:text-[#59452F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65] focus-visible:ring-offset-2"
                >
                    <Eye size={17} strokeWidth={1.8} />
                </button>
            </td>
        </tr>
    );
}