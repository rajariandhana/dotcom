"use client";

import { useState } from "react";

/**
 * A pot on the stove with steam rising. Stir it and the spoon goes round,
 * the steam puffs up harder and a few bubbles pop.
 */
export function CookingPot() {
  const [stirs, setStirs] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setStirs((n) => n + 1)}
        aria-label="Stir the pot"
        className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
      >
        <svg viewBox="0 0 200 170" className="w-56" aria-hidden fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Steam: three wisps rising and fading; faster for a moment after each stir. */}
          <g key={`steam-${stirs}`} className={stirs ? "steam steam-burst" : "steam"} stroke="var(--muted)" strokeWidth="3" opacity=".7">
            <path className="wisp" d="M72 62c-8-10 8-16 0-26s8-16 0-26" />
            <path className="wisp [animation-delay:.6s]" d="M100 58c-8-10 8-16 0-26s8-16 0-26" />
            <path className="wisp [animation-delay:1.2s]" d="M128 62c-8-10 8-16 0-26s8-16 0-26" />
          </g>
          {/* Spoon, stirring when you click. */}
          <g key={`spoon-${stirs}`} className={stirs ? "spoon-stir" : ""} style={{ transformOrigin: "112px 86px" }}>
            <path d="M118 84 146 30" stroke="var(--bark)" strokeWidth="6" />
            <ellipse cx="148" cy="26" rx="7" ry="5" fill="var(--bark)" transform="rotate(-62 148 26)" />
          </g>
          {/* Pot */}
          <path d="M40 84h120l-10 62a10 10 0 0 1-10 8H60a10 10 0 0 1-10-8Z" fill="var(--accent)" stroke="var(--foreground)" strokeWidth="3" />
          <path d="M34 80h132" stroke="var(--foreground)" strokeWidth="6" />
          <path d="M40 98H24m136 0h16" stroke="var(--foreground)" strokeWidth="6" />
          <path d="M58 104h84" stroke="#fff" strokeOpacity=".35" strokeWidth="4" />
          {/* Bubbles that pop on a stir. */}
          {stirs > 0 && (
            <g key={`bubbles-${stirs}`} fill="var(--surface)" stroke="var(--foreground)" strokeWidth="2">
              <circle className="bubble" cx="80" cy="78" r="4" />
              <circle className="bubble [animation-delay:.15s]" cx="104" cy="77" r="3" />
              <circle className="bubble [animation-delay:.3s]" cx="124" cy="78" r="3.5" />
            </g>
          )}
          {/* Flame */}
          <path className="flame" d="M86 166c-4-8 4-10 2-16 6 4 8 10 6 16m10 0c-3-9 6-12 4-19 7 5 9 12 6 19m10 0c-4-8 4-10 2-16 6 4 8 10 6 16" stroke="var(--accent)" strokeWidth="3" />
        </svg>
      </button>
      <p className="text-sm text-muted" aria-live="polite">
        {stirs === 0 ? "Click the pot to stir." : `Stirred ${stirs} time${stirs === 1 ? "" : "s"}. Smells good.`}
      </p>
    </div>
  );
}
