"use client";

import { ReactNode } from "react";

import { TrendingUp } from "lucide-react";

interface DashboardStatCardProps {

    title: string;

    value: string | number;

    icon: ReactNode;

    change?: string;

}

export default function DashboardStatCard({

    title,

    value,

    icon,

    change,

}: DashboardStatCardProps) {

    return (

        <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-neutral-500">

                        {title}

                    </p>

                    <h2 className="mt-3 text-4xl font-semibold">

                        {value}

                    </h2>

                </div>

                <div className="rounded-xl bg-black p-4">

                    {icon}

                </div>

            </div>

            {change && (

                <div className="mt-6 flex items-center gap-2 text-sm text-green-600">

                    <TrendingUp size={16} />

                    {change}

                </div>

            )}

        </div>

    );

}