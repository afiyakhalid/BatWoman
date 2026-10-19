"use client";

import { User } from "lucide-react";
import { CurrentUser } from "@/services/auth.service";

interface ProfileCardProps {
  user: CurrentUser;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "BW";

  return (
    <div className="bg-white border border-[#e7e1d8] p-6 sm:p-10 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
      {/* CARD TOP BANNER WITH MONOGRAM */}
      <div className="flex items-center gap-5 pb-8 border-b border-[#eee8e0]">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#f4eee6] border border-[#e8dfd3] font-[var(--font-playfair)] text-2xl text-[#8C6D4F]">
          {initials}
        </div>
        <div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D4F] font-semibold block mb-0.5">
            Personal Information
          </span>
          <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-normal text-neutral-900">
            {user.firstName} {user.lastName}
          </h2>
          <span className="mt-1 inline-block border border-[#e8dfd3] bg-[#faf8f5] px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] font-medium text-[#8C6D4F]">
            {user.role}
          </span>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
            First Name
          </p>
          <p className="font-normal text-sm sm:text-base text-neutral-900">
            {user.firstName || "—"}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
            Last Name
          </p>
          <p className="font-normal text-sm sm:text-base text-neutral-900">
            {user.lastName || "—"}
          </p>
        </div>

        <div className="space-y-1 sm:col-span-2 pt-2 border-t border-[#f7f5f0]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
            Email Address
          </p>
          <p className="font-normal text-sm sm:text-base text-neutral-900">
            {user.email || "—"}
          </p>
        </div>

        <div className="space-y-1 pt-2 border-t border-[#f7f5f0]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
            Phone Number
          </p>
          <p className="font-normal text-sm sm:text-base text-neutral-900">
            {user.phone || "Not provided"}
          </p>
        </div>

        <div className="space-y-1 pt-2 border-t border-[#f7f5f0]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
            Account Status
          </p>
          <p className="font-normal text-sm sm:text-base text-neutral-900">
            Active Client
          </p>
        </div>
      </div>
    </div>
  );
}