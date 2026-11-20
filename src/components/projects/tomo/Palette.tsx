"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { copyText } from "./shared";

const PALETTE = [
  { hex: "#FFFFFF", swatch: "bg-white border-tomo-line" },
  { hex: "#2563EB", swatch: "bg-tomo-blue border-tomo-blue" },
  { hex: "#F97316", swatch: "bg-tomo-orange border-tomo-orange" },
];

/** Tomo's three colours; tap a swatch to copy its hex. */
export function Palette() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (hex: string) => {
    if (!(await copyText(hex))) return;
    setCopied(hex);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div className="mt-1 flex w-1/2 gap-3 @5xl:w-2/3">
      {PALETTE.map(({ hex, swatch }) => {
        const isCopied = copied === hex;
        return (
          <button
            key={hex}
            type="button"
            onClick={() => copy(hex)}
            aria-label={`Copy ${hex}`}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <motion.span
              whileTap={{ scale: 0.94 }}
              animate={{ scale: isCopied ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className={`aspect-square w-full rounded-xl border ${swatch}`}
            />
            <span
              className={`font-mono text-[10px] font-semibold transition-colors duration-200 select-all ${
                isCopied ? "text-tomo-blue" : "text-tomo-slate"
              }`}
            >
              {isCopied ? "Copied" : hex}
            </span>
          </button>
        );
      })}
    </div>
  );
}
