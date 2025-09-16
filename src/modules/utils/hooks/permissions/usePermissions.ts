// src/modules/utils/hooks/permissions/usePermissions.ts
import { useState, useCallback } from "react";
import { getPermissions, deletePermission } from "@/api/permissions";
import type { Permission } from "@/api/permissions";

interface UsePermissionsParams {
  page?: number;
  perPage?: number;
  name?: string;
  guard?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export function usePermissions(initialParams: UsePermissionsParams = {}) {
  const [rows, setRows] = useState<Permission[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async (params?: UsePermissionsParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPermissions({ ...initialParams, ...params });
      setRows(response.data || []);
      setRowCount(response.meta?.total || 0);
    } catch (err) {
      setError(err as Error);
      setRows([]);
      setRowCount(0);
    }
    setLoading(false);
  }, [initialParams]);

  const remove = useCallback(async (id: number) => {
    await deletePermission(id);
    await fetch();
  }, [fetch]);

  return { rows, rowCount, loading, error, fetch, remove };
}
