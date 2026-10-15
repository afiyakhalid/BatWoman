"use client";

import { useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";

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
            className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-8"
        >
            <div className="mb-7 flex items-start gap-4 border-b border-[#EAE3D8] pb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C]">
                    <LockKeyhole size={22} strokeWidth={1.6} />
                </div>

                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-[#3D3028] sm:text-2xl">
                        Change Password
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-[#8A7A6C]">
                        Keep your account secure with an updated password.
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                <div>
                    <label
                        htmlFor="current-password"
                        className="mb-2 block text-sm font-medium text-[#59483A]"
                    >
                        Current Password
                    </label>

                    <input
                        id="current-password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your current password"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(e.target.value)
                        }
                        required
                        className="h-12 w-full rounded-xl border border-[#E5DCCE] bg-white px-4 text-sm text-[#3D3028] placeholder:text-[#A79A8C] outline-none transition-colors focus:border-[#B99A65] focus:ring-2 focus:ring-[#B99A65]/15"
                    />
                </div>

                <div>
                    <label
                        htmlFor="new-password"
                        className="mb-2 block text-sm font-medium text-[#59483A]"
                    >
                        New Password
                    </label>

                    <input
                        id="new-password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                        required
                        className="h-12 w-full rounded-xl border border-[#E5DCCE] bg-white px-4 text-sm text-[#3D3028] placeholder:text-[#A79A8C] outline-none transition-colors focus:border-[#B99A65] focus:ring-2 focus:ring-[#B99A65]/15"
                    />
                </div>

                <div>
                    <label
                        htmlFor="confirm-password"
                        className="mb-2 block text-sm font-medium text-[#59483A]"
                    >
                        Confirm New Password
                    </label>

                    <input
                        id="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Re-enter your new password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        required
                        className="h-12 w-full rounded-xl border border-[#E5DCCE] bg-white px-4 text-sm text-[#3D3028] placeholder:text-[#A79A8C] outline-none transition-colors focus:border-[#B99A65] focus:ring-2 focus:ring-[#B99A65]/15"
                    />
                </div>
            </div>

            <div className="mt-6 flex items-start gap-2 rounded-xl border border-[#EAE3D8] bg-[#F7F2EA] p-3">
                <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-[#94764C]"
                />

                <p className="text-xs leading-5 text-[#75675C]">
                    Use a strong password that you do not reuse on other
                    websites.
                </p>
            </div>

            <div className="mt-7 flex justify-end">
                <button
                    type="submit"
                    disabled={changePassword.isPending}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#94764C] bg-[#94764C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#806442] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {changePassword.isPending
                        ? "Updating..."
                        : "Update Password"}
                </button>
            </div>
        </form>
    );
}