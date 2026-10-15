"use client";

import { AlertTriangle, ShieldAlert, LockKeyhole } from "lucide-react";

export default function DangerZone() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#E8C9C5] bg-[#FFFDF9] shadow-[0_2px_10px_rgba(61,48,40,0.03)]">
            <div className="border-b border-[#E8C9C5] bg-[#F9EDEA] px-5 py-5 sm:px-7">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8C9C5] bg-white text-[#A95148]">
                        <ShieldAlert size={23} strokeWidth={1.6} />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-[#873F38] sm:text-2xl">
                            Danger Zone
                        </h2>

                        <p className="mt-1 text-sm text-[#9B5148]">
                            Sensitive account and security actions
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-5 sm:p-7">
                <div className="flex items-start gap-3">
                    <AlertTriangle
                        size={17}
                        className="mt-0.5 shrink-0 text-[#A95148]"
                    />

                    <p className="text-sm leading-7 text-[#75675C]">
                        Security-related account actions will appear here.
                        Logging out from all devices will revoke every active
                        session. This feature will be implemented after the
                        authentication module is finalized.
                    </p>
                </div>

                <div className="mt-6 rounded-xl border border-[#EAE3D8] bg-[#FAF7F2] p-4 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5DCCE] bg-white text-[#94764C]">
                                <LockKeyhole size={18} strokeWidth={1.7} />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-[#3D3028]">
                                    Logout All Devices
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-[#8A7A6C]">
                                    Revoke all active sessions across devices.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled
                            aria-disabled="true"
                            className="inline-flex min-h-11 shrink-0 cursor-not-allowed items-center justify-center rounded-xl border border-[#D8B7B2] bg-[#A95148] px-5 py-3 text-sm font-semibold text-white opacity-60"
                        >
                            Coming Soon
                        </button>
                    </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-[#9A8B7B]">
                    This action will become available when session
                    management is implemented.
                </p>
            </div>
        </section>
    );
}