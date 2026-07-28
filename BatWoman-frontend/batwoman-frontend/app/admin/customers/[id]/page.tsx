"use client";

import { useParams } from "next/navigation";

import CustomerStatusBadge from "@/components/admin/customers/CustomerStatusBadge";

import { useAdminCustomer } from "@/hooks/useAdminCustomer";

export default function CustomerDetailsPage() {

    const params = useParams();

    const customerId = params.id as string;

    const {

        data: customer,

        isLoading,

    } = useAdminCustomer(customerId);

    if (isLoading) {

        return (

            <div className="p-8">

                Loading customer...

            </div>

        );

    }

    if (!customer) {

        return (

            <div className="p-8">

                Customer not found.

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="font-[var(--font-playfair)] text-5xl">

                    Customer Details

                </h1>

                <p className="mt-3 text-neutral-500">

                    View customer profile information.

                </p>

            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">

                <div className="grid gap-6 md:grid-cols-2">

                    <div>

                        <p className="text-sm text-neutral-500">

                            Full Name

                        </p>

                        <p className="mt-1 text-lg font-semibold">

                            {customer.firstName} {customer.lastName}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Email

                        </p>

                        <p className="mt-1 text-lg font-semibold">

                            {customer.email}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Phone

                        </p>

                        <p className="mt-1 text-lg font-semibold">

                            {customer.phone || "-"}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Role

                        </p>

                        <p className="mt-1 text-lg font-semibold">

                            {customer.role}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Total Orders

                        </p>

                        <p className="mt-1 text-lg font-semibold">

                            {customer.totalOrders}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Joined

                        </p>

                        <p className="mt-1 text-lg font-semibold">

                            {new Date(
                                customer.createdAt
                            ).toLocaleDateString()}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-neutral-500">

                            Status

                        </p>

                        <div className="mt-2">

                            <CustomerStatusBadge
                                active={customer.active}
                                verified={customer.verified}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}