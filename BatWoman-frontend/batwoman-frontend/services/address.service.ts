import api from "@/lib/axios";

export interface Address {

    id: string;

    fullName: string;

    phone: string;

    addressLine1: string;

    addressLine2: string;

    city: string;

    state: string;

    country: string;

    postalCode: string;

    defaultAddress: boolean;
}

export interface CreateAddressRequest {

    fullName: string;

    phone: string;

    addressLine1: string;

    addressLine2?: string;

    city: string;

    state: string;

    country: string;

    postalCode: string;

    defaultAddress: boolean;
}

export type UpdateAddressRequest =
    CreateAddressRequest;

export async function getAddresses(): Promise<Address[]> {

    const { data } = await api.get<Address[]>(
        "/addresses"
    );

    return data;
}

export async function createAddress(

    request: CreateAddressRequest

): Promise<Address> {

    const { data } = await api.post<Address>(
        "/addresses",
        request
    );

    return data;
}

export async function updateAddress(

    addressId: string,

    request: UpdateAddressRequest

): Promise<Address> {

    const { data } = await api.put<Address>(
        `/addresses/${addressId}`,
        request
    );

    return data;
}

export async function deleteAddress(

    addressId: string

): Promise<void> {

    await api.delete(
        `/addresses/${addressId}`
    );
}