
"use client";

import { useState } from "react";
import { useAuthModal } from "@/hooks/useAuthModal";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterForm() {
    const register = useRegister();
    const { openLogin } = useAuthModal();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError("");

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        register.mutate({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password,
        });
    };

    if (register.isSuccess) {
        return (
            <div className="w-full space-y-5 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c7a8]">
                    <span className="text-2xl text-[#8C6D4F]">✓</span>
                </div>

                <h2 className="font-[var(--font-playfair)] text-2xl text-neutral-900">
                    Account Created Successfully
                </h2>

                <p className="text-sm leading-6 text-neutral-600">
                    Your Zubayda account has been created successfully.
                </p>

                <p className="text-sm font-medium text-neutral-900">
                    {email.trim()}
                </p>

                <p className="text-xs leading-5 text-neutral-500">
                    You can now sign in using your registered email address.
                </p>

                <button
                    type="button"
                    onClick={openLogin}
                    className="w-full rounded-full bg-black py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                >
                    Continue to Login
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <AuthInput
                    label="First name"
                    value={firstName}
                    onChange={setFirstName}
                    autoComplete="given-name"
                />

                <AuthInput
                    label="Last name"
                    value={lastName}
                    onChange={setLastName}
                    autoComplete="family-name"
                />
            </div>

            <AuthInput
                label="Email address"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
            />

            <div>
                <PasswordInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    autoComplete="new-password"
                />

                <p className="mt-1.5 text-[10px] leading-4 text-[#777]">
                    Use a strong password with a mix of letters, numbers and symbols.
                </p>
            </div>

            <PasswordInput
                label="Confirm password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                autoComplete="new-password"
            />

            {(passwordError || register.isError) && (
                <p role="alert" className="text-[12px] text-red-600">
                    {passwordError ||
                        "We couldn't create your account. Please try again."}
                </p>
            )}

            <p className="text-[11px] leading-[1.7] text-[#666]">
                By creating an account, you agree to our{" "}
                <a
                    href="/customer/terms"
                    className="text-[#222] underline underline-offset-2"
                >
                    Terms of Use
                </a>{" "}
                and{" "}
                <a
                    href="/customer/privacy"
                    className="text-[#222] underline underline-offset-2"
                >
                    Privacy Policy
                </a>
                .
            </p>

            <button
                type="submit"
                disabled={register.isPending}
                className="flex h-[41px] w-full items-center justify-center rounded-full bg-[#bfbfbf] text-[13px] font-medium text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {register.isPending
                    ? "Creating account..."
                    : "Create an account"}
            </button>

            <p className="text-center text-[11px] text-[#555]">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={openLogin}
                    className="text-[#222] underline underline-offset-2"
                >
                    Log in
                </button>
            </p>
        </form>
    );
}
