import { PATHS } from "@/app/router/paths";
import { Key, LayoutDashboard, OctagonMinus, User, UserKey } from "lucide-react";
import type { IconType } from "react-icons/lib";
import { RoleType } from "../constants/role";

export type SidebarItem = {
  label: string;
  to: string;
};

export type SidebarColumn = {
  icon: IconType;
  title: string;
  to: string;
  items?: SidebarItem[];
  allowedRoles?: string[];
};

export const sidebarData: SidebarColumn[] = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    to: PATHS.DASHBOARD,
  },
  {
    icon: User,
    title: "User",
    to: PATHS.USER,
    allowedRoles: [RoleType.ADMIN, RoleType.MANAGER],
  },
  {
    icon: UserKey,
    title: "Role",
    to: PATHS.ROLE,
    allowedRoles: [RoleType.ADMIN],
  },
  {
    icon: Key,
    title: "Permisison",
    to: PATHS.PERMISSION,
    allowedRoles: [RoleType.ADMIN],
  },
  {
    icon: OctagonMinus,
    title: "Temp",
    to: PATHS.DASHBOARD,
    items: [
      { label: "Temp 1", to: "" },
      { label: "Temp 2", to: "" },
      { label: "Temp 3", to: "" },
      { label: "Temp 4", to: "" },
    ],
  },
];
