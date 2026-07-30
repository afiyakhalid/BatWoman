"use client";

import { ShieldCheck } from "lucide-react";

import { AdminProfile } from "@/services/adminSettings.service";

interface ProfileCardProps {

    profile: AdminProfile;

}

export default function ProfileCard({

    profile,

}: ProfileCardProps) {

    return (

        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

            <div className="flex items-center gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">

                    <ShieldCheck
                        size={32}
                        className="text-pink-600"
                    />

                </div>

                <div>

                    <h2 className="text-2xl font-bold">

                        {profile.firstName} {profile.lastName}

                    </h2>

                    <p className="mt-1 text-neutral-500">

                        {profile.email}

                    </p>

                    <span className="mt-3 inline-flex rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-700">

                        {profile.role}

                    </span>

                </div>

            </div>

        </div>

    );

}