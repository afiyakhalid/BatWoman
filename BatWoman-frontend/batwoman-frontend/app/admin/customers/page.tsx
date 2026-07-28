"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CustomerSummaryCards from "@/components/admin/customers/CustomerSummaryCards";
import CustomerTable from "@/components/admin/customers/CustomerTable";
import CustomerToolbar from "@/components/admin/customers/CustomerToolbar";

import { useAdminCustomers } from "@/hooks/useAdminCustomers";

import { Customer } from "@/services/adminCustomer.service";

export default function CustomersPage() {

    const router = useRouter();

    const {

        data: customers = [],

        isLoading,

    } = useAdminCustomers();

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");

    const filteredCustomers = useMemo(() => {

        return customers.filter((customer) => {

            const matchesSearch =

                `${customer.firstName} ${customer.lastName}`
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                customer.email
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesFilter = (() => {

                switch (filter) {

                    case "ACTIVE":
                        return customer.active;

                    case "INACTIVE":
                        return !customer.active;

                    case "UNVERIFIED":
                        return !customer.verified;

                    default:
                        return true;

                }

            })();

            return matchesSearch && matchesFilter;

        });

    }, [customers, search, filter]);

    function handleView(customer: Customer) {

        router.push(
            `/admin/customers/${customer.customerId}`
        );

    }

    if (isLoading) {

        return (

            <div className="p-8">

                Loading customers...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="font-[var(--font-playfair)] text-5xl">

                    Customers

                </h1>

                <p className="mt-3 text-neutral-500">

                    View and manage customer accounts.

                </p>

            </div>

            <CustomerSummaryCards
                customers={customers}
            />

            <CustomerToolbar
                search={search}
                onSearchChange={setSearch}
                filter={filter}
                onFilterChange={setFilter}
            />

            <CustomerTable
                customers={filteredCustomers}
                onView={handleView}
            />

        </div>

    );

}