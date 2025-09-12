// src/modules/menu/NavbarBreadcrumbs.tsx

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import { NavigateNextRounded } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: '#ffffff', // Separador blanco
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface NavbarBreadcrumbsProps {
  breadcrumbs?: BreadcrumbItem[];
  activeBgColor?: string;      // Fondo del breadcrumb activo
  activeTextColor?: string;    // Texto del breadcrumb activo
  hoverBgColor?: string;       // Fondo al pasar el cursor
  shadowColor?: string;        // Color de la sombra
}

export default function NavbarBreadcrumbs({
  breadcrumbs,
  activeBgColor = 'rgba(255, 255, 255, 0.1)',
  activeTextColor = '#00BFFF',
  hoverBgColor = 'rgba(255, 255, 255, 0.15)',
  shadowColor = 'rgba(0, 191, 255, 0.3)',
}: NavbarBreadcrumbsProps) {
  const location = useLocation();

  // Genera breadcrumbs automáticos si no se pasan props
  const autoBreadcrumbs: BreadcrumbItem[] = location.pathname
    .split('/')
    .filter(Boolean)
    .map((part, index, arr) => ({
      label: part.charAt(0).toUpperCase() + part.slice(1),
      path: '/' + arr.slice(0, index + 1).join('/'),
    }));

  const items = breadcrumbs || autoBreadcrumbs;

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRounded fontSize="small" sx={{ color: '#ffffff' }} />}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        const styles = {
          display: 'flex',
          alignItems: 'center',
          padding: '6px 14px',
          borderRadius: '12px',
          fontWeight: isLast ? 600 : 400,
          color: isLast ? activeTextColor : '#ffffff',
          backgroundColor: isLast ? activeBgColor : 'transparent',
          textDecoration: 'none',
          cursor: item.path && !isLast ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          boxShadow: isLast ? `0 2px 6px ${shadowColor}` : 'none',
          '&:hover': {
            backgroundColor: hoverBgColor,
            boxShadow: `0 4px 12px ${shadowColor}`,
          },
        };

        return item.path && !isLast ? (
          <Typography
            key={index}
            component={RouterLink}
            to={item.path}
            variant="body1"
            sx={styles}
          >
            {item.label}
          </Typography>
        ) : (
          <Typography key={index} variant="body1" sx={styles}>
            {item.label}
          </Typography>
        );
      })}
    </StyledBreadcrumbs>
  );
}
