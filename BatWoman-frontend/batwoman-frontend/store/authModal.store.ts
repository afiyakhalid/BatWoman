// "use client";
//
// import { create } from "zustand";
//
// type AuthMode = "login" | "register";
//
// interface AuthModalState {
//     isOpen: boolean;
//     mode: AuthMode;
//
//     openLogin: () => void;
//     openRegister: () => void;
//     close: () => void;
// }
//
// export const useAuthModalStore = create<AuthModalState>((set) => ({
//     isOpen: false,
//
//     mode: "login",
//
//     openLogin: () =>
//         set({
//             isOpen: true,
//             mode: "login",
//         }),
//
//     openRegister: () =>
//         set({
//             isOpen: true,
//             mode: "register",
//         }),
//
//     close: () =>
//         set({
//             isOpen: false,
//         }),
// }));
"use client";

import { create } from "zustand";

type AuthMode = "login" | "register" | "forgot-password";

interface AuthModalState {
    isOpen: boolean;
    mode: AuthMode;

    openLogin: () => void;
    openRegister: () => void;
    openForgotPassword: () => void;
    close: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
    isOpen: false,

    mode: "login",

    openLogin: () =>
        set({
            isOpen: true,
            mode: "login",
        }),

    openRegister: () =>
        set({
            isOpen: true,
            mode: "register",
        }),

    openForgotPassword: () =>
        set({
            isOpen: true,
            mode: "forgot-password",
        }),

    close: () =>
        set({
            isOpen: false,
        }),
}));