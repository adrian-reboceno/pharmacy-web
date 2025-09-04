// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1", // 👈 apunta a tu backend Laravel
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor opcional para agregar token si existe
axios.interceptors.response.use(
  response => response,
  error => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Error inesperado";

    let severity: "error" | "warning" | "info" = "error";
    if (error.response?.status === 422) severity = "warning";
    if (error.response?.status === 500) severity = "info";

    addToast({ id: btoa(message), message, severity });
    return Promise.reject(error);
  }
);

export default api;
function addToast(_arg0: { id: string; message: any; severity: "error" | "warning" | "info"; }) {
  throw new Error("Function not implemented.");
}

