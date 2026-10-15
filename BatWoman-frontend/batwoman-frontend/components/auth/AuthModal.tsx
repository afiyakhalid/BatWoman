// // "use client";
// //
// // import { useAuthModal } from "@/hooks/useAuthModal";
// //
// // import LoginForm from "./LoginForm";
// // import RegisterForm from "./RegisterForm";
// //
// // export default function AuthModal() {
// //     const {
// //         isOpen,
// //         mode,
// //         close,
// //         openLogin,
// //         openRegister,
// //     } = useAuthModal();
// //
// //     if (!isOpen) return null;
// //
// //     return (
// //         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
// //             <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
// //
// //                 <button
// //                     onClick={close}
// //                     className="absolute right-5 top-5 text-2xl"
// //                 >
// //                     ×
// //                 </button>
// //
// //                 <h2 className="mb-2 text-center font-[var(--font-playfair)] text-4xl">
// //                     {mode === "login"
// //                         ? "Welcome Back"
// //                         : "Create Account"}
// //                 </h2>
// //
// //                 <p className="mb-8 text-center text-sm text-gray-500">
// //                     {mode === "login"
// //                         ? "Login to continue shopping."
// //                         : "Register to continue shopping."}
// //                 </p>
// //
// //                 {mode === "login" ? (
// //                     <>
// //                         <LoginForm />
// //
// //                         <p className="mt-6 text-center text-sm">
// //                             Don't have an account?{" "}
// //                             <button
// //                                 onClick={openRegister}
// //                                 className="font-semibold underline"
// //                             >
// //                                 Register
// //                             </button>
// //                         </p>
// //                     </>
// //                 ) : (
// //                     <>
// //                         <RegisterForm />
// //
// //                         <p className="mt-6 text-center text-sm">
// //                             Already have an account?{" "}
// //                             <button
// //                                 onClick={openLogin}
// //                                 className="font-semibold underline"
// //                             >
// //                                 Login
// //                             </button>
// //                         </p>
// //                     </>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }
// "use client";
//
// import { useAuthModal } from "@/hooks/useAuthModal";
// import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";
// import ForgotPasswordForm from "./ForgotPasswordForm";
//
// export default function AuthModal() {
//     const {
//         isOpen,
//         mode,
//         close,
//         openLogin,
//         openRegister,
//     } = useAuthModal();
//
//     if (!isOpen) return null;
//
//     return (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
//             <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
//
//                 <button
//                     onClick={close}
//                     className="absolute right-5 top-5 text-2xl"
//                 >
//                     ×
//                 </button>
//
//                 <h2 className="mb-2 text-center font-[var(--font-playfair)] text-4xl">
//                     {mode === "login"
//                         ? "Welcome Back"
//                         : mode === "register"
//                         ? "Create Account"
//                         : "Reset Password"}
//                 </h2>
//
//                 <p className="mb-8 text-center text-sm text-gray-500">
//                     {mode === "login"
//                         ? "Login to continue shopping."
//                         : mode === "register"
//                         ? "Register to continue shopping."
//                         : "Enter your email to receive a recovery code."}
//                 </p>
//
//                 {mode === "login" && (
//                     <>
//                         <LoginForm />
//                         <p className="mt-6 text-center text-sm">
//                             Don't have an account?{" "}
//                             <button
//                                 onClick={openRegister}
//                                 className="font-semibold underline"
//                             >
//                                 Register
//                             </button>
//                         </p>
//                     </>
//                 )}
//
//                 {mode === "register" && (
//                     <>
//                         <RegisterForm />
//                         <p className="mt-6 text-center text-sm">
//                             Already have an account?{" "}
//                             <button
//                                 onClick={openLogin}
//                                 className="font-semibold underline"
//                             >
//                                 Login
//                             </button>
//                         </p>
//                     </>
//                 )}
//
//                 {mode === "forgot-password" && (
//                     <ForgotPasswordForm />
//                 )}
//             </div>
//         </div>
//     );
// }

