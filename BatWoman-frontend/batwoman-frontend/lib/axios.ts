import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

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

    /*
     * Let Axios/browser determine the correct Content-Type.
     *
     * - Normal JavaScript objects -> application/json
     * - FormData -> multipart/form-data with the required boundary
     */
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    } else if (config.data !== undefined) {
        config.headers["Content-Type"] = "application/json";
    }

    return config;
});

export default api;
