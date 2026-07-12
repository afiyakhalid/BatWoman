"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {

    return (

        <AuthLayout

            title="Create Account"

            subtitle="Join BatWoman to start shopping."

            footerText="Already have an account?"

            footerLinkText="Sign In"

            footerLinkHref="/auth/login"

        >

            <RegisterForm />

        </AuthLayout>

    );

}