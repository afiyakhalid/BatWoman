// "use client";
//
// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
//
// import AuthInput from "./AuthInput";
// import PasswordInput from "./PasswordInput";
//
// import { useRegister } from "@/hooks/useRegister";
//
// export default function RegisterForm() {
//
//     const register = useRegister();
//
//     const [firstName, setFirstName] = useState("");
//
//     const [lastName, setLastName] = useState("");
//
//     const [email, setEmail] = useState("");
//
//     const [password, setPassword] = useState("");
//
//     const [confirmPassword, setConfirmPassword] = useState("");
//
//     const handleSubmit = (e: React.FormEvent) => {
//
//         e.preventDefault();
//
//         if (password !== confirmPassword) {
//
//             alert("Passwords do not match.");
//
//             return;
//
//         }
//
//         register.mutate({
//
//             firstName,
//
//             lastName,
//
//             email,
//
//             password,
//
//         });
//
//     };
//     const handleGoogleLogin = () => {
//     window.location.href =
//         `${process.env.NEXT_PUBLIC_API_BASE}/oauth2/authorization/google`;
// };
//
//     return (
//
//         <form
//             onSubmit={handleSubmit}
//             className="space-y-6"
//         >
//
//             <div className="grid grid-cols-2 gap-4">
//
//                 <AuthInput
//                     label="First Name"
//                     value={firstName}
//                     onChange={setFirstName}
//                 />
//
//                 <AuthInput
//                     label="Last Name"
//                     value={lastName}
//                     onChange={setLastName}
//                 />
//
//             </div>
//
//             <AuthInput
//                 label="Email"
//                 type="email"
//                 value={email}
//                 onChange={setEmail}
//             />
//
//             <PasswordInput
//                 label="Password"
//                 value={password}
//                 onChange={setPassword}
//             />
//
//             <PasswordInput
//                 label="Confirm Password"
//                 value={confirmPassword}
//                 onChange={setConfirmPassword}
//             />
//
//             {register.isError && (
//
//                 <p className="text-sm text-red-600">
//
//                     Registration failed.
//
//                 </p>
//
//             )}
//
//             <button
//                 type="submit"
//                 disabled={register.isPending}
//                 className="w-full bg-black py-4 text-white hover:bg-neutral-800 transition disabled:opacity-50"
//             >
//
//                 {register.isPending
//                     ? "Creating Account..."
//                     : "Create Account"}
//
//             </button>
//             <div className="relative py-2">
//     <div className="absolute inset-0 flex items-center">
//         <div className="w-full border-t border-neutral-200" />
//     </div>
//
//     <div className="relative flex justify-center">
//         <span className="bg-white px-4 text-xs uppercase tracking-[0.25em] text-neutral-400">
//             OR
//         </span>
//     </div>
// </div>
//
// <button
//     type="button"
//     onClick={handleGoogleLogin}
//     className="flex w-full items-center justify-center gap-3 border border-neutral-300 py-4 text-sm font-medium transition hover:border-black hover:bg-neutral-50"
// >
//     <FcGoogle size={22} />
//
//     Continue with Google
// </button>
//
//         </form>
//
//     );
//
// }

"use client";

import { useState } from "react";
import { useAuthModal } from "@/hooks/useAuthModal";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterForm() {
  const register = useRegister();
  const { openLogin } = useAuthModal();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    register.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <AuthInput
          label="First name"
          value={firstName}
          onChange={setFirstName}
          autoComplete="given-name"
        />
        <AuthInput
          label="Last name"
          value={lastName}
          onChange={setLastName}
          autoComplete="family-name"
        />
      </div>

      <AuthInput
        label="Email address"
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
      />

      <div>
        <PasswordInput
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />
        <p className="mt-1.5 text-[10px] leading-4 text-[#777]">
          Use a strong password with a mix of letters, numbers and symbols.
        </p>
      </div>

      <PasswordInput
        label="Confirm password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        autoComplete="new-password"
      />

      {(passwordError || register.isError) && (
        <p role="alert" className="text-[12px] text-red-600">
          {passwordError || "We couldn't create your account. Please try again."}
        </p>
      )}

      <p className="text-[11px] leading-[1.7] text-[#666]">
        By creating an account, you agree to our{" "}
        <a
          href="/terms"
          className="text-[#222] underline underline-offset-2"
        >
          Terms of Use
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="text-[#222] underline underline-offset-2"
        >
          Privacy Policy
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={register.isPending}
        className="flex h-[41px] w-full items-center justify-center rounded-full bg-[#bfbfbf] text-[13px] font-medium text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {register.isPending ? "Creating account..." : "Create an account"}
      </button>

      <p className="text-center text-[11px] text-[#555]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={openLogin}
          className="text-[#222] underline underline-offset-2"
        >
          Log in
        </button>
      </p>
    </form>
  );
}
