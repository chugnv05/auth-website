import { PATHS } from "@/app/router/paths";
import { Bolt, Info } from "lucide-react";
import type { IconType } from "react-icons/lib";

export type profileDropdownItem = {
  icon: IconType;
  label: string;
  to: string;
};

export const profileDropdownData: profileDropdownItem[] = [
  {
    icon: Info,
    label: "About us",
    to: PATHS.ABOUT_US,
  },
  {
    icon: Bolt,
    label: "Setting",
    to: PATHS.DASHBOARD,
  },
];
