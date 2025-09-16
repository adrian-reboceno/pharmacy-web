// src/router/adminRoutes.tsx
import { Route } from "react-router-dom";
import PrivateRoute from "@/auth/PrivateRoute";
import Permissions from "@/modules/permissions/Permissions";

export const adminRoutes = [
<Route
  path="/permissions"
  element={
    <PrivateRoute roles={["admin"]} requiredPermissions={["manager-permissions"]}>
      <Permissions />
    </PrivateRoute>
  }
/>
];