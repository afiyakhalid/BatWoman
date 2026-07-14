"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export default function PasswordInput({
                                          label,
                                          value,
                                          onChange,
                                      }: Props) {
    const [show, setShow] = useState(false);

    return (
        <div className="mb-6">

            <label className="mb-2 block text-sm font-medium">
                {label}
            </label>

            <div className="relative">

                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-4 pr-14 outline-none focus:border-black"
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                    {show ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}
                </button>

            </div>

        </div>
    );
}