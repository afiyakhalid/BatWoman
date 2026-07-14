import api from "@/lib/axios";

import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from "@/types/auth";

export interface CurrentUser {

    id: string;

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    role: string;

}

export async function login(
    request: LoginRequest
): Promise<LoginResponse> {

    const { data } = await api.post<LoginResponse>(
        "/auth/login",
        request
    );

    return data;
}

export async function register(
    request: RegisterRequest
): Promise<RegisterResponse> {

    const { data } = await api.post<RegisterResponse>(
        "/auth/register",
        request
    );

    return data;
}

export async function logout(
    refreshToken: string
) {

    await api.post(
        `/auth/logout?refreshToken=${refreshToken}`
    );

}

export async function getCurrentUser(): Promise<CurrentUser> {

    const { data } = await api.get<CurrentUser>(
        "/auth/me"
    );

    return data;

}