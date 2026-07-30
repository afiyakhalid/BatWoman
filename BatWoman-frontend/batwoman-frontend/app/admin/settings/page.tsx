"use client";

import ProfileCard from "@/components/admin/settings/ProfileCard";
import ProfileForm from "@/components/admin/settings/ProfileForm";
import EmailForm from "@/components/admin/settings/EmailForm";
import PasswordForm from "@/components/admin/settings/PasswordForm";
import DangerZone from "@/components/admin/settings/DangerZone";

import { useAdminProfile } from "@/hooks/useAdminProfile";

export default function SettingsPage() {

    const {

        data: profile,

        isLoading,

        isError,

    } = useAdminProfile();

    if (isLoading) {

        return (

            <div className="p-10">

                Loading...

            </div>

        );

    }

    if (isError || !profile) {

        return (

            <div className="p-10 text-red-600">

                Failed to load profile.

            </div>

        );

    }

    return (

        <main className="space-y-8 p-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Settings

                </h1>

                <p className="mt-2 text-neutral-500">

                    Manage your administrator account information and security.

                </p>

            </div>

            <ProfileCard

                profile={profile}

            />

            <ProfileForm

                profile={profile}

            />

            <div className="grid gap-8 lg:grid-cols-2">

                <EmailForm

                    currentEmail={profile.email}

                />

                <PasswordForm />

            </div>

            <DangerZone />

        </main>

    );

}