// "use client";
//
// import { useAuthModal } from "@/hooks/useAuthModal";
// import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";
// import ForgotPasswordForm from "./ForgotPasswordForm";
//
// export default function AuthModal() {
//   const {
//     isOpen,
//     mode,
//     close,
//     openLogin,
//     openRegister,
//   } = useAuthModal();
//
//   if (!isOpen) return null;
//
//   const isRegister = mode === "register";
//   const isLogin = mode === "login";
//   const isForgot = mode === "forgot-password";
//
//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#e7e7e7] p-3 sm:p-6"
//       onMouseDown={(e) => {
//         if (e.target === e.currentTarget) close();
//       }}
//     >
//       <section
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="auth-heading"
//         className={`relative my-auto flex w-full overflow-hidden bg-white ${
//           isRegister
//             ? "min-h-[580px] max-w-[1000px] flex-col md:min-h-[605px] md:flex-row"
//             : "max-w-[500px] flex-col"
//         }`}
//       >
//         <button
//           type="button"
//           onClick={close}
//           aria-label="Close authentication"
//           className="absolute right-4 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#c6c6c6] text-xl font-light text-white transition hover:bg-black"
//         >
//           ×
//         </button>
//
//         {isRegister && (
//           <div
//             aria-hidden="true"
//             className="relative hidden min-h-full overflow-hidden md:block md:w-1/2"
//           >
//             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,#fff2a8_0%,transparent_34%),radial-gradient(ellipse_at_88%_18%,#f28ad9_0%,transparent_37%),radial-gradient(ellipse_at_20%_55%,#f38d69_0%,transparent_45%),radial-gradient(ellipse_at_85%_90%,#8b20c7_0%,transparent_48%),linear-gradient(135deg,#d8f1c7,#a3e5e7_48%,#ed8bcb)]" />
//
//             <div className="absolute inset-x-10 bottom-10 text-[#30252b]">
//               <p className="text-[10px] uppercase tracking-[0.35em]">
//                 BATWOMAN
//               </p>
//               <h2 className="mt-3 max-w-sm font-[var(--font-playfair)] text-4xl leading-tight">
//                 A quiet kind of luxury.
//               </h2>
//               <p className="mt-3 max-w-xs text-sm leading-6 text-[#493d42]">
//                 Timeless silhouettes. Considered details. Made for your moments.
//               </p>
//             </div>
//           </div>
//         )}
//
//         <div
//           className={`flex w-full flex-col justify-center ${
//             isRegister
//               ? "px-7 py-12 sm:px-12 md:w-1/2 md:px-14"
//               : "px-7 py-12 sm:px-12"
//           }`}
//         >
//           {isLogin && (
//             <div className="mb-8 flex justify-center border-b border-[#e6e6e6] pb-5">
//               <span
//                 aria-hidden="true"
//                 className="h-6 w-6 rounded-full bg-[#c6c6c6]"
//               />
//             </div>
//           )}
//
//           <div className={isLogin ? "mx-auto w-full max-w-[360px]" : "w-full"}>
//             <h1
//               id="auth-heading"
//               className={`font-medium text-[#333] ${
//                 isLogin
//                   ? "text-center text-xl"
//                   : "text-2xl tracking-tight"
//               }`}
//             >
//               {isLogin
//                 ? "Log in"
//                 : isRegister
//                   ? "Create an account"
//                   : "Reset password"}
//             </h1>
//
//             {isRegister && (
//               <p className="mb-6 mt-2 text-[11px] text-[#666]">
//                 Already have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={openLogin}
//                   className="text-[#222] underline underline-offset-2"
//                 >
//                   Log in
//                 </button>
//               </p>
//             )}
//
//             {isLogin && (
//               <div className="mt-5">
//                 <LoginForm />
//
//                 <div className="mt-6 border-t border-[#dedede] pt-6 text-center">
//                   <h2 className="text-[15px] font-medium text-[#444]">
//                     Don’t have an account?
//                   </h2>
//                   <button
//                     type="button"
//                     onClick={openRegister}
//                     className="mt-3 flex h-[41px] w-full items-center justify-center rounded-full border border-[#999] text-[13px] text-[#333] transition hover:border-black hover:bg-black hover:text-white"
//                   >
//                     Sign up
//                   </button>
//                 </div>
//               </div>
//             )}
//
//             {isRegister && <RegisterForm />}
//
//             {isForgot && <ForgotPasswordForm />}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function AuthModal() {
  const {
    isOpen,
    mode,
    close,
    openLogin,
    openRegister,
  } = useAuthModal();

  if (!isOpen) return null;

  const isRegister = mode === "register";
  const isLogin = mode === "login";
  const isForgot = mode === "forgot-password";
  const showSplitPanel = isLogin || isRegister;

  const headingClass = isLogin
    ? "text-center text-3xl tracking-tight font-medium text-[#333] sm:text-4xl"
    : "text-3xl tracking-tight font-medium text-[#333] sm:text-4xl";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/35 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-heading"
        className={`relative my-auto flex w-full flex-col overflow-hidden bg-white shadow-2xl ${
          showSplitPanel
            ? "max-w-[1000px] rounded-2xl md:min-h-[605px] md:flex-row"
            : "max-w-[500px] rounded-2xl"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close authentication"
          className="absolute right-4 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-2xl font-light text-[#333] transition hover:bg-black hover:text-white"
        >
          ×
        </button>

        {/* Left half — same colorful background for login and signup */}
        {showSplitPanel && (
          <div
            aria-hidden="true"
            className="relative hidden overflow-hidden md:block md:min-h-[605px] md:w-1/2"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,#fff2a8_0%,transparent_34%),radial-gradient(ellipse_at_88%_18%,#f28ad9_0%,transparent_37%),radial-gradient(ellipse_at_20%_55%,#f38d69_0%,transparent_45%),radial-gradient(ellipse_at_85%_90%,#8b20c7_0%,transparent_48%),linear-gradient(135deg,#d8f1c7,#a3e5e7_48%,#ed8bcb)]" />

            <div className="absolute inset-x-8 bottom-8 text-[#30252b] sm:inset-x-10 sm:bottom-10">
              <p className="text-xs font-medium uppercase tracking-[0.35em]">
                ZUBAYDABYA3
              </p>

              <h2 className="mt-4 max-w-sm font-[var(--font-playfair)] text-4xl leading-tight sm:text-5xl">
                Elegance, woven into every moment.
              </h2>

              <p className="mt-4 max-w-sm text-base leading-7 text-[#493d42] sm:text-lg">
                Refined abayas. Timeless silhouettes. Your style, beautifully expressed.
              </p>
            </div>
          </div>
        )}

        {/* Right half — authentication forms */}
        <div
          className={`flex w-full flex-col justify-center ${
            showSplitPanel
              ? "px-6 py-10 sm:px-10 md:w-1/2 md:px-12"
              : "px-7 py-12 sm:px-12"
          }`}
        >
          {isLogin && (
            <div className="mb-6 flex justify-center border-b border-[#e6e6e6] pb-5">
              <span
                aria-hidden="true"
                className="h-6 w-6 rounded-full bg-[#c6c6c6]"
              />
            </div>
          )}

          <div
            className={
              showSplitPanel
                ? "mx-auto w-full max-w-[380px]"
                : "w-full"
            }
          >
            <h1 id="auth-heading" className={headingClass}>
              {isLogin
                ? "Log in"
                : isRegister
                  ? "Create an account"
                  : "Reset password"}
            </h1>

            {isRegister && (
              <p className="mb-6 mt-2 text-sm text-[#666]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={openLogin}
                  className="text-[#222] underline underline-offset-2"
                >
                  Log in
                </button>
              </p>
            )}

            {isLogin && (
              <div className="mt-6">
                <LoginForm />

                <div className="mt-6 border-t border-[#dedede] pt-6 text-center">
                  <h2 className="text-[15px] font-medium text-[#444]">
                    Don’t have an account?
                  </h2>

                  <button
                    type="button"
                    onClick={openRegister}
                    className="mt-3 flex h-11 w-full items-center justify-center rounded-full border border-[#999] text-sm text-[#333] transition hover:border-black hover:bg-black hover:text-white"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            )}

            {isRegister && <RegisterForm />}

            {isForgot && <ForgotPasswordForm />}
          </div>
        </div>
      </section>
    </div>
  );
}