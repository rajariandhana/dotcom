"use client";

import { Button } from "@heroui/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/config/site";

import { Identity } from "./Identity";
import { MenuLink } from "./MenuLink";
import { NavGroups } from "./NavGroups";
import { UtilityLinks } from "./UtilityLinks";

/** Matches Tailwind's `lg` breakpoint, where the sidebar takes over. */
const DESKTOP_QUERY = "(min-width: 64rem)";

/**
 * Mobile menu (< lg): a collapsed top bar whose toggle reveals the menu
 * downward from *under* the bar, which stays in place — the behaviour of the
 * HeroUI v2 NavbarMenu on the previous site. HeroUI v3 removed Navbar, and its
 * Drawer is a modal that covers the bar, so this is a small disclosure panel.
 * Renders from the same nav config as the sidebar.
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setIsOpen(false), []);

  // While open: lock page scroll, make the page behind unreachable by Tab and
  // screen readers, and let Escape close the menu (returning focus to the toggle).
  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const content = document.getElementById("content");
    if (content) content.inert = true;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      html.style.overflow = previousOverflow;
      if (content) content.inert = false;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Close when the window grows past the breakpoint (the toggle disappears)
  // and on browser back/forward (menu links close it themselves on click).
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };
    query.addEventListener("change", onChange);
    window.addEventListener("popstate", close);
    return () => {
      query.removeEventListener("change", onChange);
      window.removeEventListener("popstate", close);
    };
  }, [close]);

  return (
    <header
      data-open={isOpen || undefined}
      className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-menu-separator px-6 text-accent data-open:border-transparent lg:hidden"
    >
      {/* Background on its own layer: a backdrop-filter on <header> itself would make it
          the containing block for the fixed dropdown below and squash it into the bar. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-menu backdrop-blur-lg backdrop-saturate-150" />

      <MenuLink href="/" label={site.domain} className="leading-none" onNavigate={close} highlightActive={false} />

      <div className="-me-2 flex items-center gap-1">
        <ThemeToggle />
        <Button
          ref={toggleRef}
          isIconOnly
          variant="ghost"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onPress={() => setIsOpen((open) => !open)}
          className="group text-accent"
        >
          <MenuToggleIcon />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            id={panelId}
            // Revealed top-down from the bar's bottom edge, like v2's height animation,
            // but via clip-path so nothing re-lays out while it moves.
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-none bg-menu text-accent backdrop-blur-xl backdrop-saturate-150"
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : 0.05 }}
              className="flex min-h-full flex-col justify-between gap-10 px-6 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
            >
              <div className="flex flex-col gap-8">
                <Identity variant="drawer" />
                <nav aria-label="Main">
                  <NavGroups variant="drawer" onNavigate={close} />
                </nav>
              </div>
              <UtilityLinks variant="drawer" onNavigate={close} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Two bars that rotate into an ✕ while the menu is open (like v2's NavbarMenuToggle). */
function MenuToggleIcon() {
  const bar =
    "absolute left-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none";
  return (
    <span aria-hidden className="relative block h-3.5 w-5.5">
      <span
        className={`${bar} top-0.5 group-aria-expanded:translate-y-[5px] group-aria-expanded:rotate-45`}
      />
      <span
        className={`${bar} bottom-0.5 group-aria-expanded:-translate-y-[5px] group-aria-expanded:-rotate-45`}
      />
    </span>
  );
}
