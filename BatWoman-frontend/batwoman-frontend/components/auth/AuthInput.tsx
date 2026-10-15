// "use client";
//
// interface Props {
//     label: string;
//     type?: string;
//     value: string;
//     onChange: (value: string) => void;
//     placeholder?: string;
// }
//
// export default function AuthInput({
//                                       label,
//                                       type = "text",
//                                       value,
//                                       onChange,
//                                       placeholder,
//                                   }: Props) {
//     return (
//         <div className="mb-6">
//
//             <label className="mb-2 block text-sm font-medium">
//                 {label}
//             </label>
//
//             <input
//                 type={type}
//                 value={value}
//                 placeholder={placeholder}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="w-full border border-gray-300 px-4 py-4 outline-none transition focus:border-black"
//             />
//
//         </div>
//     );
// }

"use client";

interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

export default function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
}: Props) {
  const id = `auth-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-[#555]"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="h-12 w-full rounded-lg border border-[#d8d8d8] bg-white px-4 text-base text-[#292929] outline-none transition-colors placeholder:text-sm placeholder:text-[#aaa] focus:border-[#777]"
      />
    </div>
  );
}