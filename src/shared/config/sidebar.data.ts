import { PATHS } from "@/app/router/paths";
import { Key, User, UserKey } from "lucide-react";
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
    icon: User,
    title: "User",
    to: PATHS.USER,
    items: [
      { label: "Temp 1", to: "" },
      { label: "Temp 2", to: "" },
      { label: "Temp 3", to: "" },
      { label: "Temp 4", to: "" },
    ],
  },
  {
    icon: UserKey,
    title: "Role",
    to: PATHS.ROLE,
    items: [
      { label: "Temp 1", to: "" },
      { label: "Temp 2", to: "" },
      { label: "Temp 3", to: "" },
      { label: "Temp 4", to: "" },
    ],
  },
  {
    icon: Key,
    title: "Permisison",
    to: PATHS.PERMISSION,
    items: [
      { label: "Temp 1", to: "" },
      { label: "Temp 2", to: "" },
      { label: "Temp 3", to: "" },
      { label: "Temp 4", to: "" },
    ],
  },
];
