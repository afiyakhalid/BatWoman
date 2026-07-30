"use client";

import { useState } from "react";

import { useChangeEmail } from "@/hooks/useChangeEmail";

interface EmailFormProps {

    currentEmail: string;

}

export default function EmailForm({

    currentEmail,

}: EmailFormProps) {

    const changeEmail = useChangeEmail();

    const [newEmail, setNewEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleSubmit = (

        event: React.FormEvent<HTMLFormElement>

    ) => {

        event.preventDefault();

        changeEmail.mutate({

            newEmail,

            password,

        });

    };

    return (

        <form

            onSubmit={handleSubmit}

            className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"

        >

            <h2 className="mb-8 text-2xl font-semibold">

                Change Email

            </h2>

            <div>

                <label className="mb-2 block text-sm font-medium">

                    Current Email

                </label>

                <input

                    value={currentEmail}

                    disabled

                    className="w-full rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3"

                />

            </div>

            <div className="mt-6">

                <label className="mb-2 block text-sm font-medium">

                    New Email

                </label>

                <input

                    type="email"

                    value={newEmail}

                    onChange={(e) =>

                        setNewEmail(e.target.value)

                    }

                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink-500"

                />

            </div>

            <div className="mt-6">

                <label className="mb-2 block text-sm font-medium">

                    Current Password

                </label>

                <input

                    type="password"

                    value={password}

                    onChange={(e) =>

                        setPassword(e.target.value)

                    }

                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink-500"

                />

            </div>

            <div className="mt-8 flex justify-end">

                <button

                    type="submit"

                    disabled={changeEmail.isPending}

                    className="rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:opacity-50"

                >

                    {changeEmail.isPending

                        ? "Updating..."

                        : "Update Email"}

                </button>

            </div>

        </form>

    );

}