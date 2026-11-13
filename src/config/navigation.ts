import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import { site } from "./site";

/**
 * Single source of truth for site navigation. The desktop sidebar and the
 * mobile drawer both render from these lists, so add or rename pages here.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  id: string;
  items: readonly NavLink[];
};

/** Main navigation, in two groups separated by a gap. */
export const navGroups = [
  {
    id: "primary",
    items: [
      { label: "Projects", href: "/projects" },
      { label: "Experience", href: "/experience" },
      { label: "Tech Tree", href: "/tech-tree" },
    ],
  },
  {
    id: "explore",
    items: [
      { label: "Writing", href: "/writing" },
      { label: "Hobbies", href: "/hobbies" },
      { label: "Website History", href: "/history" },
      { label: "FAQ", href: "/faq" },
    ],
  },
] as const satisfies readonly NavGroup[];

/**
 * Mobile menu only: shown at the top of the first group, before Projects.
 * The desktop sidebar has no Home item — the wordmark links home there.
 * Highlighted only on `/` itself (see isActiveHref).
 */
export const mobileHomeLink = { label: "Home", href: "/" } as const satisfies NavLink;

/** Pinned to the bottom of the menu. */
export const utilityLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
] as const satisfies readonly NavLink[];

export type SocialLink = NavLink & { icon: IconType };

export const socialLinks: readonly SocialLink[] = [
  { label: "GitHub", href: "https://github.com/rajariandhana", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/rajariandhana", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://instagram.com/rajariandhana", icon: FaInstagram },
  { label: "Email", href: `mailto:${site.email}`, icon: FaEnvelope },
];

/**
 * A link is active on its own page and on any page below it,
 * so `/projects` stays highlighted on `/projects/tomo`.
 */
export function isActiveHref(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
