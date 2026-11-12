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