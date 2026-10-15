import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
                      className,
                      ...props
                  }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "flex field-sizing-content min-h-28 w-full min-w-0 rounded-xl border border-[#E4D9CA] bg-white px-3 py-3 text-sm text-[#35291F] shadow-sm transition-colors outline-none",
                "placeholder:text-[#B3A696]",
                "focus-visible:border-[#A68A64] focus-visible:ring-2 focus-visible:ring-[#A68A64]/25",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
                "dark:bg-white dark:text-[#35291F]",
                className
            )}
            {...props}
        />
    );
}

export { Textarea };