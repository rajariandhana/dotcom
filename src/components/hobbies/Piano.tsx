"use client";

import { useEffect, useRef, useState } from "react";

import { frequency, playPiano } from "./audio";

/**
 * One and a bit octaves, C4 to E5. `semi` is the distance from A4 (440 Hz);
 * `key` is the computer key that plays it, laid out like a piano on the
 * home row (white keys) and the row above (black keys).
 */
const WHITE = [
  { note: "C", semi: -9, key: "a" },
  { note: "D", semi: -7, key: "s" },
  { note: "E", semi: -5, key: "d" },
  { note: "F", semi: -4, key: "f" },
  { note: "G", semi: -2, key: "g" },
  { note: "A", semi: 0, key: "h" },
  { note: "B", semi: 2, key: "j" },
  { note: "C", semi: 3, key: "k" },
  { note: "D", semi: 5, key: "l" },
  { note: "E", semi: 7, key: ";" },
];
/** `after` is the white key (by index) each black key sits after. */
const BLACK = [
  { note: "C♯", semi: -8, key: "w", after: 0 },
  { note: "D♯", semi: -6, key: "e", after: 1 },
  { note: "F♯", semi: -3, key: "t", after: 3 },
  { note: "G♯", semi: -1, key: "y", after: 4 },
  { note: "A♯", semi: 1, key: "u", after: 5 },
  { note: "C♯", semi: 4, key: "o", after: 7 },
  { note: "D♯", semi: 6, key: "p", after: 8 },
];
const ALL = [...WHITE, ...BLACK];

/**
 * A playable little keyboard: click or tap a key, glide across keys while
 * holding the mouse down, or play it from your own keyboard (A S D F … for
 * white keys, W E T Y U O P for black ones).
 */
export function Piano() {
  const [down, setDown] = useState<Set<number>>(new Set());
  const [last, setLast] = useState<string | null>(null);
  const mouseHeld = useRef(false);

  const press = (semi: number, note: string) => {
    playPiano(frequency(semi));
    setLast(note);
    setDown((s) => new Set(s).add(semi));
  };
  const release = (semi: number) =>
    setDown((s) => {
      const next = new Set(s);
      next.delete(semi);
      return next;
    });

  useEffect(() => {
    const target = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return undefined;
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, [contenteditable]")) return undefined;
      return ALL.find((k) => k.key === event.key.toLowerCase());
    };
    const onDown = (event: KeyboardEvent) => {
      const k = target(event);
      if (!k || event.repeat) return;
      press(k.semi, k.note);
    };
    const onUp = (event: KeyboardEvent) => {
      const k = target(event);
      if (k) release(k.semi);
    };
    const stopHold = () => (mouseHeld.current = false);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("pointerup", stopHold);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("pointerup", stopHold);
    };
  }, []);

  const keyProps = (semi: number, note: string) => ({
    onPointerDown: (event: React.PointerEvent) => {
      event.preventDefault();
      mouseHeld.current = true;
      press(semi, note);
    },
    onPointerEnter: () => mouseHeld.current && press(semi, note),
    onPointerUp: () => release(semi),
    onPointerLeave: () => release(semi),
    "aria-pressed": down.has(semi),
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex h-40 touch-none select-none sm:h-48" role="group" aria-label="Piano keys">
        {WHITE.map((k, i) => (
          <button
            key={`w${i}`}
            type="button"
            aria-label={`${k.note} key`}
            {...keyProps(k.semi, k.note)}
            className={`relative flex flex-1 items-end justify-center border border-block pb-2 text-[0.65rem] font-semibold text-muted transition-colors duration-75 first:rounded-bl-sm last:rounded-br-sm focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-focus ${down.has(k.semi) ? "bg-accent/15 text-accent" : "bg-white dark:bg-stone-200"}`}
          >
            <span className="hidden [@media(hover:hover)]:inline">{k.key.toUpperCase()}</span>
          </button>
        ))}
        {BLACK.map((k) => (
          <button
            key={`b${k.semi}`}
            type="button"
            aria-label={`${k.note} key`}
            {...keyProps(k.semi, k.note)}
            // Black keys are 60% of a white key wide, centred on the line after their white key.
            style={{
              width: `${60 / WHITE.length}%`,
              left: `${((k.after + 1) / WHITE.length) * 100 - 30 / WHITE.length}%`,
            }}
            className={`absolute top-0 z-10 flex h-[60%] items-end justify-center rounded-b-sm pb-1.5 text-[0.6rem] font-semibold text-stone-400 transition-colors duration-75 focus-visible:outline-2 focus-visible:outline-focus ${down.has(k.semi) ? "bg-accent" : "bg-stone-900 hover:bg-stone-800"}`}
          >
            <span className="hidden [@media(hover:hover)]:inline">{k.key.toUpperCase()}</span>
          </button>
        ))}
      </div>
      <p className="text-sm text-muted" aria-live="polite">
        {last ? (
          <>
            Playing <span className="font-semibold text-accent">{last}</span>
          </>
        ) : (
          <>
            <span className="[@media(hover:none)]:hidden">Click the keys, or play with your keyboard.</span>
            <span className="[@media(hover:hover)]:hidden">Tap the keys.</span>
          </>
        )}
      </p>
    </div>
  );
}
