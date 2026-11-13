"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A page title that sticks to the top while scrolling — under the 64px bar on
 * mobile, at the very top on desktop.
 *
 * It has no background at rest, so the grid shows through. Only once it is
 * stuck does a strip fade in behind it (the menu's translucent blur and 1px
 * divider), reaching from the content gutter to the right edge of the screen,
 * so content scrolling underneath doesn't show through the text. The page's
 * <main> clips horizontal overflow, which keeps that strip from adding a
 * sideways scroll.
 */
export function StickyHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Cheap enough to run on every scroll event; React skips re-renders when the value is unchanged.
    const check = () => {
      // Stuck when it sits at its sticky offset (64px on mobile, 0 on desktop).
      const offset = parseFloat(getComputedStyle(el).top) || 0;
      setStuck(el.getBoundingClientRect().top <= offset + 0.5 && window.scrollY > 0);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <h1
      ref={ref}
      data-stuck={stuck || undefined}
      className={[
        "sticky top-16 z-20 -mt-4 py-4 lg:top-0",
        // background strip, hidden until stuck
        "before:pointer-events-none before:absolute before:inset-y-0 before:-left-6 before:-right-[100vw] before:-z-10 sm:before:-left-tile",
        "before:border-b before:border-menu-separator before:bg-menu before:backdrop-blur-lg before:backdrop-saturate-150",
        "before:opacity-0 before:transition-opacity before:duration-200 data-stuck:before:opacity-100 motion-reduce:before:transition-none",
        className,
      ].join(" ")}
    >
      {children}
    </h1>
  );
}
