import api from "@/lib/axios";

export interface AdminProfile {

    id: string;

    firstName: string;

    lastName: string;

    email: string;

    phoneNumber: string;

    role: string;

}

export interface UpdateAdminProfileRequest {

    firstName: string;

    lastName: string;

    phoneNumber: string;

}

export interface ChangeEmailRequest {

    newEmail: string;

    password: string;

}

export interface ChangePasswordRequest {

    currentPassword: string;

    newPassword: string;

    confirmPassword: string;

}

export async function getAdminProfile(): Promise<AdminProfile> {

    const response = await api.get<AdminProfile>(
        "/admin/settings/profile"
    );

    return response.data;

}

export async function updateAdminProfile(
    request: UpdateAdminProfileRequest
): Promise<AdminProfile> {

    const response = await api.put<AdminProfile>(
        "/admin/settings/profile",
        request
    );

    return response.data;

}

export async function changeEmail(
    request: ChangeEmailRequest
): Promise<void> {

    await api.put(
        "/admin/settings/email",
        request
    );

}

export async function changePassword(
    request: ChangePasswordRequest
): Promise<void> {

    await api.put(
        "/admin/settings/password",
        request
    );

}