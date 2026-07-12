"use client";

import { useState } from "react";

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

        </form>

    );

}