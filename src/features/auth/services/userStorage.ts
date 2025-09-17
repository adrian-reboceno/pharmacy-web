// src/features/auth/services/userStorage.ts

const USER_KEY = "app_user";

export interface StoredUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  [key: string]: any;
}

/**
 * Guardar usuario en localStorage
 */
export const setUser = (user: StoredUser) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Error guardando usuario en localStorage:", err);
  }
};

/**
 * Obtener usuario desde localStorage
 */
export const getUser = (): StoredUser | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch (err) {
    console.error("Error leyendo usuario de localStorage:", err);
    return null;
  }
};

/**
 * Eliminar usuario de localStorage
 */
export const removeUser = () => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error("Error eliminando usuario de localStorage:", err);
  }
};

/**
 * Alias para compatibilidad con nombres tipo "clearUser"
 */
export const clearUser = removeUser;
