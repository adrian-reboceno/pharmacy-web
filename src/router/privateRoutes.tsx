// Rutas privadas (requieren usuario autenticado)
import { Route } from "react-router-dom";
import PrivateRoute from "@/auth/PrivateRoute";
import DashboardPage from "@/modules/dashboard/Dashboard";

export const privateRoutes = [
  <Route
    key="dashboard"
    path="/dashboard"
    element={
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    }
  />,
  <Route
    key="home"
    path="/"
    element={
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    }
  />,
];
