
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import AuthInitializer from "@/providers/AuthInitializer";
import Navbar from "@/components/layout/Navbar";
import { AuthModal } from "@/components/auth";

import { Toaster } from "sonner";

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
          lang="en"
          suppressHydrationWarning
          className={`${inter.variable} ${playfair.variable}`}
      >
      <body>
      <ThemeProvider>
        <QueryProvider>
          <AuthInitializer />

          <Navbar />

          <main className="pt-20">
            {children}
          </main>

          <AuthModal />

          <Toaster richColors />
        </QueryProvider>
      </ThemeProvider>
      </body>
      </html>
  );
}
