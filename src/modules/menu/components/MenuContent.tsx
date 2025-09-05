/*import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon /> },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon /> },
  { text: 'Clients', icon: <PeopleRoundedIcon /> },
  { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
*/
// src/components/menu/MenuContent.tsx


// src/components/menu/MenuContent.tsx
import * as React from "react";
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Stack,
  CircularProgress,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useAuth } from "@/auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { menuConfig } from "@/components/menu/menuConfig";
import { filterMenu } from "@/components/menu/filterMenu";
import type { MenuItem } from "@/components/menu/menuConfig.types";

export default function MenuContent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const handleClick = (text: string) => {
    setOpenItems((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ flexGrow: 1, p: 2 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (!user) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ flexGrow: 1, p: 2 }}>
        <span>No autenticado</span>
      </Stack>
    );
  }

  const filteredMenu = filterMenu(menuConfig, user.permissions || []);

  const renderMenu = (items: MenuItem[]) =>
    items.map((item) => {
      const isOpen = openItems[item.text] || false;
      const hasChildren = !!(item.children && item.children.length > 0);

      return (
        <React.Fragment key={item.text}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                if (hasChildren) {
                  handleClick(item.text);
                } else if (item.path) {
                  navigate(item.path);
                }
              }}
            >
              {item.icon && <ListItemIcon>{React.createElement(item.icon)}</ListItemIcon>}
              <ListItemText primary={item.text} />
              {hasChildren ? (isOpen ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
          </ListItem>

          {hasChildren && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {renderMenu(item.children!)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });

  return (
    <Stack sx={{ flexGrow: 1, p: 1 }}>
      <List dense>{renderMenu(filteredMenu)}</List>
    </Stack>
  );
}

