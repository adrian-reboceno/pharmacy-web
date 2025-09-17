// src/features/auth/hooks/useAuth.ts
import { useState } from "react";
import { login as loginApi, logoutApi, type LoginResponse } from "@/features/auth/api/auth.api";
import { setAccessToken, clearAccessToken } from "@/features/auth/services/tokenService";
import { setUser, getUser, removeUser, type StoredUser } from "@/features/auth/services/userStorage";

export function useAuth() {
  const [user, setUserState] = useState<StoredUser | null>(() => getUser());
  const [loading, setLoading] = useState(false);

  /**
   * Login de usuario
   */
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response: LoginResponse = await loginApi(email, password);
      const { access_token, user: apiUser, roles, permissions } = response.data;

      // Guardar token
      setAccessToken(access_token);

      // Armar usuario con roles y permisos
      const loggedUser: StoredUser = {
        id: apiUser.id,
        name: apiUser.name,
        email: apiUser.email,
        roles: roles ?? [],
        permissions: permissions ?? [],
      };

      // Guardar usuario en storage y estado
      setUser(loggedUser);
      setUserState(loggedUser);

      return loggedUser;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout de usuario
   */
  const logout = async () => {
    try {
      await logoutApi(); // opcional si tu backend expone endpoint
    } catch {
      // ignoramos errores del logout API
    } finally {
      clearAccessToken();
      removeUser();
      setUserState(null);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
