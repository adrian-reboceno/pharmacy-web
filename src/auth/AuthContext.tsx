// src/auth/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { login as apiLogin, type LoginResponse } from "@/api/auth";
import { storage } from "@/store/localStorage";
import { useToast } from "@/components/ToastContainer";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast, removeToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User | null>(() => {
    const stored = storage.getUser();
    return stored
      ? { ...stored, roles: stored.roles || [], permissions: stored.permissions || [] }
      : null;
  });

  const showToastOnce = (message: string, severity: "success" | "error" | "warning" | "info") => {
    const toastId = btoa(message);
    removeToast(toastId);
    addToast({ id: toastId, message, severity });
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response: LoginResponse = await apiLogin(email, password);
      const { access_token, user: apiUser, roles, permissions } = response.data;

      storage.setToken(access_token);

      const loggedUser: User = {
        id: apiUser.id,
        name: apiUser.name ?? "Sin nombre",
        email: apiUser.email ?? "sin-email",
        permissions: permissions ?? [],
        roles: roles ?? [], // 🔹 roles tomados directamente desde response.data.roles
      };
     

      storage.setUser(loggedUser);
      setUser(loggedUser);

      showToastOnce(response.message || "Bienvenido 👋", "success");
    } catch (err: any) {
      console.error("Login error:", err);
      showToastOnce(err?.message || "Error al iniciar sesión", "error");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    storage.removeUser();
    storage.removeToken();
    showToastOnce("Sesión cerrada", "info");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
