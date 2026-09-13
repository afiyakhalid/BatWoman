"use client";

import { useState } from "react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { forgotPassword, resetPassword } from "@/services/auth.service";
import { useAuthModal } from "@/hooks/useAuthModal";

export default function ForgotPasswordForm() {
    const { openLogin } = useAuthModal();

    // Step 1: "send_code" | Step 2: "reset_password"
    const [step, setStep] = useState<"send_code" | "reset_password">("send_code");

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Step 1: Send OTP code
    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await forgotPassword(email);
            setSuccessMessage(`A 6-digit code has been sent to ${email}`);
            setStep("reset_password");
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to send verification code. Please check your email.");
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Reset Password
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            await resetPassword({
                email,
                code: code.trim(),
                newPassword,
            });
            setSuccessMessage("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                openLogin();
            }, 1800);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Invalid or expired code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    {successMessage}
                </div>
            )}

            {step === "send_code" ? (
                <form onSubmit={handleSendCode} className="space-y-5">
                    <p className="text-sm text-neutral-600">
                        Enter the email associated with your account, and we will send you a 6-digit verification code.
                    </p>

                    <AuthInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Enter your email"
                    />

                    <button
                        type="submit"
                        disabled={loading || !email}
                        className="w-full bg-black py-4 text-white transition hover:bg-neutral-800 disabled:opacity-50"
                    >
                        {loading ? "Sending Code..." : "Send Verification Code"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <AuthInput
                        label="6-Digit Verification Code"
                        type="text"
                        value={code}
                        onChange={setCode}
                        placeholder="e.g. 123456"
                    />

                    <PasswordInput
                        label="New Password"
                        value={newPassword}
                        onChange={setNewPassword}
                    />

                    <PasswordInput
                        label="Confirm New Password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                    />

                    <button
                        type="submit"
                        disabled={loading || !code || !newPassword || !confirmPassword}
                        className="w-full bg-black py-4 text-white transition hover:bg-neutral-800 disabled:opacity-50"
                    >
                        {loading ? "Resetting Password..." : "Reset Password"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setStep("send_code");
                            setError(null);
                        }}
                        className="w-full text-center text-xs text-neutral-500 hover:text-black underline"
                    >
                        Didn't receive code? Resend
                    </button>
                </form>
            )}

            <div className="text-center pt-2">
                <button
                    type="button"
                    onClick={openLogin}
                    className="text-sm font-medium text-neutral-600 hover:text-black underline"
                >
                    Back to Sign In
                </button>
            </div>
        </div>
    );
}