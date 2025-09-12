// src/modules/menu/Header.tsx
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import { useAuth } from '@/auth/AuthContext'//'../../auth/AuthContext'; // Contexto de usuario con permisos
import { useLocation } from 'react-router-dom';

export default function Header() {
  const { user } = useAuth(); // obtener usuario y permisos
  const location = useLocation(); // obtener ruta actual
  const userPermissions: string[] = user?.permissions || [];

  // Breadcrumbs base
  const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard' }];

  // Construir breadcrumbs dinámicamente según ruta y permisos
  if (location.pathname.startsWith('/permissions')) {
    breadcrumbs.push({ label: 'Permissions', path: '/permissions' });

    // Ejemplo: si está en /permissions/create y tiene permiso
    if (
      location.pathname.includes('/create') &&
      userPermissions.includes('permission.create')
    ) {
      breadcrumbs.push({ label: 'Create', path: '/permissions/create' });
    }
  }

  /*if (location.pathname.startsWith('/users')) {
    breadcrumbs.push({ label: 'Users', path: '/users' });

    if (
      location.pathname.includes('/create') &&
      userPermissions.includes('user.create')
    ) {
      breadcrumbs.push({ label: 'Create', path: '/users/create' });
    }
  }*/

  // Puedes agregar más rutas y permisos aquí según tu proyecto

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      {/* NavbarBreadcrumbs dinámico */}
      <NavbarBreadcrumbs
        breadcrumbs={breadcrumbs}
        activeBgColor="rgba(255,255,255,0.1)"   // fondo activo
        activeTextColor="#00BFFF"               // texto activo
        hoverBgColor="rgba(255,255,255,0.2)"    // hover
        shadowColor="rgba(0,191,255,0.3)"       // sombra/elevación
      />

      <Stack direction="row" sx={{ gap: 1 }}>
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
