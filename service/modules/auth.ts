import { ApiResponse } from "../api";

export interface LoginResponse  {
    accessToken: string;
    refreshToken: string;
    time: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export async function login(rq : LoginRequest) : Promise<ApiResponse<LoginResponse>> {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login-normal`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rq),
        credentials: "include", // Include cookies for refresh token
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    const data: ApiResponse<LoginResponse> = await response.json();
    return data;
}

export async function logout() : Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include", // Include cookies for refresh token
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
    }
    localStorage.removeItem("access_token_expire_in");
}