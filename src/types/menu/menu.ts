// src/types/menu.ts
export interface MenuItem {
  label: string;
  icon: string; // nombre de ícono de lucide-react
  path: string;
  permissions: string[];
  children?: MenuItem[];
}
