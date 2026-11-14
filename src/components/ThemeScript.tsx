"use client";

import { themeInitScript } from "@/lib/theme";

/**
 * Applies the saved (or system) theme in <head>, before the first paint.
 *
 * The server HTML carries it as a normal script, so the browser runs it while
 * parsing. On the client React would warn about rendering a <script> it can't
 * run, so there it's marked as plain-text data instead (the same approach as
 * next-themes); the mismatched `type` is expected, hence suppressHydrationWarning.
 * Next's <Script strategy="beforeInteractive"> doesn't fit: for inline code it
 * queues the script to run with Next's own bootstrap, after the page has painted.
 */
export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? undefined : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  );
}
