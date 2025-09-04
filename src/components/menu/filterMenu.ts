// src/components/menu/filterMenu.ts
import { type MenuItem } from "./menuConfig.types";

export function filterMenu(menu: MenuItem[], userPermissions: string[]): MenuItem[] {
  return menu
    .map((item) => {
      let children: MenuItem[] | undefined;

      if (item.children) {
        children = filterMenu(item.children, userPermissions);
      }

      const hasPermission =
        !item.permission || userPermissions.includes(item.permission);

      if (!hasPermission && (!children || children.length === 0)) return null;

      return { ...item, children };
    })
    .filter(Boolean) as MenuItem[];
}
