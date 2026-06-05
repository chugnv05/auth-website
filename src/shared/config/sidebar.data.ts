import { PATHS } from "@/app/router/paths";
import { Key, LayoutDashboard, OctagonMinus, User, UserKey } from "lucide-react";
import type { IconType } from "react-icons/lib";

export type SidebarItem = {
  label: string;
  to: string;
};

export type SidebarColumn = {
  icon: IconType;
  title: string;
  to: string;
  items?: SidebarItem[];
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
  },
  {
    icon: UserKey,
    title: "Role",
    to: PATHS.ROLE,
  },
  {
    icon: Key,
    title: "Permisison",
    to: PATHS.PERMISSION,
  },
  {
    icon: OctagonMinus,
    title: "Temp",
    to: PATHS.PERMISSION,
    items: [
      { label: "Temp 1", to: "" },
      { label: "Temp 2", to: "" },
      { label: "Temp 3", to: "" },
      { label: "Temp 4", to: "" },
    ],
  },
];
