"use client";

import { useRef, type ReactNode } from "react";

/** Half a grid tile: the site's 90px tile split in four, so the trail feels finer. */
const TILE = 45;
const COLS = 24;
const ROWS = 14;

/**
 * A panel ruled with the site's grid lines where the pointer lights up the
 * tiles it passes over; each one fades back on its own, leaving a short red
 * trail. A tap lights the tiles around it, so it works on touch too.
 *
 * The tiles are a fixed 24 × 14 field clipped by the panel, lit with the Web
 * Animations API directly on the DOM, so moving the pointer never re-renders.
 * Off for people who prefer reduced motion.
 */
export function TileField({ children, className = "" }: { children: ReactNode; className?: string }) {
  const field = useRef<HTMLDivElement>(null);
  const lastTile = useRef(-1);

  const light = (index: number, strength = 1) => {
    const tile = field.current?.children[index] as HTMLElement | undefined;
    tile?.animate([{ opacity: strength }, { opacity: 0 }], { duration: 1100, easing: "cubic-bezier(.2,.7,.3,1)" });
  };

  const tileAt = (event: React.PointerEvent) => {
    const box = field.current?.getBoundingClientRect();
    if (!box) return null;
    const col = Math.floor((event.clientX - box.left) / TILE);
    const row = Math.floor((event.clientY - box.top) / TILE);
    if (col < 0 || row < 0 || col >= COLS || row >= ROWS) return null;
    return { col, row };
  };

  const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className={`relative isolate overflow-hidden border border-block bg-surface ${className}`}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || reducedMotion()) return;
        const at = tileAt(event);
        if (!at) return;
        const index = at.row * COLS + at.col;
        if (index === lastTile.current) return;
        lastTile.current = index;
        light(index);
      }}
      onPointerDown={(event) => {
        if (reducedMotion()) return;
        const at = tileAt(event);
        if (!at) return;
        // A small burst: the tapped tile and a fainter ring around it.
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            const col = at.col + dc;
            const row = at.row + dr;
            if (col < 0 || row < 0 || col >= COLS || row >= ROWS) continue;
            light(row * COLS + col, dr === 0 && dc === 0 ? 1 : 0.45);
          }
      }}
    >
      {/* Grid lines, half the page grid's size. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
          backgroundSize: `${TILE}px ${TILE}px`,
        }}
      />
      {/* The tiles that light up. */}
      <div
        ref={field}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 -z-10 grid"
        style={{ gridTemplateColumns: `repeat(${COLS}, ${TILE}px)`, gridAutoRows: `${TILE}px` }}
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <div key={i} className="bg-accent/20 opacity-0" />
        ))}
      </div>
      {children}
    </div>
  );
}
