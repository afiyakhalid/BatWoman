"use client";

import { useState } from "react";

import { useChangePassword } from "@/hooks/useChangePassword";

export default function PasswordForm() {

    const changePassword = useChangePassword();

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (

        event: React.FormEvent<HTMLFormElement>

    ) => {

        event.preventDefault();

        changePassword.mutate({

            currentPassword,

            newPassword,

            confirmPassword,

        });

    };

    return (

        <form

            onSubmit={handleSubmit}

            className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"

        >

            <h2 className="mb-8 text-2xl font-semibold">

                Change Password

            </h2>

            <div className="space-y-6">

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Current Password

                    </label>

                    <input

                        type="password"

                        value={currentPassword}

                        onChange={(e) =>

                            setCurrentPassword(e.target.value)

                        }

                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink-500"

                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        New Password

                    </label>

                    <input

                        type="password"

                        value={newPassword}

                        onChange={(e) =>

                            setNewPassword(e.target.value)

                        }

                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink-500"

                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Confirm Password

                    </label>

                    <input

                        type="password"

                        value={confirmPassword}

                        onChange={(e) =>

                            setConfirmPassword(e.target.value)

                        }

                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink-500"

                    />

                </div>

            </div>

            <div className="mt-8 flex justify-end">

                <button

                    type="submit"

                    disabled={changePassword.isPending}

                    className="rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:opacity-50"

                >

                    {changePassword.isPending

                        ? "Updating..."

                        : "Update Password"}

                </button>

            </div>

        </form>

    );

}