import type { ReactNode } from "react";

/*
 * Small pieces shared by the Tomo page's sections. Layout breakpoints are
 * container queries (@xl ≈ sm, @3xl = md, @5xl = lg) against the page wrapper,
 * because the page sits beside the site menu rather than across the viewport.
 */

/** White card with a hairline border; add `cardHover` for the lift on hover. */
export const card = "rounded-2xl border border-tomo-line bg-white p-5 transition-all duration-300 ease-out";
export const cardHover =
  "hover:-translate-y-1 hover:border-tomo-blue-100 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.35)]";

export const primaryButton =
  "flex items-center gap-2 rounded-full bg-tomo-blue px-5 py-2.5 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(37,99,235,0.85)] transition-all hover:-translate-y-0.5 hover:bg-tomo-blue-deep";
export const secondaryButton =
  "flex items-center gap-2 rounded-full border border-tomo-line bg-white px-5 py-2.5 text-sm font-bold text-tomo-ink transition-all hover:-translate-y-0.5 hover:border-tomo-blue hover:text-tomo-blue";
/** The small blue pill used for the demos' play buttons. */
export const demoButton =
  "flex items-center gap-1.5 rounded-full bg-tomo-blue px-4 py-2 text-xs font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.8)] transition-colors hover:bg-tomo-blue-deep disabled:opacity-60";

export const inlineLink =
  "inline-flex items-center gap-1 font-semibold text-tomo-blue hover:underline hover:underline-offset-2";

export function SectionTitle({ children, ja }: { children: ReactNode; ja?: string }) {
  return (
    <div className="flex w-full flex-col gap-1">
      {ja && (
        <span lang="ja" className="text-xs font-semibold tracking-[0.2em] text-tomo-blue">
          {ja}
        </span>
      )}
      <h2 className="text-2xl leading-tight font-black text-tomo-ink @5xl:text-4xl">{children}</h2>
    </div>
  );
}

/**
 * Copy text to the clipboard, returning whether it worked. The async Clipboard
 * API is denied in some embedded contexts (preview panes, in-app browsers), so
 * fall back to a hidden textarea. Only confirm "copied" when this is true.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fall through to the legacy path
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
