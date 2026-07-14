import api from "@/lib/axios";

import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from "@/types/auth";

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

export async function logout(refreshToken: string) {
    await api.post(
        `/auth/logout?refreshToken=${refreshToken}`
    );
}