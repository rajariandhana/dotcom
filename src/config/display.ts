/**
 * Site-wide display options. Change the defaults here; in development the debugbar
 * panel (bottom-right) lets you flip them live without editing this file.
 *
 * Both values are written to <html> as data attributes (`data-font-set`,
 * `data-grid`) and styled in `src/app/globals.css`.
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
  lines: { label: "Lines" },
  dots: { label: "Dots" },
  off: { label: "Off" },
} as const;

export type GridStyle = keyof typeof gridStyles;

export const display: { fontSet: FontSet; grid: GridStyle } = {
  fontSet: "default",
  grid: "lines",
};
