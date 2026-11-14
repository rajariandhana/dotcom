"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { fontSets } from "@/config/display";

// "normal" for the default glyphs, then each Plus Jakarta Sans stylistic set (ss01–ss03).
const features = Object.values(fontSets).map(({ feature }) => (feature ? `"${feature}"` : "normal"));

/**
 * Text where every letter is drawn with a random Plus Jakarta Sans alternate,
 * re-rolled on each page load and each navigation — while `data-tagline` on
 * <html> is "random" (src/config/display.ts); otherwise every letter uses the
 * one set it names.
 *
 * The server renders plain default glyphs and the shuffle runs after mount, so
 * hydration matches and the page still prerenders. Letters without an alternate
 * in a set simply look the same. Screen readers get the whole text once instead
 * of letter by letter.
 */
export function MixedFontText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    for (const letter of ref.current?.children ?? []) {
      // A variable, not font-feature-settings itself, so globals.css can ignore it when the
      // tagline is set to a single font set (display.ts) instead of "random".
      (letter as HTMLElement).style.setProperty("--letter-font", features[Math.floor(Math.random() * features.length)]);
    }
  }, [pathname]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" data-mixed-font>
        {Array.from(text, (char, i) => (
          <span key={i}>{char}</span>
        ))}
      </span>
    </span>
  );
}
