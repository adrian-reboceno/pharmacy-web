// src/components/menu/menuConfig.types.ts
export interface MenuItem {
  text: string;
  path?: string;
  icon?: React.ElementType;
  permission?: string;
  children?: MenuItem[];
}
