// src/auth/tokenService.ts

const TOKEN_KEY = "access_token";

// 👉 guardar token en localStorage
export const setToken = (token: string) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    console.error("Error guardando token en localStorage:", err);
  }
};

// 👉 obtener token
export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (err) {
    console.error("Error leyendo token de localStorage:", err);
    return null;
  }
};

// 👉 eliminar token
export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error("Error eliminando token de localStorage:", err);
  }
};

// 👉 opcional: decodificar payload del JWT
export const decodeToken = <T extends object = any>(token: string): T | null => {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded) as T;
  } catch {
    return null;
  }
};
