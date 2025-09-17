// src/features/auth/services/tokenService.ts

const TOKEN_KEY = "access_token";

/**
 * Guardar token en localStorage
 */
export const setAccessToken = (token: string) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    console.error("Error guardando token en localStorage:", err);
  }
};

/**
 * Obtener token desde localStorage
 */
export const getAccessToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (err) {
    console.error("Error leyendo token de localStorage:", err);
    return null;
  }
};

/**
 * Eliminar token de localStorage
 */
export const clearAccessToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error("Error eliminando token de localStorage:", err);
  }
};

/**
 * Decodificar payload del JWT
 */
export const decodeToken = <T extends object = any>(token: string): T | null => {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded) as T;
  } catch {
    return null;
  }
};
