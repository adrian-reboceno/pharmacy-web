// src/auth/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string | string[];
  requiredPermissions?: string[];
  requireAll?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  roles,
  requiredPermissions = [],
  requireAll = false,
}) => {
  const { user } = useAuth();


  if (!user) return <Navigate to="/login" replace />;

  const userRoles = user.roles || [];
  const userPermissions = user.permissions || [];

  const allowedRoles = Array.isArray(roles) ? roles : roles ? [roles] : [];

  const hasRole =
    allowedRoles.length === 0 || allowedRoles.some((role) => userRoles.includes(role));

  const hasPermission =
    requiredPermissions.length === 0 ||
    (requireAll
      ? requiredPermissions.every((p) => userPermissions.includes(p))
      : requiredPermissions.some((p) => userPermissions.includes(p)));

  
  if (!hasRole || !hasPermission) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
