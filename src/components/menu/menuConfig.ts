// src/components/menu/menuConfig.ts
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScienceIcon from "@mui/icons-material/Science";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HealingIcon from "@mui/icons-material/Healing";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

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
    text: "Manager User",
    icon: PeopleRoundedIcon,
    permission: "managerusers-view",
    children: [
      { 
        text: "Users", 
        path: "/users",
        icon: PeopleAltIcon,
        permission: "user-view" 
      },
      { 
        text: "Roles", 
        path: "/categorias", 
        icon: SecurityIcon,
        permission: "roles-view" 
      },
      { 
        text: "Permissions", 
        icon: LockIcon,
        path: "/proveedores", 
        permission: "permissions-view" 
      },
    ],
  },
  {
    text: "Manager Catalog",
    icon: Inventory2Icon,
    permission: "managercatalog-view",
    children: [
      { 
        text: "Category", 
        path: "/category",
        icon: CategoryIcon,
        permission: "category-view" 
      },
      { 
        text: "Status", 
        path: "/status", 
        icon: CheckCircleIcon,
        permission: "status-view" 
      },
      { 
        text: "Denominations", 
        icon: LockIcon,
        path: "/denominations", 
        permission: "denominations-view" 
      },
      { 
        text: "laboratories", 
        icon: ScienceIcon,
        path: "/laboratories", 
        permission: "laboratories-view" 
      },
      { 
        text: "saletypes", 
        icon: ShoppingCartIcon,
        path: "/denominations", 
        permission: "denominations-view" 
      },
      { 
        text: "pharmaceuticalforms", 
        icon: MedicationIcon,
        path: "/pharmaceuticalforms", 
        permission: "pharmaceuticalforms-view" 
      },
      { 
        text: "symptoms", 
        icon: HealingIcon,
        path: "/symptoms", 
        permission: "symptoms-view" 
      },
      { 
        text: "suppliers", 
        icon: LocalShippingIcon,
        path: "/suppliers", 
        permission: "suppliers-view" 
      },
      
    ],
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
