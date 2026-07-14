"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    footerText: string;
    footerLinkText: string;
    footerLinkHref: string;
}

export default function AuthLayout({
                                       title,
                                       subtitle,
                                       children,
                                       footerText,
                                       footerLinkText,
                                       footerLinkHref,
                                   }: AuthLayoutProps) {
    return (
        <main className="min-h-screen flex items-center justify-center bg-white px-6 py-20">
            <div className="w-full max-w-md">

                <Link
                    href="/"
                    className="mb-12 block text-center text-4xl tracking-[0.45em] font-light"
                >
                    BATWOMAN
                </Link>

                <h1 className="text-center text-4xl font-[var(--font-playfair)]">
                    {title}
                </h1>

                <p className="mt-4 mb-10 text-center text-gray-600">
                    {subtitle}
                </p>

                {children}

                <p className="mt-8 text-center text-sm text-gray-600">
                    {footerText}{" "}
                    <Link
                        href={footerLinkHref}
                        className="font-semibold text-black hover:underline"
                    >
                        {footerLinkText}
                    </Link>
                </p>

            </div>
        </main>
    );
}