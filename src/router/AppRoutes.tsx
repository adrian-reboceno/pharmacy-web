import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";
import { adminRoutes } from "./adminRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      {publicRoutes}

      {/* Rutas privadas */}
      {privateRoutes}

      {/* Rutas admin */}
      {adminRoutes}

      {/* No autorizado */}
      <Route path="/unauthorized" element={<h1>No tienes acceso 🚫</h1>} />

      {/* Catch-all 404 */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
