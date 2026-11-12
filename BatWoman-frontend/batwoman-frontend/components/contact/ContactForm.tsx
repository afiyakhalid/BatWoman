
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { useContact } from "@/hooks/useContact";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [message, setMessage] = useState("");

    const {
        sendMessageAsync,
        isPending,
    } = useContact();

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        try {
            await sendMessageAsync({
                name,
                email,
                phone,
                orderNumber,
                message,
            });

            setName("");
            setEmail("");
            setPhone("");
            setOrderNumber("");
            setMessage("");
        } catch {
            // Error feedback is handled by useContact.
        }
    }

    const labelClass =
        "block text-xs uppercase tracking-[0.35em] text-neutral-400";

    const inputClass =
        "mt-5 w-full border-b border-neutral-300 bg-transparent pb-5 text-lg outline-none transition focus:border-black";

    return (
        <section className="py-32">
            <div className="mx-auto max-w-7xl px-8 lg:px-12">

                <div className="max-w-3xl">
                    <p className="text-xs uppercase tracking-[0.45em] text-neutral-400">
                        Contact
                    </p>

                    <h2 className="mt-6 font-[var(--font-playfair)] text-6xl leading-tight">
                        Send us a message.
                    </h2>

                    <p className="mt-8 max-w-2xl text-lg leading-9 text-neutral-600">
                        Whether you have questions regarding sizing,
                        shipping, your order, or our collections,
                        we would be delighted to assist you.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-24"
                >
                    {/* ROW 1 */}
                    <div className="grid gap-16 lg:grid-cols-2">

                        <div>
                            <label
                                htmlFor="contact-name"
                                className={labelClass}
                            >
                                Full Name
                            </label>

                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                autoComplete="name"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="contact-email"
                                className={labelClass}
                            >
                                Email
                            </label>

                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                autoComplete="email"
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* ROW 2 */}
                    <div className="mt-16 grid gap-16 lg:grid-cols-2">

                        <div>
                            <label
                                htmlFor="contact-phone"
                                className={labelClass}
                            >
                                Phone
                            </label>

                            <input
                                id="contact-phone"
                                name="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+91 XXXXX XXXXX"
                                autoComplete="tel"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="contact-order"
                                className={labelClass}
                            >
                                Order Number
                            </label>

                            <input
                                id="contact-order"
                                name="orderNumber"
                                type="text"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                placeholder="Optional"
                                autoComplete="off"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="mt-16">

                        <label
                            htmlFor="contact-message"
                            className={labelClass}
                        >
                            Message
                        </label>

                        <textarea
                            id="contact-message"
                            name="message"
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us how we can help..."
                            required
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* SUBMIT */}
                    <div className="mt-20 flex justify-end">

                        <button
                            type="submit"
                            disabled={isPending}
                            className="group inline-flex items-center gap-4 text-sm uppercase tracking-[0.35em] transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending
                                ? "Sending..."
                                : "Send Message"}

                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-2"
                            />
                        </button>

                    </div>
                </form>
            </div>
        </section>
    );
}
