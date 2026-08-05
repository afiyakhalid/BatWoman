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

            // Toast handled in useContact

        }

    }

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
                        we'd be delighted to assist you.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-24"
                >

                    {/* Row 1 */}

                    <div className="grid gap-16 lg:grid-cols-2">

                        <div>

                            <label className="text-xs uppercase tracking-[0.35em] text-neutral-400">

                                Full Name

                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                placeholder="Your full name"
                                required
                                className="mt-5 w-full border-b border-neutral-300 bg-transparent pb-5 text-lg outline-none transition focus:border-black"
                            />

                        </div>

                        <div>

                            <label className="text-xs uppercase tracking-[0.35em] text-neutral-400">

                                Email

                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="name@example.com"
                                required
                                className="mt-5 w-full border-b border-neutral-300 bg-transparent pb-5 text-lg outline-none transition focus:border-black"
                            />

                        </div>

                    </div>

                    {/* Row 2 */}

                    <div className="mt-16 grid gap-16 lg:grid-cols-2">

                        <div>

                            <label className="text-xs uppercase tracking-[0.35em] text-neutral-400">

                                Phone

                            </label>

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                                placeholder="+91 XXXXX XXXXX"
                                required
                                className="mt-5 w-full border-b border-neutral-300 bg-transparent pb-5 text-lg outline-none transition focus:border-black"
                            />

                        </div>

                        <div>

                            <label className="text-xs uppercase tracking-[0.35em] text-neutral-400">

                                Order Number

                            </label>

                            <input
                                type="text"
                                value={orderNumber}
                                onChange={(e) =>
                                    setOrderNumber(e.target.value)
                                }
                                placeholder="Optional"
                                className="mt-5 w-full border-b border-neutral-300 bg-transparent pb-5 text-lg outline-none transition focus:border-black"
                            />

                        </div>

                    </div>

                    {/* Message */}

                    <div className="mt-16">

                        <label className="text-xs uppercase tracking-[0.35em] text-neutral-400">

                            Message

                        </label>

                        <textarea
                            rows={6}
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            placeholder="Tell us how we can help..."
                            required
                            className="mt-5 w-full resize-none border-b border-neutral-300 bg-transparent pb-5 text-lg outline-none transition focus:border-black"
                        />

                    </div>

                    {/* Submit */}

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