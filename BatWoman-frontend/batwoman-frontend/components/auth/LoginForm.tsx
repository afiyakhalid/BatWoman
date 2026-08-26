"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import Link from "next/link";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";

import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const login = useLogin();

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        login.mutate({

            email,

            password,

        });

    };
    const handleGoogleLogin = () => {
    window.location.href =
        `${process.env.NEXT_PUBLIC_API_BASE}/oauth2/authorization/google`;
};

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <AuthInput
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Enter your email"
            />

            <PasswordInput
                label="Password"
                value={password}
                onChange={setPassword}
            />

            <div className="flex justify-end">

                <Link
                    href="/auth/forgot-password"
                    className="text-sm text-neutral-600 hover:text-black"
                >
                    Forgot Password?
                </Link>

            </div>

            {login.isError && (

                <p className="text-sm text-red-600">

                    Invalid email or password.

                </p>

            )}

            <button
                type="submit"
                disabled={login.isPending}
                className="w-full bg-black py-4 text-white transition hover:bg-neutral-800 disabled:opacity-50"
            >

                {login.isPending
                    ? "Signing In..."
                    : "Sign In"}

            </button>
            <div className="relative py-2">
    <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-neutral-200" />
    </div>

    <div className="relative flex justify-center">
        <span className="bg-white px-4 text-xs uppercase tracking-[0.25em] text-neutral-400">
            OR
        </span>
    </div>
</div>

<button
    type="button"
    onClick={handleGoogleLogin}
    className="flex w-full items-center justify-center gap-3 border border-neutral-300 py-4 text-sm font-medium transition hover:border-black hover:bg-neutral-50"
>
    <FcGoogle size={22} />

    Continue with Google
</button>

        </form>

    );

}