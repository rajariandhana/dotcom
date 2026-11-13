import localFont from "next/font/local";

/**
 * Plus Jakarta Sans v2.071, variable weight 200–800, self-hosted from the
 * official repo (github.com/tokotype/PlusJakartaSans, OFL — see fonts/OFL.txt).
 *
 * Not loaded via next/font/google on purpose: Google Fonts strips the
 * stylistic sets, and these files keep all three —
 *   ss01 "Lancip Alternates", ss02 "Lurus Alternates", ss03 "Lingkar Alternates".
 * Which set is active is chosen in src/config/display.ts.
 */
export const plusJakartaSans = localFont({
  src: [
    { path: "./fonts/PlusJakartaSans-Variable.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/PlusJakartaSans-Italic-Variable.woff2", weight: "200 800", style: "italic" },
  ],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});
