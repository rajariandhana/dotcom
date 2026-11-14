"use client";

import { useRef, useState } from "react";

import { frequency, playString } from "./audio";

/** Standard re-entrant tuning, top string to bottom: G4 C4 E4 A4 (semitones from A4). */
const STRINGS = [
  { name: "G", semi: -2 },
  { name: "C", semi: -9 },
  { name: "E", semi: -5 },
  { name: "A", semi: 0 },
];

/** First chords everyone learns; frets per string in G C E A order. */
const CHORDS = [
  { name: "C", frets: [0, 0, 0, 3] },
  { name: "Am", frets: [2, 0, 0, 0] },
  { name: "F", frets: [2, 0, 1, 0] },
  { name: "G", frets: [0, 2, 3, 2] },
];

/**
 * A playable ukulele: pluck one string by clicking it, drag across the
 * strings to strum, or pick a chord and strum it with the button. Strings
 * shake while they ring.
 */
export function Ukulele() {
  const [chord, setChord] = useState(0);
  const [ringing, setRinging] = useState<number[]>([0, 0, 0, 0]);
  const held = useRef(false);

  const pluck = (index: number) => {
    playString(frequency(STRINGS[index].semi + CHORDS[chord].frets[index]));
    // A changing number restarts the string's shake animation each pluck.
    setRinging((r) => r.map((v, i) => (i === index ? v + 1 : v)));
  };

  const strum = (chordIndex = chord) => {
    STRINGS.forEach((string, i) => {
      setTimeout(() => {
        playString(frequency(string.semi + CHORDS[chordIndex].frets[i]));
        setRinging((r) => r.map((v, j) => (j === i ? v + 1 : v)));
      }, i * 28);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        role="group"
        aria-label="Ukulele strings"
        className="flex touch-none flex-col justify-between gap-0 border border-block bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(25%-2px),var(--block-border)_calc(25%-2px),var(--block-border)_25%)] py-3 select-none"
        onPointerDown={() => (held.current = true)}
        onPointerUp={() => (held.current = false)}
        onPointerLeave={() => (held.current = false)}
      >
        {STRINGS.map((string, i) => (
          <button
            key={string.name}
            type="button"
            aria-label={`Pluck the ${string.name} string`}
            onPointerDown={(event) => {
              event.preventDefault();
              pluck(i);
            }}
            onPointerEnter={() => held.current && pluck(i)}
            className="group relative flex h-9 items-center px-3 focus-visible:outline-2 focus-visible:outline-focus"
          >
            <span className="w-5 shrink-0 text-xs font-bold text-muted">{string.name}</span>
            <span
              key={ringing[i]}
              className={`h-[2px] flex-1 bg-bark group-hover:bg-accent ${ringing[i] ? "string-ring" : ""}`}
              style={{ height: `${1.5 + (i === 1 ? 1 : i === 2 ? 0.5 : 0)}px` }}
            />
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Chords">
          {CHORDS.map((c, i) => (
            <button
              key={c.name}
              type="button"
              aria-pressed={i === chord}
              onClick={() => {
                setChord(i);
                strum(i);
              }}
              className={`min-w-11 flex-1 border px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-focus ${i === chord ? "border-accent bg-accent text-accent-foreground" : "border-block bg-surface hover:border-accent hover:text-accent"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => strum()}
          className="border border-block bg-surface px-3 py-1.5 text-sm font-semibold hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-focus"
        >
          Strum {CHORDS[chord].name} ↓
        </button>
      </div>
    </div>
  );
}
