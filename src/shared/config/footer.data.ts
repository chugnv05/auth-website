import { FileUser, Mail, MapPinHouse, Phone } from "lucide-react";
import React from "react";
import { FaFacebook, FaGithub, FaTelegramPlane, FaTiktok, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons/lib";

type IconComponent = React.ComponentType<{ className?: string }> | IconType;

export type FooterItem = {
  label: string;
  to: string;
  icon?: IconComponent; // optional
};

export type FooterColumn = {
  title: string;
  items: FooterItem[];
};

export type SocialItem = {
  icon: IconType;
  to: string;
};

export const footerData: FooterColumn[] = [
  {
    title: "News",
    items: [
      { label: "Version 1.1", to: "/" },
      { label: "Version 1.2", to: "/" },
      { label: "Version 1.3", to: "/" },
    ],
  },
  {
    title: "Blog",
    items: [
      { label: "Tech", to: "/" },
      { label: "Life", to: "/" },
      { label: "Tips", to: "/" },
    ],
  },
  {
    title: "Contact Me",
    items: [
      { icon: Mail, label: "chuggnv05@gmail.com", to: "/" },
      { icon: Phone, label: "0369223405", to: "/" },
      { icon: MapPinHouse, label: "Me Linh - Ha Noi - Viet Nam", to: "/" },
      { icon: FileUser, label: "CV", to: "/" },
    ],
  },
];

export const socialLinks: SocialItem[] = [
  { icon: FaGithub, to: "https://github.com/chugnv05/auth-website" },
  { icon: FaFacebook, to: "/" },
  { icon: FaYoutube, to: "/" },
  { icon: FaTelegramPlane, to: "/" },
  { icon: FaTiktok, to: "/" },
];
