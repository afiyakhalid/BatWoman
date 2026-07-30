"use client";

import { AlertTriangle } from "lucide-react";

export default function DangerZone() {

    return (

        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow-sm">

            <div className="flex items-start gap-4">

                <AlertTriangle

                    className="mt-1 text-red-600"

                    size={28}

                />

                <div>

                    <h2 className="text-2xl font-semibold text-red-700">

                        Danger Zone

                    </h2>

                    <p className="mt-2 text-sm text-red-600">

                        Security-related account actions will appear here.

                        Logging out from all devices will revoke every active

                        session. This feature will be implemented after the

                        authentication module is finalized.

                    </p>

                </div>

            </div>

            <div className="mt-8">

                <button

                    disabled

                    className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white opacity-60 cursor-not-allowed"

                >

                    Logout All Devices (Coming Soon)

                </button>

            </div>

        </div>

    );

}