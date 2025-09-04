// src/components/menu/menuConfig.ts
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { type MenuItem } from "./menuConfig.types";

export const menuConfig: MenuItem[] = [
  {
    text: "Inicio",
    path: "/dashboard",
    icon: HomeRoundedIcon,
  },
  {
    text: "Usuarios",
    path: "/clients",
    icon: PeopleRoundedIcon,
    permission: "usuarios-list",
  },
  {
    text: "Inventario",
    icon: Inventory2RoundedIcon,
    permission: "medicamento-list",
    children: [
      { text: "Medicamentos", path: "/medicamentos", permission: "medicamento-list" },
      { text: "Categorías", path: "/categorias", permission: "catalogos-list" },
      { text: "Proveedores", path: "/proveedores", permission: "proveedores-list" },
    ],
  },
];
