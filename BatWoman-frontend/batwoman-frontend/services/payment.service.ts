import api from "@/lib/axios";

export interface CreatePaymentRequest {
    orderId: string;
}

export interface VerifyPaymentRequest {
    paymentId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}

export interface PaymentResponse {

    paymentId: string;

    orderId: string;

    razorpayOrderId: string;

    razorpayPaymentId: string | null;

    amount: number;

    currency: string;

    status: string;

    paidAt: string | null;
}

export async function createPayment(
    request: CreatePaymentRequest
): Promise<PaymentResponse> {

    const { data } = await api.post(
        "/payments",
        request
    );

    return data;
}

export async function verifyPayment(
    request: VerifyPaymentRequest
): Promise<PaymentResponse> {

    const { data } = await api.post(
        "/payments/verify",
        request
    );

    return data;
}