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
        <div className="group relative overflow-hidden rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D9C6A5] hover:shadow-[0_8px_24px_rgba(61,48,40,0.07)] sm:p-7">
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#F5EFE5] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#8A7A6C]">
                        {title}
                    </p>

                    <h2 className="mt-4 break-words text-3xl font-semibold tracking-tight text-[#3D3028] sm:text-4xl">
                        {value}
                    </h2>

                    <div className="mt-4 flex items-start gap-2 text-sm text-[#806744]">
                        <ArrowUpRight
                            size={16}
                            className="mt-0.5 shrink-0"
                        />
                        <span className="leading-5">{subtitle}</span>
                    </div>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C] sm:h-14 sm:w-14">
                    {icon}
                </div>
            </div>

            <div className="relative mt-6 h-px bg-[#EEE7DD]" />
        </div>
    );
}