// Rutas públicas (no requieren autenticación)
import { Route } from "react-router-dom";
import SignInPage from "@/modules/auth/SignInSide";

export const publicRoutes = [
  <Route key="login" path="/login" element={<SignInPage />} />,
];
