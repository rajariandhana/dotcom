"use client";

import { useSyncExternalStore } from "react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { chooseTheme, getDocumentTheme, type Theme } from "@/lib/theme";

// <html> data-theme is the source of truth; re-read it whenever it changes.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

/**
 * The site's light / dark switch: Magic UI's Animated Theme Toggler (circle
 * reveal from the button) in controlled mode. The toggler flips the `dark`
 * class itself; chooseTheme then sets data-theme and the `light` class to match
 * and remembers the choice (src/lib/theme.ts).
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // Prerendered as light; corrected on the client right after hydration.
  const theme = useSyncExternalStore<Theme>(subscribe, getDocumentTheme, () => "light");
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={chooseTheme}
      aria-label={label}
      title={label}
      className={`grid size-10 place-items-center rounded-lg transition-transform duration-150 hover:-rotate-12 hover:scale-110 focus-visible:outline-2 focus-visible:outline-focus [&_svg]:size-5 ${className}`}
    />
  );
}
