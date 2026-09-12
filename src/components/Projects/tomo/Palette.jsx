import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { copyText } from "./copyText.js";

const PALETTE = [
  { hex: "#FFFFFF", swatch: "bg-white border-tomo-line" },
  { hex: "#2563EB", swatch: "bg-tomo-blue border-tomo-blue" },
  { hex: "#F97316", swatch: "bg-tomo-orange border-tomo-orange" },
];

export default function Palette() {
  const [copied, setCopied] = useState(null);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (hex) => {
    if (!(await copyText(hex))) return;
    setCopied(hex);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div className="mt-1 flex w-1/2 lg:w-2/3 gap-3">
      {PALETTE.map(({ hex, swatch }) => {
        const is_copied = copied === hex;
        return (
          <button
            key={hex}
            onClick={() => copy(hex)}
            aria-label={`Copy ${hex}`}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <motion.span
              whileTap={{ scale: 0.94 }}
              animate={{ scale: is_copied ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className={`aspect-square w-full rounded-xl border ${swatch}`}
            />
            <span
              className={`tomo-mono select-all text-[10px] font-semibold transition-colors duration-200 ${
                is_copied ? "text-tomo-blue" : "text-tomo-slate"
              }`}
            >
              {is_copied ? "Copied" : hex}
            </span>
          </button>
        );
      })}
    </div>
  );
}
