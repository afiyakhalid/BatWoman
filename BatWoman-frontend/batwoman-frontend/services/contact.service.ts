import api from "@/lib/axios";

export interface ContactRequest {
    name: string;
    email: string;
    phone: string;
    orderNumber?: string;
    message: string;
}

export async function sendContactMessage(request: ContactRequest): Promise<void> {
    await api.post("/contact", request);
}