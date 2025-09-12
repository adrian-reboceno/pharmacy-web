// src/api/axios.ts
import axios from "axios";
import { storage } from "@/store/localStorage";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token a cada request
api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// Interceptor para manejo global de errores (sin Toast directo aquí)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Opcional: puedes lanzar el error y que los componentes manejen el Toast
    return Promise.reject(error);
  }
);

export default api;
