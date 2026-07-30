"use client";

import { useEffect, useState } from "react";

import { AdminProfile } from "@/services/adminSettings.service";

import { useUpdateAdminProfile } from "@/hooks/useUpdateAdminProfile";

interface ProfileFormProps {

    profile: AdminProfile;

}

export default function ProfileForm({

    profile,

}: ProfileFormProps) {

    const updateProfile = useUpdateAdminProfile();

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {

        setFirstName(profile.firstName);

        setLastName(profile.lastName);

        setPhoneNumber(profile.phoneNumber ?? "");

    }, [profile]);

    const handleSubmit = (

        event: React.FormEvent<HTMLFormElement>

    ) => {

        event.preventDefault();

        updateProfile.mutate({

            firstName,

            lastName,

            phoneNumber,

        });

    };

    return (

        <form

            onSubmit={handleSubmit}

            className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"

        >

            <h2 className="mb-8 text-2xl font-semibold">

                Profile Information

            </h2>

            <div className="grid gap-6 md:grid-cols-2">

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        First Name

                    </label>

                    <input

                        value={firstName}

                        onChange={(e) =>

                            setFirstName(e.target.value)

                        }

                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink-500"

                    />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium">

                        Last Name

                    </label>

                    <input

                        value={lastName}

                        onChange={(e) =>

                            setLastName(e.target.value)

                        }

                        className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink-500"

                    />

                </div>

            </div>

            <div className="mt-6">

                <label className="mb-2 block text-sm font-medium">

                    Phone Number

                </label>

                <input

                    value={phoneNumber}

                    onChange={(e) =>

                        setPhoneNumber(e.target.value)

                    }

                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-pink-500"

                />

            </div>

            <div className="mt-8 flex justify-end">

                <button

                    type="submit"

                    disabled={updateProfile.isPending}

                    className="rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:opacity-50"

                >

                    {updateProfile.isPending

                        ? "Saving..."

                        : "Save Changes"}

                </button>

            </div>

        </form>

    );

}