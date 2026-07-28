"use client";

import { ArrowUpRight } from "lucide-react";

interface AnalyticsStatCardProps {

    title: string;

    value: string | number;

    subtitle: string;

    icon: React.ReactNode;

}

export default function AnalyticsStatCard({

    title,

    value,

    subtitle,

    icon,

}: AnalyticsStatCardProps) {

    return (

        <div className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 opacity-0 transition group-hover:opacity-100" />

            <div className="relative flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">

                        {title}

                    </p>

                    <h2 className="mt-4 text-5xl font-bold tracking-tight">

                        {value}

                    </h2>

                    <div className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-600">

                        <ArrowUpRight size={16} />

                        {subtitle}

                    </div>

                </div>

                <div className="rounded-2xl bg-black p-4 text-white shadow-lg">

                    {icon}

                </div>

            </div>

        </div>

    );

}