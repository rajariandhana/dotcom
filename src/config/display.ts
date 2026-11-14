/**
 * Site-wide display options. Change the defaults here; in development the debugbar
 * panel (bottom-right) lets you flip them live without editing this file.
 *
 * Every value is written to <html> as a data attribute (`data-font-set`,
 * `data-grid`, `data-tagline`) and styled in `src/app/globals.css`.
 */

/**
 * Plus Jakarta Sans ships three stylistic alternates. Each maps to an
 * OpenType stylistic set (the same SS01–SS03 the Figma specimen toggles).
 */
export const fontSets = {
  default: { label: "Default", feature: null },
  lancip: { label: "Lancip", feature: "ss01" },
  lurus: { label: "Lurus", feature: "ss02" },
  lingkar: { label: "Lingkar", feature: "ss03" },
} as const;

export type FontSet = keyof typeof fontSets;

/** Matches Figma's "Grid background" component set (Style=Lines / Style=Dots). */
export const gridStyles = {
  off: { label: "Off" },
  lines: { label: "Lines" },
  dots: { label: "Dots" },
} as const;

export type GridStyle = keyof typeof gridStyles;

/**
 * The sidebar tagline's own font set, independent of `fontSet`: one of the
 * sets above for every letter, or "random" for a random set per letter (see
 * MixedFontText).
 */
export const taglineStyles = {
  ...fontSets,
  random: { label: "Randomized" },
} as const;

export type TaglineStyle = keyof typeof taglineStyles;

export const display: { fontSet: FontSet; grid: GridStyle; tagline: TaglineStyle } = {
  fontSet: "default",
  grid: "off",
  tagline: "random",
};
