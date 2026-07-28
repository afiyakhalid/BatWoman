"use client";

import { Customer } from "@/services/adminCustomer.service";

import CustomerRow from "./CustomerRow";

interface CustomerTableProps {

    customers: Customer[];

    onView: (customer: Customer) => void;

}

export default function CustomerTable({

    customers,

    onView,

}: CustomerTableProps) {

    return (

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-neutral-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">

                                Customer

                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">

                                Email

                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">

                                Phone

                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">

                                Orders

                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">

                                Status

                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">

                                Joined

                            </th>

                            <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wide text-neutral-500">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {customers.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="px-6 py-16 text-center text-neutral-500"
                                >

                                    No customers found.

                                </td>

                            </tr>

                        ) : (

                            customers.map((customer) => (

                                <CustomerRow

                                    key={customer.customerId}

                                    customer={customer}

                                    onView={onView}

                                />

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}