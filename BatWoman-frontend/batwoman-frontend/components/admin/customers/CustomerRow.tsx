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

        <tr className="border-b border-neutral-200 transition hover:bg-neutral-50">

            <td className="px-6 py-5 font-medium">

                {customer.firstName} {customer.lastName}

            </td>

            <td className="px-6 py-5">

                {customer.email}

            </td>

            <td className="px-6 py-5">

                {customer.phone || "-"}

            </td>

            <td className="px-6 py-5">

                {customer.totalOrders}

            </td>

            <td className="px-6 py-5">

                <CustomerStatusBadge

                    active={customer.active}

                    verified={customer.verified}

                />

            </td>

            <td className="px-6 py-5">

                {new Date(
                    customer.createdAt
                ).toLocaleDateString()}

            </td>

            <td className="px-6 py-5 text-right">

                <button
                    onClick={() => onView(customer)}
                    className="rounded-lg p-2 transition hover:bg-neutral-100"
                >

                    <Eye size={18} />

                </button>

            </td>

        </tr>

    );

}