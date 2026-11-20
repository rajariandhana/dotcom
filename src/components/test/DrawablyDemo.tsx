"use client";

import "drawably/style.css";

import {
  DrawablyAlert,
  DrawablyBadge,
  DrawablyButton,
  DrawablyCard,
  DrawablyCheckbox,
  DrawablyCircle,
  DrawablyDivider,
  DrawablyHighlight,
  DrawablyInput,
  DrawablyKbd,
  DrawablyList,
  DrawablyRadio,
  DrawablySelect,
  DrawablyToggle,
  DrawablyUnderline,
} from "drawably/react";
import { useState, type CSSProperties, type ReactNode } from "react";

import { buttonClass } from "./ExperimentHeader";

const inks = {
  pen: { label: "Pen blue", value: undefined },
  accent: { label: "Accent", value: "var(--accent)" },
  ink: { label: "Ink", value: "var(--foreground)" },
} as const;
type Ink = keyof typeof inks;

type ButtonState = "idle" | "loading" | "error" | "success";

/**
 * A sampler of drawably's React controls with knobs for its shared options.
 * The controls only read their options when they attach, so every change
 * remounts the sampler (via `key`) and they all re-sketch together.
 */
export function DrawablyDemo() {
  const [roughness, setRoughness] = useState(1);
  const [boil, setBoil] = useState(0.3);
  const [ink, setInk] = useState<Ink>("pen");
  const [round, setRound] = useState(0);
  const [saveState, setSaveState] = useState<ButtonState>("idle");

  const color = inks[ink].value;
  const opts = { roughness, boil };
  // Colours are CSS custom properties, so the ink can be set once on the wrapper.
  const style = color ? ({ "--drawably-stroke": color, "--drawably-fill": color } as CSSProperties) : undefined;

  const save = () => {
    setSaveState("loading");
    setTimeout(() => setSaveState(Math.random() < 0.5 ? "success" : "error"), 1200);
    setTimeout(() => setSaveState("idle"), 3000);
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3 border border-block bg-surface p-4 text-sm">
        <Slider label="Roughness" min={0} max={3} step={0.1} value={roughness} onChange={setRoughness} />
        <Slider label="Boil (px)" min={0} max={2} step={0.05} value={boil} onChange={setBoil} />
        <label className="flex flex-col gap-1">
          <span className="font-medium">Ink</span>
          <select
            className="border border-block bg-background px-2 py-1"
            value={ink}
            onChange={(e) => setInk(e.target.value as Ink)}
          >
            {Object.entries(inks).map(([id, { label }]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className={buttonClass} onClick={() => setRound((r) => r + 1)}>
          Re-sketch all
        </button>
      </div>

      {/* Paper-white panel: drawably's fills and labels assume a light page. */}
      <div
        key={`${round}-${roughness}-${boil}-${ink}`}
        style={style}
        className="grid gap-8 border border-block bg-white p-6 text-stone-900 sm:p-8 lg:grid-cols-2"
      >
        <Group title="Buttons">
          <div className="flex flex-wrap gap-3">
            <DrawablyButton {...opts}>Outline</DrawablyButton>
            <DrawablyButton {...opts} variant="solid">
              Solid
            </DrawablyButton>
            <DrawablyButton {...opts} variant="scribble">
              Scribble
            </DrawablyButton>
            <DrawablyButton {...opts} tone="danger">
              Delete
            </DrawablyButton>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <DrawablyButton {...opts} variant="solid" state={saveState} onClick={save} disabled={saveState !== "idle"}>
              {saveState === "idle" ? "Save" : saveState === "loading" ? "Saving…" : saveState === "success" ? "Saved" : "Failed"}
            </DrawablyButton>
            <span className="text-xs text-stone-500">Coin flip: succeeds half the time.</span>
          </div>
        </Group>

        <Group title="Inputs">
          <DrawablyInput {...opts} placeholder="Your name" aria-label="Your name" />
          <DrawablySelect {...opts} aria-label="Favourite pen" defaultValue="fineliner">
            <option value="fineliner">Fineliner</option>
            <option value="fountain">Fountain pen</option>
            <option value="ballpoint">Ballpoint</option>
          </DrawablySelect>
        </Group>

        <Group title="Choices">
          <label className="flex items-center gap-2">
            <DrawablyCheckbox {...opts} defaultChecked /> Remember me
          </label>
          <label className="flex items-center gap-2">
            <DrawablyToggle {...opts} /> Dark ink
          </label>
          <div className="flex gap-4">
            {["Tea", "Coffee"].map((drink, i) => (
              <label key={drink} className="flex items-center gap-2">
                <DrawablyRadio {...opts} name="drink" defaultChecked={i === 0} /> {drink}
              </label>
            ))}
          </div>
        </Group>

        <Group title="Text">
          <p className="leading-loose">
            <DrawablyUnderline {...opts}>Hand-drawn</DrawablyUnderline> UI, a{" "}
            <DrawablyHighlight {...opts}>fresh sketch</DrawablyHighlight> on{" "}
            <DrawablyCircle {...opts}>every mount</DrawablyCircle>.
          </p>
          <p className="flex flex-wrap items-center gap-2">
            <DrawablyBadge {...opts}>new</DrawablyBadge>
            <DrawablyBadge {...opts} variant="scribble">
              beta
            </DrawablyBadge>
            Press <DrawablyKbd {...opts}>⌘K</DrawablyKbd>
          </p>
        </Group>

        <Group title="Blocks" className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <DrawablyCard {...opts} className="p-4">
              <p className="font-bold">A sketched card</p>
              <DrawablyList {...opts} marker="check" className="mt-2">
                <li>Seeded randomness</li>
                <li>Real inputs underneath</li>
                <li>Zero dependencies</li>
              </DrawablyList>
            </DrawablyCard>
            <div className="flex flex-col gap-4">
              <DrawablyAlert {...opts} className="p-4">
                <span data-tag>tip</span> Hover a button to re-sketch it.
              </DrawablyAlert>
              <DrawablyDivider {...opts} />
            </div>
          </div>
        </Group>
      </div>
    </section>
  );
}

function Group({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <h2 className="text-xs font-bold tracking-widest text-stone-500 uppercase">{title}</h2>
      {children}
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  ...range
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-medium">
        {label} <span className="font-normal text-muted tabular-nums">{value.toFixed(2)}</span>
      </span>
      <input type="range" {...range} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-40 accent-accent" />
    </label>
  );
}
