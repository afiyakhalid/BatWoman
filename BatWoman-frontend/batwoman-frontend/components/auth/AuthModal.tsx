"use client";

import { useAuthModal } from "@/hooks/useAuthModal";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal() {
    const {
        isOpen,
        mode,
        close,
        openLogin,
        openRegister,
    } = useAuthModal();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

                <button
                    onClick={close}
                    className="absolute right-5 top-5 text-2xl"
                >
                    ×
                </button>

                <h2 className="mb-2 text-center font-[var(--font-playfair)] text-4xl">
                    {mode === "login"
                        ? "Welcome Back"
                        : "Create Account"}
                </h2>

                <p className="mb-8 text-center text-sm text-gray-500">
                    {mode === "login"
                        ? "Login to continue shopping."
                        : "Register to continue shopping."}
                </p>

                {mode === "login" ? (
                    <>
                        <LoginForm />

                        <p className="mt-6 text-center text-sm">
                            Don't have an account?{" "}
                            <button
                                onClick={openRegister}
                                className="font-semibold underline"
                            >
                                Register
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <RegisterForm />

                        <p className="mt-6 text-center text-sm">
                            Already have an account?{" "}
                            <button
                                onClick={openLogin}
                                className="font-semibold underline"
                            >
                                Login
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}