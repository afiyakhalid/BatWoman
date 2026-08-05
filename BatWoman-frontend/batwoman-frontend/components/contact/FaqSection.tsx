"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
    {
        question: "How long does shipping take?",
        answer:
            "Orders are typically processed within 1–2 business days. Delivery timelines vary depending on your location.",
    },
    {
        question: "Do you ship internationally?",
        answer:
            "Yes. We offer international shipping to selected countries. Shipping charges and delivery estimates are calculated during checkout.",
    },
    {
        question: "Can I return or exchange my order?",
        answer:
            "Eligible products can be returned or exchanged according to our return policy. Please contact our support team if you need assistance.",
    },
    {
        question: "How can I track my order?",
        answer:
            "Once your order has been dispatched, you'll receive a tracking link via email so you can monitor your shipment in real time.",
    },
];

export default function FaqSection() {

    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="bg-[#F8F6F2] py-28">

            <div className="mx-auto max-w-5xl px-6">

                <p className="text-center text-sm uppercase tracking-[0.4em] text-neutral-400">
                    Frequently Asked Questions
                </p>

                <h2 className="mt-5 text-center font-[var(--font-playfair)] text-5xl">
                    Need some answers?
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-neutral-600">
                    We've answered the questions we receive most often.
                    If you still need help, our team is always happy to assist.
                </p>

                <div className="mt-16 space-y-5">

                    {faqs.map((faq, index) => {

                        const open = activeIndex === index;

                        return (

                            <div
                                key={faq.question}
                                className="rounded-2xl border border-neutral-200 bg-white"
                            >

                                <button
                                    onClick={() =>
                                        setActiveIndex(open ? null : index)
                                    }
                                    className="flex w-full items-center justify-between p-7 text-left"
                                >

                                    <span className="text-lg font-medium">

                                        {faq.question}

                                    </span>

                                    <ChevronDown
                                        size={22}
                                        className={`transition duration-300 ${
                                            open ? "rotate-180" : ""
                                        }`}
                                    />

                                </button>

                                <AnimatePresence>

                                    {open && (

                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                            className="overflow-hidden"
                                        >

                                            <p className="px-7 pb-7 leading-8 text-neutral-600">

                                                {faq.answer}

                                            </p>

                                        </motion.div>

                                    )}

                                </AnimatePresence>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}