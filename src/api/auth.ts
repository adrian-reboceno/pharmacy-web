// src/api/auth.ts
import api from "./axios";

export interface LoginResponse {
  status: string;
  http_status: string;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: {
      permissions: never[];
      id: number;
      name: string;
      email: string;
    };
    roles: string[];
    permissions: string[];
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", { email, password });
  return response.data;
}
