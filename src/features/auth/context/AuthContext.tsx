// rc/features/auth/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
//import { login as apiLogin, type LoginResponse } from "@/features/auth/api/auth.api";
import { login as apiLogin, type LoginResponse } from '@/features/auth/api/auth.api';
import { setAccessToken, clearAccessToken } from '@/features/auth/services/tokenService';
import * as userStorage from '@/features/auth/services/userStorage';
import { useToast } from "@/components/feedback/ToastContainer";

export interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
  roles: string[];
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast, removeToast } = useToast();
  const [loading, setLoading] = useState(false);

  // Estado inicial desde localStorage
  const [user, setUser] = useState<User | null>(() => {
    const stored = userStorage.getUser();
    return stored
      ? { ...stored, roles: stored.roles || [], permissions: stored.permissions || [] }
      : null;
  });

  // Helper para evitar toasts duplicados
  const showToastOnce = (message: string, severity: "success" | "error" | "warning" | "info") => {
    const toastId = btoa(message);
    removeToast(toastId);
    addToast({ id: toastId, message, severity });
  };

  // --- Login ---
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response: LoginResponse = await apiLogin(email, password);
      const { access_token, user: apiUser, roles, permissions } = response.data;

      // Guardar token y usuario
      setAccessToken(access_token);
      const loggedUser: User = {
        id: apiUser.id,
        name: apiUser.name ?? "Sin nombre",
        email: apiUser.email ?? "sin-email",
        permissions: permissions ?? [],
        roles: roles ?? [],
      };

      userStorage.setUser(loggedUser);
      setUser(loggedUser);

      showToastOnce(response.message || "Bienvenido 👋", "success");
    } catch (err: any) {
      console.error("Login error:", err);
      showToastOnce(err?.message || "Error al iniciar sesión", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- Logout ---
  const logout = () => {
    clearAccessToken();
    userStorage.clearUser();
    setUser(null);
    showToastOnce("Sesión cerrada", "info");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
