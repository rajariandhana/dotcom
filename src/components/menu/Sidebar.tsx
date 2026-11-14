import { site } from "@/config/site";

import { Identity } from "./Identity";
import { MenuLink } from "./MenuLink";
import { NavGroups } from "./NavGroups";
import { UtilityLinks } from "./UtilityLinks";

/**
 * Desktop menu (≥ lg / 1024px). Sticky and full viewport height; it scrolls on
 * its own if a short window can't fit it, instead of cutting off the bottom links.
 */
export function Sidebar() {
  return (
    <aside className="sticky top-0 z-10 hidden h-dvh w-sidebar shrink-0 overflow-y-auto overscroll-none border-e border-menu-separator bg-menu text-accent backdrop-blur-lg backdrop-saturate-150 lg:block">
      <div className="flex min-h-full flex-col justify-between gap-16 p-16">
        <div className="flex flex-col gap-16">
          <MenuLink href="/" label={site.domain} className="leading-none" highlightActive={false} />
          <Identity variant="sidebar" />
          <nav aria-label="Main">
            <NavGroups variant="sidebar" />
          </nav>
        </div>
        <UtilityLinks variant="sidebar" />
      </div>
    </aside>
  );
}
