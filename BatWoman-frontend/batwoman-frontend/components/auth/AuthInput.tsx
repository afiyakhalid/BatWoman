"use client";

interface Props {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function AuthInput({
                                      label,
                                      type = "text",
                                      value,
                                      onChange,
                                      placeholder,
                                  }: Props) {
    return (
        <div className="mb-6">

            <label className="mb-2 block text-sm font-medium">
                {label}
            </label>

            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-300 px-4 py-4 outline-none transition focus:border-black"
            />

        </div>
    );
}