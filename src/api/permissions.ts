// src/api/permissions.ts
import api from './axios';

export interface Permission {
  id: number;
  name: string;
  guard: string;
}

export interface PermissionPayload {
  name: string;
  guard_name: string;
}

export interface GetPermissionsParams {
  page?: number;
  per_page?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  filters?: Array<{ field: string; operator: string; value: string }>;
}

// ✅ Obtener permisos (paginado, filtros y sorting)
export async function getPermissions(params: GetPermissionsParams = {}) {
  const query: Record<string, any> = {
    page: params.page ?? 1,
    per_page: params.per_page ?? 15,
  };

  if (params.sort) query.sort = params.sort;
  if (params.order) query.order = params.order;

  // Encode filters para Laravel
  if (params.filters?.length) {
    params.filters.forEach((f, index) => {
      query[`filters[${index}][field]`] = f.field;
      query[`filters[${index}][operator]`] = f.operator;
      query[`filters[${index}][value]`] = f.value;
    });
  }

  const response = await api.get('/permissions', { params: query });
  return response.data;
}

// ✅ Obtener un permiso por ID
export async function getPermission(id: number) {
  const response = await api.get(`/permissions/${id}`);
  return response.data;
}

// ✅ Crear permiso
export async function createPermission(payload: PermissionPayload) {
  const response = await api.post('/permissions', payload);
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
