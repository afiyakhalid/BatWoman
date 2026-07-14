import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {

    if (typeof window === "undefined") {
        return config;
    }

    const token = localStorage.getItem("accessToken");

    if (
        token &&
        !config.url?.includes("/auth/login") &&
        !config.url?.includes("/auth/register")
    ) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;