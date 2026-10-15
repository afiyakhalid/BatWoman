"use client";

import { useEffect, useState } from "react";
import { UserRound, Phone, Save } from "lucide-react";

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
            className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-8"
        >
            <div className="mb-7 flex items-start gap-4 border-b border-[#EAE3D8] pb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C]">
                    <UserRound size={22} strokeWidth={1.6} />
                </div>

                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-[#3D3028] sm:text-2xl">
                        Profile Information
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-[#8A7A6C]">
                        Manage your administrator details.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="admin-first-name"
                        className="mb-2 block text-sm font-medium text-[#59483A]"
                    >
                        First Name
                    </label>

                    <input
                        id="admin-first-name"
                        type="text"
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="h-12 w-full rounded-xl border border-[#E5DCCE] bg-white px-4 text-sm text-[#3D3028] placeholder:text-[#A79A8C] outline-none transition-colors focus:border-[#B99A65] focus:ring-2 focus:ring-[#B99A65]/15"
                    />
                </div>

                <div>
                    <label
                        htmlFor="admin-last-name"
                        className="mb-2 block text-sm font-medium text-[#59483A]"
                    >
                        Last Name
                    </label>

                    <input
                        id="admin-last-name"
                        type="text"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="h-12 w-full rounded-xl border border-[#E5DCCE] bg-white px-4 text-sm text-[#3D3028] placeholder:text-[#A79A8C] outline-none transition-colors focus:border-[#B99A65] focus:ring-2 focus:ring-[#B99A65]/15"
                    />
                </div>
            </div>

            <div className="mt-5">
                <label
                    htmlFor="admin-phone-number"
                    className="mb-2 block text-sm font-medium text-[#59483A]"
                >
                    Phone Number
                </label>

                <div className="relative">
                    <Phone
                        size={17}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8874]"
                    />

                    <input
                        id="admin-phone-number"
                        type="tel"
                        autoComplete="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="h-12 w-full rounded-xl border border-[#E5DCCE] bg-white pl-11 pr-4 text-sm text-[#3D3028] placeholder:text-[#A79A8C] outline-none transition-colors focus:border-[#B99A65] focus:ring-2 focus:ring-[#B99A65]/15"
                    />
                </div>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#EAE3D8] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-[#8A7A6C]">
                    Keep your contact information up to date.
                </p>

                <button
                    type="submit"
                    disabled={updateProfile.isPending}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#94764C] bg-[#94764C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#806442] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Save size={16} />

                    {updateProfile.isPending
                        ? "Saving..."
                        : "Save Changes"}
                </button>
            </div>
        </form>
    );
}