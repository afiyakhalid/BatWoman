"use client";

import { cn } from "@/lib/utils";

interface CustomerStatusBadgeProps {

    active: boolean;

    verified: boolean;

}

export default function CustomerStatusBadge({

    active,

    verified,

}: CustomerStatusBadgeProps) {

    let label = "";

    let style = "";

    if (!active) {

        label = "INACTIVE";

        style =
            "bg-red-100 text-red-800 border-red-200";

    } else if (!verified) {

        label = "UNVERIFIED";

        style =
            "bg-yellow-100 text-yellow-800 border-yellow-200";

    } else {

        label = "ACTIVE";

        style =
            "bg-green-100 text-green-800 border-green-200";

    }

    return (

        <span
            className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                style
            )}
        >

            {label}

        </span>

    );

}