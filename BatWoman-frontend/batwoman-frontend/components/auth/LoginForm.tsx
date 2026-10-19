// "use client";
//
// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { useAuthModal } from "@/hooks/useAuthModal";
//
// import Link from "next/link";
//
// import AuthInput from "./AuthInput";
// import PasswordInput from "./PasswordInput";
//
// import { useLogin } from "@/hooks/useLogin";
//
// export default function LoginForm() {
//
//     const [email, setEmail] = useState("");
//     const { openForgotPassword } = useAuthModal();
//
//     const [password, setPassword] = useState("");
//
//     const login = useLogin();
//
//     const handleSubmit = (e: React.FormEvent) => {
//
//         e.preventDefault();
//
//         login.mutate({
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
//             <AuthInput
//                 label="Email"
//                 type="email"
//                 value={email}
//                 onChange={setEmail}
//                 placeholder="Enter your email"
//             />
//
//             <PasswordInput
//                 label="Password"
//                 value={password}
//                 onChange={setPassword}
//             />
//
//            <div className="flex justify-end">
//                <button
//                    type="button"
//                    onClick={openForgotPassword}
//                    className="text-sm text-neutral-600 hover:text-black"
//                >
//                    Forgot Password?
//                </button>
//            </div>
//
//             {login.isError && (
//
//                 <p className="text-sm text-red-600">
//
//                     Invalid email or password.
//
//                 </p>
//
//             )}
//
//             <button
//                 type="submit"
//                 disabled={login.isPending}
//                 className="w-full bg-black py-4 text-white transition hover:bg-neutral-800 disabled:opacity-50"
//             >
//
//                 {login.isPending
//                     ? "Signing In..."
//                     : "Sign In"}
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

// "use client";
//
// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { useAuthModal } from "@/hooks/useAuthModal";
// import AuthInput from "./AuthInput";
// import PasswordInput from "./PasswordInput";
// import { useLogin } from "@/hooks/useLogin";
//
// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(true);
//
//   const { openForgotPassword } = useAuthModal();
//   const login = useLogin();
//
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//
//     login.mutate({
//       email: email.trim(),
//       password,
//     });
//   };
//
//   const handleGoogleLogin = () => {
//     const apiBase = process.env.NEXT_PUBLIC_API_BASE;
//
//     if (!apiBase) {
//       console.error("NEXT_PUBLIC_API_BASE is not configured.");
//       return;
//     }
//
//     window.location.href = `${apiBase}/oauth2/authorization/google`;
//   };
//
//   return (
//     <form onSubmit={handleSubmit} className="w-full space-y-5">
//       {/* Social sign-in */}
//       <div className="space-y-2.5">
//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           className="flex h-[41px] w-full items-center justify-center gap-3 rounded-full border border-[#bdbdbd] bg-transparent text-[12px] text-[#333] transition hover:border-[#333]"
//         >
//           <FcGoogle size={17} />
//           Continue with Google
//         </button>
//
//         <button
//           type="button"
//           disabled
//           title="Facebook sign-in has not been configured."
//           className="flex h-[41px] w-full cursor-not-allowed items-center justify-center gap-3 rounded-full border border-[#d0d0d0] text-[12px] text-[#777] opacity-75"
//         >
//           <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#1877F2] text-[12px] font-bold text-white">
//             f
//           </span>
//           Continue with Facebook
//         </button>
//
//         <button
//           type="button"
//           disabled
//           title="Apple sign-in has not been configured."
//           className="flex h-[41px] w-full cursor-not-allowed items-center justify-center gap-3 rounded-full border border-[#d0d0d0] text-[12px] text-[#777] opacity-75"
//         >
//           <span className="text-[16px] text-[#333]">●</span>
//           Continue with Apple
//         </button>
//       </div>
//
//       {/* Divider */}
//       <div className="flex items-center gap-3 py-1">
//         <span className="h-px flex-1 bg-[#d8d8d8]" />
//         <span className="text-[12px] text-[#444]">OR</span>
//         <span className="h-px flex-1 bg-[#d8d8d8]" />
//       </div>
//
//       {/* Credentials */}
//       <div className="space-y-4">
//         <AuthInput
//           label="Email address or user name"
//           value={email}
//           onChange={setEmail}
//           placeholder=""
//           autoComplete="username"
//         />
//
//         <div>
//           <PasswordInput
//             label="Password"
//             value={password}
//             onChange={setPassword}
//             autoComplete="current-password"
//           />
//
//           <div className="mt-2 flex justify-end">
//             <button
//               type="button"
//               onClick={openForgotPassword}
//               className="text-[11px] text-[#333] underline underline-offset-2 transition hover:text-[#777]"
//             >
//               Forgot your password?
//             </button>
//           </div>
//         </div>
//       </div>
//
//       <label className="flex cursor-pointer items-center gap-2 text-[11px] text-[#444]">
//         <input
//           type="checkbox"
//           checked={rememberMe}
//           onChange={(e) => setRememberMe(e.target.checked)}
//           className="h-[12px] w-[12px] accent-black"
//         />
//         Remember me
//       </label>
//
//       {login.isError && (
//         <p role="alert" className="text-[12px] text-red-600">
//           Invalid email or password. Please try again.
//         </p>
//       )}
//
//       <button
//         type="submit"
//         disabled={login.isPending}
//         className="flex h-[41px] w-full items-center justify-center rounded-full bg-[#bfbfbf] text-[13px] font-medium text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-60"
//       >
//         {login.isPending ? "Logging in..." : "Log in"}
//       </button>
//
//       {/*
//         Note: rememberMe currently controls the checkbox UI only.
//         Persisting a session preference requires support in your auth
//         service/store; this component does not change that behavior.
//       */}
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthModal } from "@/hooks/useAuthModal";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const { openForgotPassword } = useAuthModal();
  const login = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate({ email: email.trim(), password });
  };

  const handleGoogleLogin = () => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE;

    if (!apiBase) {
      console.error("NEXT_PUBLIC_API_BASE is not configured.");
      return;
    }

    window.location.href = `${apiBase}/oauth2/authorization/google`;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {/* Google sign-in */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-full border border-[#c8c8c8] px-4 text-sm font-medium text-[#333] transition hover:border-black sm:text-[15px]"
      >
        <FcGoogle size={19} />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-[#dedede]" />
        <span className="text-xs font-medium text-[#666]">OR</span>
        <span className="h-px flex-1 bg-[#dedede]" />
      </div>

      {/* Email */}
      <AuthInput
        label="Email address or username"
        type="text"
        value={email}
        onChange={setEmail}
        placeholder="Enter your email"
        autoComplete="username"
      />

      {/* Password */}
      <div>
        <PasswordInput
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        <div className="mt-1 text-right">
          <button
            type="button"
            onClick={openForgotPassword}
            className="text-xs font-medium text-[#444] underline underline-offset-2 transition hover:text-black sm:text-[13px]"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Remember me */}
      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#444]">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 accent-black"
        />
        Remember me
      </label>

      {login.isError && (
        <p role="alert" className="text-sm text-red-600">
          Invalid email or password. Please try again.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={login.isPending}
        className="flex h-11 w-full items-center justify-center rounded-full bg-black px-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 sm:text-[15px]"
      >
        {login.isPending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
