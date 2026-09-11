import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * One controller, two players. The left half drives Anoman, the right half
 * drives Dasamuka, and the analog stick is doing the same job as the rod a
 * dalang holds: tilt it and the puppet leans.
 */

const SIDES = {
  left: {
    label: "Player 1 · Anoman",
    sprite: "/projects/ashes-of-alengka/anoman-body.png",
    keys: "Left stick to lean · D-pad to swing",
    keyboard: "WASD · C",
    color: "#E6C877",
  },
  right: {
    label: "Player 2 · Dasamuka",
    sprite: "/projects/ashes-of-alengka/dasamuka-body.png",
    keys: "Right stick to lean · ABXY to swing",
    keyboard: "IJKL · N",
    color: "#D4574E",
  },
};

export default function SharedController() {
  const [side, setSide] = useState("left");
  const active = SIDES[side];

  const half = (key) => (side === key ? 1 : 0.28);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="relative w-full max-w-lg">
        <svg viewBox="0 0 400 240" className="w-full" role="img" aria-label="One gamepad split between two players">
          {/* body */}
          <path
            d="M92 62h216c30 0 52 26 58 62l14 76c5 28-22 46-44 30l-52-38H116l-52 38c-22 16-49-2-44-30l14-76c6-36 28-62 58-62z"
            fill="#17100A"
            stroke="#E6C877"
            strokeOpacity="0.28"
            strokeWidth="2"
          />

          {/* the split */}
          <line
            x1="200"
            y1="44"
            x2="200"
            y2="230"
            stroke="#E6C877"
            strokeOpacity="0.35"
            strokeDasharray="5 7"
            strokeWidth="1.5"
          />

          {/* left half */}
          <g
            onMouseEnter={() => setSide("left")}
            onClick={() => setSide("left")}
            style={{ cursor: "pointer", opacity: half("left"), transition: "opacity 0.35s" }}
          >
            <circle cx="132" cy="108" r="27" fill="none" stroke="#E6C877" strokeWidth="2.5" />
            <motion.circle
              cx="132"
              cy="108"
              r="13"
              fill="#E6C877"
              animate={side === "left" ? { x: [0, 16, -16, 0] } : { x: 0 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <rect x="119" y="160" width="26" height="9" rx="3" fill="#E6C877" />
            <rect x="127.5" y="151.5" width="9" height="26" rx="3" fill="#E6C877" />
          </g>

          {/* right half */}
          <g
            onMouseEnter={() => setSide("right")}
            onClick={() => setSide("right")}
            style={{ cursor: "pointer", opacity: half("right"), transition: "opacity 0.35s" }}
          >
            <circle cx="268" cy="108" r="27" fill="none" stroke="#D4574E" strokeWidth="2.5" />
            <motion.circle
              cx="268"
              cy="108"
              r="13"
              fill="#D4574E"
              animate={side === "right" ? { x: [0, -16, 16, 0] } : { x: 0 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx="268" cy="150" r="7" fill="#D4574E" />
            <circle cx="268" cy="178" r="7" fill="#D4574E" />
            <circle cx="254" cy="164" r="7" fill="#D4574E" />
            <circle cx="282" cy="164" r="7" fill="#D4574E" />
          </g>
        </svg>
      </div>

      <div className="flex w-full max-w-lg items-center justify-center gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={side}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-5"
          >
            <motion.img
              src={active.sprite}
              alt={active.label}
              className="h-28 w-auto object-contain sm:h-36"
              animate={{ rotate: [-7, 7, -7] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "50% 100%" }}
            />
            <div className="flex flex-col gap-1">
              <span className="font-bold" style={{ color: active.color }}>
                {active.label}
              </span>
              <span className="text-sm text-alengka-cream/70">{active.keys}</span>
              <span className="text-xs text-alengka-cream/40">
                No controller? {active.keyboard}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
