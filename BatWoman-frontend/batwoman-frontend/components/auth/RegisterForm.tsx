"use client";

import { useState } from "react";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";

import { useRegister } from "@/hooks/useRegister";

export default function RegisterForm() {

    const register = useRegister();

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        register.mutate({

            firstName,

            lastName,

            email,

            password,

        });

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <div className="grid grid-cols-2 gap-4">

                <AuthInput
                    label="First Name"
                    value={firstName}
                    onChange={setFirstName}
                />

                <AuthInput
                    label="Last Name"
                    value={lastName}
                    onChange={setLastName}
                />

            </div>

            <AuthInput
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
            />

            <PasswordInput
                label="Password"
                value={password}
                onChange={setPassword}
            />

            <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
            />

            {register.isError && (

                <p className="text-sm text-red-600">

                    Registration failed.

                </p>

            )}

            <button
                type="submit"
                disabled={register.isPending}
                className="w-full bg-black py-4 text-white hover:bg-neutral-800 transition disabled:opacity-50"
            >

                {register.isPending
                    ? "Creating Account..."
                    : "Create Account"}

            </button>

        </form>

    );

}