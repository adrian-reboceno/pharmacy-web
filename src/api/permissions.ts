// src/api/permissions.ts
import api from "./axios";

export interface Permission {
  id: number;
  name: string;
  guard: string;
}

export interface PermissionPayload {
  name: string;
  guard: string;
}

// ✅ Obtener todos los permisos (paginados o no)
export async function getPermissions(params?: Record<string, any>) {
  const response = await api.get("/permissions", { params });
  return response.data;
}

// ✅ Obtener un permiso por ID
export async function getPermission(id: number) {
  const response = await api.get(`/permissions/${id}`);
  return response.data;
}

// ✅ Crear permiso
export async function createPermission(payload: PermissionPayload) {
  const response = await api.post("/permissions", payload);
  return response.data;
}

// ✅ Actualizar permiso
export async function updatePermission(id: number, payload: PermissionPayload) {
  const response = await api.put(`/permissions/${id}`, payload);
  return response.data;
}

// ✅ Eliminar permiso
export async function deletePermission(id: number) {
  const response = await api.delete(`/permissions/${id}`);
  return response.data;
}
