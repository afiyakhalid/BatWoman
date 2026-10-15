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
        <div className="overflow-hidden rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] shadow-[0_2px_10px_rgba(61,48,40,0.03)]">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] border-collapse text-left">
                    <thead className="bg-[#F7F2EA]">
                    <tr>
                        {[
                            "Customer",
                            "Email",
                            "Phone",
                            "Orders",
                            "Status",
                            "Joined",
                        ].map((heading) => (
                            <th
                                key={heading}
                                className="whitespace-nowrap border-b border-[#EAE3D8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#897968] sm:px-6"
                            >
                                {heading}
                            </th>
                        ))}

                        <th className="whitespace-nowrap border-b border-[#EAE3D8] px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-[#897968] sm:px-6">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {customers.length === 0 ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="px-6 py-16 text-center"
                            >
                                <p className="text-sm font-medium text-[#59483A]">
                                    No customers found
                                </p>
                                <p className="mt-1 text-xs text-[#9A8B7B]">
                                    Try adjusting your search or filters.
                                </p>
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