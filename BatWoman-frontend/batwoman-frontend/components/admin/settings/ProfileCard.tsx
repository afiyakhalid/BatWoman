"use client";

import { ShieldCheck, Mail, UserRound } from "lucide-react";

import { AdminProfile } from "@/services/adminSettings.service";

interface ProfileCardProps {
    profile: AdminProfile;
}

export default function ProfileCard({
                                        profile,
                                    }: ProfileCardProps) {
    return (
        <div className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C]">
                    <ShieldCheck size={31} strokeWidth={1.5} />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94764C]">
                        Administrator Profile
                    </p>

                    <h2 className="mt-2 break-words text-2xl font-semibold tracking-tight text-[#3D3028]">
                        {profile.firstName} {profile.lastName}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 break-all text-sm text-[#8A7A6C]">
                        <Mail
                            size={15}
                            className="shrink-0 text-[#94764C]"
                        />
                        {profile.email}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E5D8C4] bg-[#F5EFE5] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#806744]">
                        <UserRound size={13} />
                        {profile.role}
                    </span>
                </div>
            </div>

            <div className="mt-7 h-px bg-[#EAE3D8]" />

            <div className="mt-4 flex items-center gap-2 text-xs text-[#8A7A6C]">
                <ShieldCheck size={15} className="text-[#94764C]" />
                Administrator account information
            </div>
        </div>
    );
}