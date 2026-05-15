import { PATHS } from "@/app/router/paths";
import { BadgeInfo, BadgeQuestionMark, House } from "lucide-react";
import type { IconType } from "react-icons/lib";

type IconComponent = React.ComponentType<{ className?: string }> | IconType;

export type NavItem = {
  icon?: IconComponent; // optional
  label: string;
  to: string;
};

export const navItems: NavItem[] = [
  { label: "Home", to: PATHS.HOME },
  { label: "About Us", to: PATHS.ABOUT_US },
  { label: "FQAs", to: PATHS.FQAS },
];

export const navMobileItems: NavItem[] = [
  { icon: House, label: "Home", to: PATHS.HOME },
  { icon: BadgeInfo, label: "About Us", to: PATHS.ABOUT_US },
  { icon: BadgeQuestionMark, label: "FQAs", to: PATHS.FQAS },
];
