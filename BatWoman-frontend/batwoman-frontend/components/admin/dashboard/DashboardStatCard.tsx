"use client";

import type { ReactNode } from "react";
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
        <article className="group relative min-w-0 overflow-hidden rounded-2xl border border-[#E7DDD0] bg-[#FFFDFA] p-5 shadow-[0_2px_8px_rgba(70,50,30,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C3A6] hover:shadow-[0_12px_28px_rgba(70,50,30,0.08)] sm:p-6 lg:p-7">
            {/* Subtle luxury accent */}
            <div className="absolute right-0 top-0 h-1 w-16 rounded-bl-full bg-gradient-to-l from-[#B69A73] to-transparent opacity-70 transition-all duration-300 group-hover:w-24" />

            <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#92816D] sm:text-sm sm:normal-case sm:tracking-normal">
                        {title}
                    </p>

                    <h2 className="mt-2 break-words font-[var(--font-playfair)] text-3xl font-medium leading-tight tracking-tight text-[#30271F] sm:mt-3 sm:text-4xl">
                        {value}
                    </h2>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E6D8C5] bg-[#F1E7D9] text-[#8D6B43] transition-all duration-300 group-hover:border-[#C9AD87] group-hover:bg-[#E9D8C0] sm:h-14 sm:w-14">
          <span className="[&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-[22px] sm:[&>svg]:w-[22px] [&>svg]:text-[#8D6B43]">
            {icon}
          </span>
                </div>
            </div>

            {change && (
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#EEE5DA] pt-4 text-xs text-[#6D8062] sm:text-sm">
                    <TrendingUp size={15} strokeWidth={1.8} />

                    <span>{change}</span>
                </div>
            )}

            {/* Decorative background detail */}
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-20 w-20 rounded-full border border-[#DCC9AD]/20 transition-transform duration-500 group-hover:scale-125" />
        </article>
    );
}