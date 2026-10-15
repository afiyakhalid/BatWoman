"use client";

import { useState } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const id = `auth-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-[#555]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="h-12 w-full rounded-lg border border-[#d8d8d8] bg-white pl-4 pr-12 text-base text-[#292929] outline-none transition-colors placeholder:text-sm placeholder:text-[#aaa] focus:border-[#777]"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#666] hover:text-[#222]"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}