"use client";

import Script from "next/script";
import { useCallback, useState } from "react";

import { buttonClass, inputClass } from "./ExperimentHeader";

/*
 * fishdraw.js (Lingdong Huang, MIT) is vendored as-is under /public. Loaded as
 * a classic script, its top-level functions become window globals; these are
 * the ones we call.
 */
type Polyline = [number, number][];
declare global {
  interface Window {
    main?: (seed?: string) => Polyline[];
    binomen?: () => string;
    draw_svg?: (p: Polyline[]) => string;
    draw_svg_anim?: (p: Polyline[], speed: number) => string;
  }
}

/** `id` changes on every draw, so "Replay" remounts the image even when the SVG is identical. */
type Fish = { id: number; name: string; svg: string; animated: boolean };

/** Draws one fish per seed (the seed is also its pseudo-Latin name, printed on the drawing). */
export function Fishdraw() {
  const [ready, setReady] = useState(false);
  const [fish, setFish] = useState<Fish | null>(null);
  const [draft, setDraft] = useState("");
  const [animate, setAnimate] = useState(true);

  const draw = useCallback((name: string, animated: boolean) => {
    const w = window;
    if (!w.main || !w.draw_svg || !w.draw_svg_anim) return;
    const polylines = w.main(name);
    // Same speed as the CLI's default (`--speed 1`).
    const svg = animated ? w.draw_svg_anim(polylines, 0.005) : w.draw_svg(polylines);
    setFish((prev) => ({ id: (prev?.id ?? 0) + 1, name, svg, animated }));
    setDraft(name);
  }, []);

  const spawn = useCallback(() => draw(window.binomen?.() ?? "Piscis", animate), [draw, animate]);

  // Each fish is shown as an <img> of its own SVG document, so the drawing
  // animation's SMIL clock starts when the image loads rather than with the page.
  const dataUrl = fish ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fish.svg)}` : null;

  return (
    <section className="flex flex-col gap-4">
      <Script
        src="/vendor/fishdraw/fishdraw.js"
        onReady={() => {
          setReady(true);
          draw(window.binomen?.() ?? "Piscis", true);
        }}
      />

      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (draft.trim()) draw(draft.trim(), animate);
        }}
      >
        <input
          className={`${inputClass} w-56`}
          placeholder="Name your fish"
          aria-label="Fish name (seed)"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className={buttonClass} disabled={!ready}>
          Draw
        </button>
        <button type="button" className={buttonClass} disabled={!ready} onClick={spawn}>
          New fish
        </button>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={animate} onChange={(e) => setAnimate(e.target.checked)} />
          Animate the pen
        </label>
      </form>

      <div className="border border-block bg-[floralwhite]">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- a generated data: URL, nothing to optimise
          <img key={fish!.id} src={dataUrl} alt={`A procedurally drawn fish named ${fish!.name}`} className="block h-auto w-full" />
        ) : (
          <div className="grid aspect-[520/320] place-items-center text-sm text-stone-500">Loading fishdraw…</div>
        )}
      </div>

      {fish && (
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={dataUrl!}
            download={`${fish.name.replace(/\W+/g, "-").toLowerCase()}.svg`}
            className={buttonClass}
          >
            Download SVG
          </a>
          {fish.animated && (
            <button type="button" className={buttonClass} onClick={() => draw(fish.name, true)}>
              Replay drawing
            </button>
          )}
        </div>
      )}
    </section>
  );
}
