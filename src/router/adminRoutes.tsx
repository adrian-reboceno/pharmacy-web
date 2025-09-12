// src/router/adminRoutes.tsx
import { Route } from "react-router-dom";
import PrivateRoute from "@/auth/PrivateRoute";
import PermissionsPage from "@/modules/permissions/PermissionsPage";

export const adminRoutes = [
<Route
  path="/permissions"
  element={
    <PrivateRoute roles={["admin"]} requiredPermissions={["manager-permissions"]}>
      <PermissionsPage />
    </PrivateRoute>
  }
/>
];