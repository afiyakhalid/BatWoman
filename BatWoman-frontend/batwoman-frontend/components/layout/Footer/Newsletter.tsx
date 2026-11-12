
"use client";

import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            setMessage("Please enter your email address.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.trim())) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setMessage(
            "Newsletter subscriptions are currently unavailable. Please check back soon."
        );
    };

    return (
        <div className="mt-16">
            <h3 className="font-[var(--font-playfair)] text-3xl">
                Subscribe to our Newsletter
            </h3>

            <p className="mt-4 text-neutral-600">
                Get exclusive offers, new arrivals and luxury collections delivered to
                your inbox.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
                noValidate
            >
                <div className="flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                    </label>

                    <input
                        id="newsletter-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setMessage("");
                        }}
                        autoComplete="email"
                        required
                        aria-invalid={message && message.includes("valid") ? true : undefined}
                        aria-describedby="newsletter-message"
                        className="w-full border-b border-black bg-transparent py-3 outline-none focus:border-neutral-500"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-full bg-black px-8 py-3 text-white transition hover:bg-neutral-800"
                >
                    Subscribe
                </button>
            </form>

            {message && (
                <p
                    id="newsletter-message"
                    role="status"
                    aria-live="polite"
                    className="mt-3 text-xs text-neutral-600"
                >
                    {message}
                </p>
            )}
        </div>
    );
}
