import api from "@/lib/axios";

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export async function register(request: RegisterRequest) {
    const { data } = await api.post<AuthResponse>(
        "/auth/register",
        request
    );

    return data;
}

export async function login(request: LoginRequest) {
    const { data } = await api.post<AuthResponse>(
        "/auth/login",
        request
    );

    return data;
}

export async function refreshToken(refreshToken: string) {
    const { data } = await api.post<AuthResponse>(
        "/auth/refresh",
        {
            refreshToken,
        }
    );

    return data;
}

export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}