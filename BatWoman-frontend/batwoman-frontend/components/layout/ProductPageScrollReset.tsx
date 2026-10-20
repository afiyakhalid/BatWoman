"use client";

import { useEffect } from "react";

export default function ProductPageScrollReset() {
    useEffect(() => {
        const root = document.documentElement;
        const previousBehavior = root.style.scrollBehavior;

        root.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);

        return () => {
            root.style.scrollBehavior = previousBehavior;
        };
    }, []);

    return null;
}