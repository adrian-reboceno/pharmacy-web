import { Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "@/modules/auth/SignInSide";
import DashboardPage from "@/modules/dashboard/Dashboard";
import { useAuth } from "@/auth/AuthContext";
import type { JSX } from "react";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
