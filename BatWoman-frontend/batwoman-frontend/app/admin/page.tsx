"use client";

import {

    DollarSign,

    ShoppingBag,

    Users,

    Package,

    TrendingUp,

    AlertTriangle,

    Star,

} from "lucide-react";

const stats = [

    {
        title: "Revenue",
        value: "₹85,420",
        change: "+14%",
        icon: DollarSign,
    },

    {
        title: "Orders",
        value: "129",
        change: "+9%",
        icon: ShoppingBag,
    },

    {
        title: "Customers",
        value: "67",
        change: "+6%",
        icon: Users,
    },

    {
        title: "Products",
        value: "52",
        change: "+2",
        icon: Package,
    },

];

const recentOrders = [

    {
        id: "#1003",
        customer: "Fatima Noor",
        amount: "₹4,599",
        status: "PAID",
    },

    {
        id: "#1002",
        customer: "Ayesha Khan",
        amount: "₹2,999",
        status: "PAID",
    },

    {
        id: "#1001",
        customer: "Sara Ali",
        amount: "₹3,799",
        status: "PROCESSING",
    },

];

const lowInventory = [

    {

        name: "Luxury Black Abaya",

        stock: 2,

    },

    {

        name: "Royal Blue Abaya",

        stock: 4,

    },

];

const latestReviews = [

    {

        customer: "Fatima",

        rating: 5,

        review: "Excellent stitching and premium fabric.",

    },

    {

        customer: "Sara",

        rating: 5,

        review: "Loved the quality and delivery.",

    },

];

export default function AdminDashboard() {

    return (

        <div className="space-y-10">

            {/* KPI Cards */}

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {stats.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div

                            key={item.title}

                            className="rounded-2xl bg-white p-7 shadow-sm border border-neutral-200"

                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-neutral-500">

                                        {item.title}

                                    </p>

                                    <h2 className="mt-3 text-4xl font-semibold">

                                        {item.value}

                                    </h2>

                                </div>

                                <div className="rounded-xl bg-black p-4">

                                    <Icon

                                        size={22}

                                        className="text-white"

                                    />

                                </div>

                            </div>

                            <div className="mt-6 flex items-center gap-2 text-sm text-green-600">

                                <TrendingUp size={16} />

                                {item.change} this month

                            </div>

                        </div>

                    );

                })}

            </section>

            {/* Middle Section */}

            <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">

                {/* Revenue */}

                <div className="rounded-2xl border border-neutral-200 bg-white p-8">

                    <h2 className="font-[var(--font-playfair)] text-3xl">

                        Revenue Overview

                    </h2>

                    <div className="mt-12 flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-neutral-300">

                        Revenue Chart Coming Soon

                    </div>

                </div>

                {/* Recent Orders */}

                <div className="rounded-2xl border border-neutral-200 bg-white p-8">

                    <h2 className="font-[var(--font-playfair)] text-3xl mb-8">

                        Recent Orders

                    </h2>

                    <div className="space-y-5">

                        {recentOrders.map((order) => (

                            <div

                                key={order.id}

                                className="rounded-xl border border-neutral-200 p-5"

                            >

                                <div className="flex justify-between">

                                    <span className="font-semibold">

                                        {order.id}

                                    </span>

                                    <span className="text-green-600 text-sm">

                                        {order.status}

                                    </span>

                                </div>

                                <p className="mt-2 text-neutral-600">

                                    {order.customer}

                                </p>

                                <p className="mt-2 font-semibold">

                                    {order.amount}

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* Bottom */}

            <section className="grid gap-8 lg:grid-cols-2">

                {/* Inventory */}

                <div className="rounded-2xl border border-neutral-200 bg-white p-8">

                    <h2 className="font-[var(--font-playfair)] text-3xl mb-8">

                        Low Inventory

                    </h2>

                    <div className="space-y-5">

                        {lowInventory.map((item) => (

                            <div

                                key={item.name}

                                className="flex items-center justify-between rounded-xl border border-neutral-200 p-5"

                            >

                                <div>

                                    <p className="font-medium">

                                        {item.name}

                                    </p>

                                    <p className="text-sm text-red-600">

                                        {item.stock} left

                                    </p>

                                </div>

                                <AlertTriangle

                                    className="text-red-500"

                                />

                            </div>

                        ))}

                    </div>

                </div>

                {/* Reviews */}

                <div className="rounded-2xl border border-neutral-200 bg-white p-8">

                    <h2 className="font-[var(--font-playfair)] text-3xl mb-8">

                        Latest Reviews

                    </h2>

                    <div className="space-y-5">

                        {latestReviews.map((review) => (

                            <div

                                key={review.customer}

                                className="rounded-xl border border-neutral-200 p-5"

                            >

                                <div className="flex gap-1 text-yellow-500">

                                    {Array.from({

                                        length: review.rating,

                                    }).map((_, index) => (

                                        <Star

                                            key={index}

                                            size={16}

                                            fill="currentColor"

                                        />

                                    ))}

                                </div>

                                <p className="mt-4">

                                    {review.review}

                                </p>

                                <p className="mt-4 text-sm text-neutral-500">

                                    — {review.customer}

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

        </div>

    );

}