// Rutas públicas (no requieren autenticación)
import { Route } from "react-router-dom";
//import SignInPage from "@/modules/auth/SignInSide";
import SignInPage from '@/features/auth/page/SignInSide';

export const publicRoutes = [
  <Route key="login" path="/login" element={<SignInPage />} />,
];
