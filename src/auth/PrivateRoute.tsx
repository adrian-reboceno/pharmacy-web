// src/auth/PrivateRoute.tsx
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useAuth } from "@/auth/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function PrivateRoute({ children, redirectTo = "/login" }: PrivateRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    // Mostrar spinner mientras se carga el user desde localStorage
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    // Si no hay sesión, redirige al login
    return <Navigate to={redirectTo} replace />;
  }

  // Usuario autenticado → renderiza la ruta protegida
  return <>{children}</>;
}
