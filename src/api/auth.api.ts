import { post } from "./httpClient";

// ------------------- Tipados -------------------
export interface User {
  id: number;
  name: string;
  email: string;
  permissions: never[];
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

// ------------------- Funciones API -------------------
/**
 * Login de usuario
 * @param email
 * @param password
 * @returns LoginResponse
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  return await post<LoginResponse>("/auth/login", { email, password });
};

/**
 * Logout (opcional si tu backend tiene endpoint)
 */
export const logoutApi = async (): Promise<void> => {
  await post("/auth/logout");
};
