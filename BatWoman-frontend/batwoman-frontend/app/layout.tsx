import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import SiteShell from "@/components/layout/SiteShell";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "ZubaidabyA3",
    description: "Luxury abayas, curated for elegance.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en" data-scroll-behavior="smooth"
            suppressHydrationWarning
            className={`${inter.variable} ${playfair.variable}`}
        >
        <body>
        <ThemeProvider>
            <QueryProvider>
                <SiteShell>{children}</SiteShell>
            </QueryProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}