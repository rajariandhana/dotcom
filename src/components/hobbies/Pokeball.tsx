"use client";

import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "hobbies-catches";

/** Catches are remembered in this browser only (localStorage); 0 until hydrated. */
function readCatches() {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
}
const listeners = new Set<() => void>();
const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
};

type Phase = "idle" | "wobbling" | "caught";

/**
 * Throw a Pokéball: it drops, wobbles three times, then clicks shut with a
 * little burst. Each catch is counted (in this browser only).
 */
export function Pokeball() {
  const catches = useSyncExternalStore(subscribe, readCatches, () => 0);
  const [phase, setPhase] = useState<Phase>("idle");

  const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  const throwBall = () => {
    if (phase === "wobbling") return;
    setPhase("wobbling");
    setTimeout(
      () => {
        setPhase("caught");
        try {
          localStorage.setItem(STORAGE_KEY, String(readCatches() + 1));
        } catch {}
        listeners.forEach((notify) => notify());
      },
      reducedMotion() ? 0 : 2300,
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={throwBall}
        aria-label="Throw the Pokéball"
        className="relative grid size-36 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
      >
        {phase === "caught" && (
          <span aria-hidden className="pointer-events-none absolute inset-0">
            {Array.from({ length: 8 }, (_, i) => (
              <span
                key={i}
                className="ball-spark absolute top-1/2 left-1/2 size-2 rounded-full bg-accent"
                style={{ "--angle": `${i * 45}deg` } as React.CSSProperties}
              />
            ))}
          </span>
        )}
        <svg
          viewBox="0 0 100 100"
          className={`size-28 drop-shadow-none ${phase === "wobbling" ? "ball-wobble" : phase === "idle" ? "transition-transform duration-200 hover:-translate-y-1 hover:-rotate-6" : ""}`}
          aria-hidden
        >
          <circle cx="50" cy="50" r="46" fill="var(--accent)" />
          <path d="M4 50a46 46 0 0 0 92 0Z" fill="#fafaf9" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="#1c1917" strokeWidth="5" />
          <path d="M4 50h92" stroke="#1c1917" strokeWidth="6" />
          <circle cx="50" cy="50" r="14" fill="#fafaf9" stroke="#1c1917" strokeWidth="5" />
          <circle cx="50" cy="50" r="6" fill={phase === "caught" ? "var(--accent)" : "#fafaf9"} stroke="#1c1917" strokeWidth="2" />
          <path d="M22 26a32 32 0 0 1 16-12" stroke="#fff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      </button>
      <p className="text-center text-sm" aria-live="polite">
        {phase === "wobbling" ? (
          <span className="text-muted">…wobble… wobble… wobble…</span>
        ) : phase === "caught" ? (
          <span className="font-bold text-accent">Gotcha!</span>
        ) : (
          <span className="text-muted">Tap the ball to throw it.</span>
        )}
        <span className="block text-xs text-muted tabular-nums">
          {catches > 0 ? `Caught ${catches} time${catches === 1 ? "" : "s"} in this browser` : " "}
        </span>
      </p>
    </div>
  );
}
