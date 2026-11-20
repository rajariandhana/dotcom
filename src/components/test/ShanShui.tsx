"use client";

import { useState } from "react";

import { buttonClass, inputClass } from "./ExperimentHeader";

/** Lingdong Huang's original page, vendored (MIT) so it runs from our own origin. */
const SRC = "/vendor/shan-shui-inf/index.html";

/**
 * The painting runs in an iframe: it's a self-contained page with its own
 * scroll controls and globals. The seed is passed as `?seed=`, which the page
 * reads on load, so changing it reloads the frame with a new landscape.
 */
export function ShanShui() {
  const [seed, setSeed] = useState("");
  const [draft, setDraft] = useState("");
  const src = seed ? `${SRC}?seed=${encodeURIComponent(seed)}` : SRC;

  const paint = (next: string) => {
    setDraft(next);
    setSeed(next);
  };

  return (
    <section className="flex flex-col gap-4">
      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          paint(draft.trim());
        }}
      >
        <input
          className={`${inputClass} w-48`}
          placeholder="Seed (any text)"
          aria-label="Seed"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className={buttonClass}>
          Paint
        </button>
        <button type="button" className={buttonClass} onClick={() => paint(String(Date.now()))}>
          Random
        </button>
        <a href={src} target="_blank" rel="noreferrer" className={buttonClass}>
          Open full screen ↗
        </a>
      </form>

      <iframe
        key={src}
        src={src}
        title="Shan Shui landscape"
        className="h-[70vh] min-h-96 w-full border border-block bg-[#f5f0e4]"
      />
      <p className="text-sm text-muted">
        Use the arrows at the edges (or the menu in the top-left) to scroll along the scroll painting.
      </p>
    </section>
  );
}
