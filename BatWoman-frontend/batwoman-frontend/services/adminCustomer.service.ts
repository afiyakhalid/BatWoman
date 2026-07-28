import api from "@/lib/axios";

export interface Customer {

    customerId: string;

    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    role: string;

    verified: boolean;

    active: boolean;

    totalOrders: number;

    createdAt: string;

}

export async function getCustomers(): Promise<Customer[]> {

    const { data } = await api.get(
        "/admin/customers"
    );

    return data;

}

export async function getCustomer(
    customerId: string
): Promise<Customer> {

    const { data } = await api.get(
        `/admin/customers/${customerId}`
    );

    return data;

}