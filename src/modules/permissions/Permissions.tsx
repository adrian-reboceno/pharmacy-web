// src/modules/permissions/Permissions.tsx
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import AppNavbar from '@/modules/menu/components/AppNavbar';
import Header from '@/modules/menu/components/Header';
import PermissionsList from './components/PermissionsList';
import SideMenu from '@/modules/menu/components/SideMenu';
import AppTheme from '@/modules/shared-theme/AppTheme';

import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from '@/modules/utils/theme/customizations';

import DialogsProvider from '@/modules/utils/hooks/useDialogs/DialogsProvider';
import  NotificationsProvider  from '@/modules/utils/hooks/useNotifications/NotificationsProvider';

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

export default function Permissions(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <DialogsProvider>
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: 'auto',
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header />
              <NotificationsProvider>
              <DialogsProvider>
                <PermissionsList />
              </DialogsProvider>
            </NotificationsProvider>
            </Stack>
          </Box>
        </Box>
      </DialogsProvider>
    </AppTheme>
  );
}
