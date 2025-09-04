// src/auth/AuthContext.tsx
/*import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { login as apiLogin, type LoginResponse } from "@/api/auth";
import { useToast } from "@/components/ToastContainer";

export interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
  [key: string]: any;
}

interface DecodedToken {
  sub: number;
  name?: string;
  email?: string;
  permissions?: string[];
  user?: {
    id: number;
    name: string;
    email: string;
    permissions: string[];
  };
  exp?: number;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast, removeToast } = useToast();

  const showToastOnce = (message: string, severity: "success" | "error" | "warning" | "info") => {
    const toastId = btoa(message);
    removeToast(toastId);
    addToast({ id: toastId, message, severity });
  };

  // Extraer usuario desde el token decodificado
  const mapDecodedToUser = (decoded: DecodedToken): User => {
    console.log("Decoded JWT:", decoded); // 👀 Revisa aquí tu token real
    return {
      id: decoded.sub ?? decoded.user?.id ?? 0,
      name: decoded.name ?? decoded.user?.name ?? "Sin nombre",
      email: decoded.email ?? decoded.user?.email ?? "sin-email",
      permissions: decoded.permissions ?? decoded.user?.permissions ?? [],
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(mapDecodedToUser(decoded));
        }
      } catch {
        logout();
      }
    }
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response: LoginResponse = await apiLogin(email, password);
      const token = response.data.access_token;

      // Guardar token
      localStorage.setItem("authToken", token);

      // Aquí el backend debería devolverte también el usuario
      const loggedUser: User = {
        id: response.data.user?.id ?? parseInt(jwtDecode<any>(token).sub, 10),
        name: response.data.user?.name ?? "Sin nombre",
        email: response.data.user?.email ?? "sin-email",
        permissions: response.data.user?.permissions ?? [],
      };

      setUser(loggedUser);

      showToastOnce(response.message || "Bienvenido 👋", "success");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Error inesperado al iniciar sesión";

      let severity: "error" | "warning" | "info" = "error";
      if (err.response?.status === 422) severity = "warning";
      if (err.response?.status === 500) severity = "info";

      showToastOnce(message, severity);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    showToastOnce("Sesión cerrada", "info");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
*/

import React, { createContext, useContext, useState } from "react";
import { login as apiLogin, type LoginResponse } from "@/api/auth";
import { storage } from "@/store/localStorage"; // el helper que me mostraste
import { useToast } from "@/components/ToastContainer";

export interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
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
  const [user, setUser] = useState<User | null>(storage.getUser());
  const [loading, setLoading] = useState(false);
  const { addToast, removeToast } = useToast();

  // Mostrar toast solo una vez por mensaje
  const showToastOnce = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    const toastId = btoa(message);
    removeToast(toastId);
    addToast({ id: toastId, message, severity });
  };

  // LOGIN
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response: LoginResponse = await apiLogin(email, password);
      const { access_token, user: apiUser, permissions } = response.data;

      // Guardar token
      storage.setToken(access_token);

      // Armar objeto User
      const loggedUser: User = {
        id: apiUser.id,
        name: apiUser.name ?? "Sin nombre",
        email: apiUser.email ?? "sin-email",
        permissions: permissions ?? [],
      };

      // Guardar en localStorage y estado
      storage.setUser(loggedUser);
      setUser(loggedUser);

      showToastOnce(response.message || "Bienvenido 👋", "success");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Error inesperado al iniciar sesión";

      let severity: "error" | "warning" | "info" = "error";
      if (err.response?.status === 422) severity = "warning";
      if (err.response?.status === 500) severity = "info";

      showToastOnce(message, severity);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
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
