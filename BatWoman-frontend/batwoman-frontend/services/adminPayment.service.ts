import api from "@/lib/axios";

export interface Payment {

    paymentId: string;

    orderId: string;

    razorpayOrderId: string;

    razorpayPaymentId: string | null;

    amount: number;

    currency: string;

    status: string;

    paidAt: string | null;

}

export async function getPayments(): Promise<Payment[]> {

    const { data } = await api.get(
        "/admin/payments"
    );

    return data;

}

export async function getPayment(
    paymentId: string
): Promise<Payment> {

    const { data } = await api.get(
        `/admin/payments/${paymentId}`
    );

    return data;

}