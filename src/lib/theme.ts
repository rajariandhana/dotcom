/**
 * Light / dark theme. The theme lives on <html> as both `class` and
 * `data-theme`: HeroUI switches its components on either, and globals.css
 * switches the site's own colours on `data-theme`.
 *
 * The site starts light for everyone, whatever their system setting. A
 * visitor's own choice from the toggle is remembered in localStorage.
 */
export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Apply a theme to <html> right now (no saving). */
export function setDocumentTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.dataset.theme = theme;
}

/** Apply a theme and remember it for the next visit. */
export function chooseTheme(theme: Theme) {
  setDocumentTheme(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode, site data off): the theme still applies for this page.
  }
}

export function getDocumentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/**
 * Runs in <head> before the first paint, so a visitor who chose dark never sees
 * the light, prerendered page flash first. Kept as a plain string: it can't import
 * anything, so it repeats setDocumentTheme in miniature.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="dark")t="light";var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(t);r.dataset.theme=t}catch(e){}})()`;
