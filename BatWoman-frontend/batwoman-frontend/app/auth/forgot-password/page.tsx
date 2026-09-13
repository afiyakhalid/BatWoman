"use client";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-neutral-100">
                <h1 className="mb-2 text-center font-[var(--font-playfair)] text-3xl">
                    Reset Password
                </h1>
                <p className="mb-6 text-center text-sm text-gray-500">
                    Enter your email to receive a recovery code.
                </p>
                <ForgotPasswordForm />
            </div>
        </div>
    );
}