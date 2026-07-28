"use client";

import {

    Users,

    UserCheck,

    UserX,

    ShoppingBag,

} from "lucide-react";

import { Customer } from "@/services/adminCustomer.service";

interface CustomerSummaryCardsProps {

    customers: Customer[];

}

export default function CustomerSummaryCards({

    customers,

}: CustomerSummaryCardsProps) {

    const totalCustomers = customers.length;

    const activeCustomers = customers.filter(

        (customer) => customer.active

    ).length;

    const inactiveCustomers = customers.filter(

        (customer) => !customer.active

    ).length;

    const totalOrders = customers.reduce(

        (sum, customer) => sum + customer.totalOrders,

        0

    );

    const cards = [

        {

            title: "Customers",

            value: totalCustomers,

            icon: Users,

        },

        {

            title: "Active",

            value: activeCustomers,

            icon: UserCheck,

        },

        {

            title: "Inactive",

            value: inactiveCustomers,

            icon: UserX,

        },

        {

            title: "Orders",

            value: totalOrders,

            icon: ShoppingBag,

        },

    ];

    return (

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

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