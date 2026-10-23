
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, X, Check, User } from "lucide-react";
import {
  CurrentUser,
  updateCurrentUserProfile,
} from "@/services/auth.service";

interface ProfileCardProps {
  user: CurrentUser;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const initials =
      `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`
          .toUpperCase() || "BW";

  const displayName = [
    user.firstName,
    user.lastName?.trim(),
  ].filter(Boolean).join(" ");

  function cancelEditing() {
    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setPhone(user.phone ?? "");
    setError("");
    setSuccess("");
    setIsEditing(false);
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanPhone = phone.trim();

    if (!cleanFirstName) {
      setError("First name is required.");
      return;
    }

    if (cleanPhone && !/^[0-9]{10}$/.test(cleanPhone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    setIsSaving(true);

    try {
      const updatedUser = await updateCurrentUserProfile({
        firstName: cleanFirstName,
        lastName: cleanLastName || null,
        phone: cleanPhone || null,
      });

      queryClient.setQueryData(["current-user"], updatedUser);
      await queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });

      setFirstName(updatedUser.firstName ?? "");
      setLastName(updatedUser.lastName ?? "");
      setPhone(updatedUser.phone ?? "");
      setIsEditing(false);
      setSuccess("Your profile has been updated.");
    } catch (err: unknown) {
      const message =
          typeof err === "object" &&
          err !== null &&
          "response" in err
              ? (
                  err as {
                    response?: {
                      data?: { message?: string; detail?: string };
                    };
                  }
              ).response?.data?.message ??
              (
                  err as {
                    response?: {
                      data?: { detail?: string };
                    };
                  }
              ).response?.data?.detail
              : undefined;

      setError(message ?? "Unable to update your profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  const inputClass =
      "mt-1 w-full border border-[#e7e1d8] bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-[#8C6D4F]";

  return (
      <div className="rounded-none border border-[#e7e1d8] bg-white p-6 shadow-[0_4px_25px_rgba(45,31,26,0.03)] sm:p-10">
        <div className="flex items-center justify-between gap-4 border-b border-[#eee8e0] pb-8">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#e8dfd3] bg-[#f4eee6] font-[var(--font-playfair)] text-2xl text-[#8C6D4F]">
              {initials}
            </div>

            <div>
                        <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-[0.25em] text-[#8C6D4F]">
                            Personal Information
                        </span>

              <h2 className="font-[var(--font-playfair)] text-2xl font-normal text-neutral-900 sm:text-3xl">
                {displayName || user.firstName}
              </h2>

              <span className="mt-1 inline-block border border-[#e8dfd3] bg-[#faf8f5] px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#8C6D4F]">
                            {user.role}
                        </span>
            </div>
          </div>

          {!isEditing && (
              <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccess("");
                    setIsEditing(true);
                  }}
                  className="inline-flex shrink-0 items-center gap-2 border border-[#e7e1d8] px-3 py-2 text-xs uppercase tracking-wider text-neutral-800 transition hover:border-[#8C6D4F] hover:text-[#8C6D4F]"
              >
                <Pencil size={14} />
                Edit
              </button>
          )}
        </div>

        {success && (
            <p role="status" className="mt-5 text-sm text-green-700">
              {success}
            </p>
        )}

        {error && (
            <p role="alert" className="mt-5 text-sm text-red-600">
              {error}
            </p>
        )}

        {isEditing ? (
            <form onSubmit={handleSave} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  First Name
                  <input
                      className={inputClass}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      maxLength={100}
                      required
                      autoComplete="given-name"
                  />
                </label>

                <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Last Name
                  <input
                      className={inputClass}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      maxLength={100}
                      autoComplete="family-name"
                      placeholder="Optional"
                  />
                </label>

                <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500 sm:col-span-2">
                  Email Address
                  <input
                      className={`${inputClass} cursor-not-allowed bg-[#faf8f5] text-neutral-500`}
                      value={user.email ?? ""}
                      readOnly
                      aria-readonly="true"
                  />
                  <span className="mt-1 block normal-case tracking-normal">
                                Email address cannot be changed here.
                            </span>
                </label>

                <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500 sm:col-span-2">
                  Phone Number
                  <input
                      className={inputClass}
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-[#f7f5f0] pt-5">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 bg-[#8C6D4F] px-5 py-3 text-xs uppercase tracking-wider text-white transition hover:bg-[#73573e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Check size={14} />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>

                <button
                    type="button"
                    onClick={cancelEditing}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 border border-[#e7e1d8] px-5 py-3 text-xs uppercase tracking-wider text-neutral-700 transition hover:border-neutral-400 disabled:opacity-60"
                >
                  <X size={14} />
                  Cancel
                </button>
              </div>
            </form>
        ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  First Name
                </p>
                <p className="text-sm font-normal text-neutral-900 sm:text-base">
                  {user.firstName || "—"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Last Name
                </p>
                <p className="text-sm font-normal text-neutral-900 sm:text-base">
                  {user.lastName?.trim() || "NULL"}
                </p>
              </div>

              <div className="space-y-1 border-t border-[#f7f5f0] pt-2 sm:col-span-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Email Address
                </p>
                <p className="break-words text-sm font-normal text-neutral-900 sm:text-base">
                  {user.email || "—"}
                </p>
              </div>

              <div className="space-y-1 border-t border-[#f7f5f0] pt-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Phone Number
                </p>
                <p className="text-sm font-normal text-neutral-900 sm:text-base">
                  {user.phone || "Not provided"}
                </p>
              </div>

              <div className="space-y-1 border-t border-[#f7f5f0] pt-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Account Status
                </p>
                <p className="text-sm font-normal text-neutral-900 sm:text-base">
                  Active Client
                </p>
              </div>
            </div>
        )}
      </div>
  );
}
