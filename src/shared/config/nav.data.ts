import { BadgeInfo, BadgeQuestionMark, House } from "lucide-react";
import { IconType } from "react-icons/lib";

type IconComponent = React.ComponentType<{ className?: string }> | IconType;

export type NavItem = {
  icon?: IconComponent; // optional
  label: string;
  to: string;
};

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "FQAs", to: "/fqas" },
];

export const navMobileItems: NavItem[] = [
  { icon: House, label: "Home", to: "/" },
  { icon: BadgeInfo, label: "About Us", to: "/about" },
  { icon: BadgeQuestionMark, label: "FQAs", to: "/fqas" },
];
