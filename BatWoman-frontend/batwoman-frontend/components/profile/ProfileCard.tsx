"use client";

import { CurrentUser } from "@/services/auth.service";

interface ProfileCardProps {
    user: CurrentUser;
}

export default function ProfileCard({
    user,
}: ProfileCardProps) {

    return (

        <div className="rounded-xl border border-neutral-200 bg-white p-8">

            <h2 className="mb-8 font-[var(--font-playfair)] text-3xl">
                Personal Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

                <div>
                    <p className="text-sm text-neutral-500">
                        First Name
                    </p>

                    <p className="mt-1 text-lg">
                        {user.firstName}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-neutral-500">
                        Last Name
                    </p>

                    <p className="mt-1 text-lg">
                        {user.lastName}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-neutral-500">
                        Email
                    </p>

                    <p className="mt-1 text-lg">
                        {user.email}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-neutral-500">
                        Phone
                    </p>

                    <p className="mt-1 text-lg">
                        {user.phone}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-neutral-500">
                        Role
                    </p>

                    <p className="mt-1 text-lg">
                        {user.role}
                    </p>
                </div>

            </div>

        </div>

    );

}