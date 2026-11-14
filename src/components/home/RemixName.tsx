"use client";

import { useEffect, useRef } from "react";

import { fontSets } from "@/config/display";

// "normal" for the default glyphs, then each Plus Jakarta Sans stylistic set (ss01–ss03).
const features = Object.values(fontSets).map(({ feature }) => (feature ? `"${feature}"` : "normal"));

/**
 * A word whose letters can be remixed: hovering (or tapping) a letter flips it
 * to the next Plus Jakarta Sans alternate with a small pop. The letters start
 * on a random mix once the page has loaded.
 *
 * The visible letters are decoration; screen readers get `label` instead.
 * Letters without an alternate in a set just stay the same, which keeps the
 * word readable while it changes.
 */
export function RemixName({ text, label, className = "" }: { text: string; label: string; className?: string }) {
  const word = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    for (const letter of word.current?.children ?? []) {
      const set = Math.floor(Math.random() * features.length);
      (letter as HTMLElement).dataset.set = String(set);
      (letter as HTMLElement).style.fontFeatureSettings = features[set];
    }
  }, []);

  const remix = (letter: HTMLElement) => {
    const set = (Number(letter.dataset.set ?? 0) + 1) % features.length;
    letter.dataset.set = String(set);
    letter.style.fontFeatureSettings = features[set];
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      letter.animate(
        [{ transform: "translateY(0) scale(1)" }, { transform: "translateY(-6%) scale(1.12)" }, { transform: "translateY(0) scale(1)" }],
        { duration: 260, easing: "ease-out" },
      );
    }
  };

  return (
    <span className={className}>
      <span className="sr-only">{label}</span>
      <span ref={word} aria-hidden="true">
        {Array.from(text, (char, i) => (
          <span
            key={i}
            className="inline-block cursor-default transition-colors duration-150 hover:text-accent"
            onPointerEnter={(event) => remix(event.currentTarget)}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
