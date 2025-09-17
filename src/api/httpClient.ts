import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { getAccessToken, logout } from "@/auth/tokenService";

// Crear instancia de Axios
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s timeout
});

// -------------------- Interceptor de Request --------------------
httpClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------- Interceptor de Response --------------------
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Manejo de 401: token expirado o no autorizado
    if (error.response?.status === 401) {
      console.warn("Unauthorized request - redirecting to login");
      logout(); // opcional: limpiar token y redirigir
      window.location.href = "/login";
    }

    // Manejo de otros errores globales
    if (error.response) {
      console.error("HTTP Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Axios error:", error.message);
    }

    return Promise.reject(error);
  }
);

// -------------------- Helpers Genéricos --------------------

// GET genérico
export const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const { data } = await httpClient.get<T>(url, config);
  return data;
};

// POST genérico
export const post = async <T>(url: string, payload?: any, config?: AxiosRequestConfig) => {
  const { data } = await httpClient.post<T>(url, payload, config);
  return data;
};

// PUT genérico
export const put = async <T>(url: string, payload?: any, config?: AxiosRequestConfig) => {
  const { data } = await httpClient.put<T>(url, payload, config);
  return data;
};

// DELETE genérico
export const del = async <T>(url: string, config?: AxiosRequestConfig) => {
  const { data } = await httpClient.delete<T>(url, config);
  return data;
};
