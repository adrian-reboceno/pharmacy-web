// src/features/auth/api/auth.api.ts
import { post } from "@/api/httpClient";

export interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
  roles?: string[];
}

export interface LoginResponseData {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
  roles: string[];
  permissions: string[];
}

export interface LoginResponse {
  status: string;
  http_status: string;
  message: string;
  data: LoginResponseData;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  return await post<LoginResponse>("/auth/login", { email, password });
};

export const logoutApi = async (): Promise<void> => {
  await post("/auth/logout");
};
