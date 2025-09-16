// src/modules/permissions/components/PermissionsList.tsx
import * as React from 'react';
import { Box, Stack, Button, IconButton, Tooltip, TextField, Alert, useTheme, alpha } from '@mui/material';
import { Add as AddIcon, Refresh as RefreshIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';

import { getPermissions, deletePermission, type Permission } from '@/api/permissions';
import { useDialogs } from '@/modules/utils/hooks/useDialogs/useDialogs';
import useNotifications from '@/modules/utils/hooks/useNotifications/useNotifications';

const INITIAL_PAGE_SIZE = 10;

export default function PermissionsList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dialogs = useDialogs();
  const notifications = useNotifications();

  const [rows, setRows] = React.useState<Permission[]>([]);
  const [rowCount, setRowCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const [pagination, setPagination] = React.useState({ page: 0, pageSize: INITIAL_PAGE_SIZE });
  const [sortModel, setSortModel] = React.useState<{ field: string; sort: 'asc' | 'desc' }[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [guardFilter, setGuardFilter] = React.useState('');

  // Debounced filters
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [debouncedGuard, setDebouncedGuard] = React.useState('');
  const debouncedUpdate = React.useMemo(() => debounce((s: string, g: string) => { setDebouncedSearch(s); setDebouncedGuard(g); }, 500), []);

  React.useEffect(() => () => { debouncedUpdate.cancel(); }, [debouncedUpdate]);

  // Load data
  const loadData = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const filters: any[] = [];
      if (debouncedSearch) filters.push({ field: 'name', operator: 'contains', value: debouncedSearch });
      if (debouncedGuard) filters.push({ field: 'guard', operator: 'equals', value: debouncedGuard });

      const params: Record<string, any> = {
        page: pagination.page + 1,
        per_page: pagination.pageSize,
      };
      if (filters.length) params.filters = filters;

      if (sortModel.length) {
        params.sort = sortModel[0].field;
        params.order = sortModel[0].sort;
      }

      const response = await getPermissions(params);
      setRows(response.data || []);
      setRowCount(response.meta?.total || 0);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [pagination, sortModel, debouncedSearch, debouncedGuard]);

  React.useEffect(() => { loadData(); }, [loadData]);

  // Handlers
  const handleRefresh = React.useCallback(() => loadData(), [loadData]);
  const handleCreate = React.useCallback(() => navigate('/permissions/create'), [navigate]);
  const handleView = React.useCallback((row: Permission) => () => navigate(`/permissions/${row.id}`), [navigate]);
  const handleEdit = React.useCallback((row: Permission) => () => navigate(`/permissions/${row.id}/edit`), [navigate]);
  const handleDelete = React.useCallback((row: Permission) => async () => {
    const confirmed = await dialogs.confirm(`Are you sure you want to delete "${row.name}"?`, { title: 'Delete Permission', okText: 'Delete', cancelText: 'Cancel', severity: 'error' });
    if (!confirmed) return;
    setLoading(true);
    try {
      await deletePermission(row.id);
      notifications.show('Permission deleted successfully.', { severity: 'success' });
      loadData();
    } catch (err) {
      notifications.show(`Failed to delete: ${(err as Error).message}`, { severity: 'error' });
      setLoading(false);
    }
  }, [dialogs, notifications, loadData]);

  // Columns
  const columns = React.useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'guard', headerName: 'Guard', width: 120 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: ({ row }) => [
        <GridActionsCellItem key="view" icon={<VisibilityIcon />} label="View" onClick={handleView(row)} />,
        <GridActionsCellItem key="edit" icon={<EditIcon />} label="Edit" onClick={handleEdit(row)} />,
        <GridActionsCellItem key="delete" icon={<DeleteIcon />} label="Delete" onClick={handleDelete(row)} />,
      ],
    },
  ], [handleView, handleEdit, handleDelete]);

  const toolbarBg = theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.2) : alpha(theme.palette.primary.light, 0.1);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ p: 1, borderRadius: 2, backgroundColor: toolbarBg, boxShadow: theme.shadows[2], transition: '0.3s' }}>
        <TextField
          size="small"
          placeholder="Search name..."
          value={searchText}
          onChange={(e) => { setSearchText(e.target.value); debouncedUpdate(e.target.value, guardFilter); }}
          sx={{ width: 200 }}
        />
        <TextField
          size="small"
          placeholder="Filter guard..."
          value={guardFilter}
          onChange={(e) => { setGuardFilter(e.target.value); debouncedUpdate(searchText, e.target.value); }}
          sx={{ width: 150 }}
        />
        <Tooltip title="Reload data">
          <IconButton onClick={handleRefresh}><RefreshIcon /></IconButton>
        </Tooltip>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>Create</Button>
      </Stack>

      <Box sx={{ height: 600, width: '100%' }}>
        {error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : (
          <DataGrid
            rows={rows}
            rowCount={rowCount}
            columns={columns}
            pagination
            paginationMode="server"
            sortingMode="server"
            pageSizeOptions={[5, 10, 20, 50]}
            paginationModel={pagination}
            onPaginationModelChange={setPagination}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            loading={loading}
            disableRowSelectionOnClick
            sx={{
            '& .MuiDataGrid-row': {
              transition: 'all 0.3s',
              opacity: loading ? 0.5 : 1,
              transform: loading ? 'translateY(5px)' : 'translateY(0)',
            },
            // Quitar contorno azul de celdas y filas
            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:focus, & .MuiDataGrid-row:focus-within, & .MuiDataGrid-row.Mui-selected': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
          />
        )}
      </Box>
    </Stack>
  );
}
