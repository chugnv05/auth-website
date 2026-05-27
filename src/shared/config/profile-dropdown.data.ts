import { PATHS } from "@/app/router/paths";
import { Bolt, FileUser, Info, RectangleEllipsis } from "lucide-react";
import type { IconType } from "react-icons/lib";

export type profileDropdownItem = {
  icon: IconType;
  label: string;
  to: string;
};

export const profileDropdownData: profileDropdownItem[] = [
  {
    icon: FileUser,
    label: "Me",
    to: PATHS.ME,
  },
  {
    icon: Info,
    label: "About us",
    to: PATHS.ABOUT_US,
  },
  {
    icon: RectangleEllipsis,
    label: "Change password",
    to: PATHS.CHANGE_PASSWORD,
  },
  {
    icon: Bolt,
    label: "Setting",
    to: PATHS.DASHBOARD,
  },
];
