"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {

    return (

        <AuthLayout

            title="Welcome Back"

            subtitle="Sign in to continue shopping."

            footerText="Don't have an account?"

            footerLinkText="Create one"

            footerLinkHref="/auth/register"

        >

            <LoginForm />

        </AuthLayout>

    );

}