"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import { isActiveHref } from "@/config/navigation";

type MenuLinkProps = {
  href: string;
  label: string;
  className?: string;
  /** Called on click — the mobile drawer uses it to close itself. */
  onNavigate?: () => void;
  /**
   * Bold and marked as current while its page is open (default). Off for the
   * wordmark, so on `/` only the Home item is highlighted.
   */
  highlightActive?: boolean;
};

/**
 * A menu link that turns bold when hovered, when its page is open, or when any
 * page below it is open (`/projects` on `/projects/tomo`).
 *
 * An invisible bold copy of the label sits in the same grid cell, so the link
 * always reserves its bold width and nothing shifts when the weight changes.
 */
export function MenuLink(props: MenuLinkProps) {
  // With cacheComponents, usePathname suspends on routes whose params aren't
  // known at build time. The fallback renders the same link, just un-highlighted,
  // so the rest of the layout can still be prerendered.
  return (
    <Suspense fallback={<MenuLinkView {...props} pathname={null} />}>
      <MenuLinkWithPathname {...props} />
    </Suspense>
  );
}

function MenuLinkWithPathname(props: MenuLinkProps) {
  const pathname = usePathname();
  return <MenuLinkView {...props} pathname={pathname} />;
}

function MenuLinkView({
  href,
  label,
  className = "",
  onNavigate,
  highlightActive = true,
  pathname,
}: MenuLinkProps & { pathname: string | null }) {
  const active = highlightActive && isActiveHref(pathname, href);
  const ariaCurrent = !highlightActive ? undefined : pathname === href ? "page" : active ? "true" : undefined;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={ariaCurrent}
      data-active={active || undefined}
      className={`grid justify-items-start rounded-xs font-medium transition-[font-weight] duration-150 hover:font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus data-active:font-bold ${className}`}
    >
      <span aria-hidden className="invisible col-start-1 row-start-1 font-bold">
        {label}
      </span>
      <span className="col-start-1 row-start-1">{label}</span>
    </Link>
  );
}
