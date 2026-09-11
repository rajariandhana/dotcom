import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * fighter.gd keeps three small enums instead of one tangled boolean soup:
 * LifeState, PositionState and CombatState. This is the combat one, with the
 * real numbers from the export vars.
 */

const ATTACK_MS = 800;
const COOLDOWN_MS = 2000;
const DAMAGE = 10;
const MAX_HEALTH = 100;

const STATES = [
  { id: "READY", note: "Hitbox off. Indicator at full opacity." },
  { id: "ATTACK", note: "Hitbox monitoring on for the length of the swing." },
  { id: "COOLDOWN", note: "Hitbox off again. Indicator drops to half." },
];

export default function CombatLoop() {
  const [state, setState] = useState("READY");
  const [health, setHealth] = useState(MAX_HEALTH);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const attack = () => {
    if (state !== "READY") return;
    setState("ATTACK");
    timers.current.push(
      setTimeout(() => {
        setState("COOLDOWN");
        setHealth((current) => (current - DAMAGE <= 0 ? MAX_HEALTH : current - DAMAGE));
      }, ATTACK_MS),
      setTimeout(() => setState("READY"), ATTACK_MS + COOLDOWN_MS),
    );
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {STATES.map((entry, index) => (
          <div key={entry.id} className="flex items-center gap-3 sm:gap-4">
            <motion.div
              animate={{
                borderColor:
                  state === entry.id ? "rgba(230,200,119,0.95)" : "rgba(230,200,119,0.2)",
                color: state === entry.id ? "#E6C877" : "rgba(245,233,214,0.4)",
                scale: state === entry.id ? 1.06 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="rounded-full border px-4 py-2 text-xs font-bold tracking-widest sm:text-sm"
            >
              {entry.id}
            </motion.div>
            {index < STATES.length - 1 && (
              <span className="text-alengka-gold/30">&rarr;</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="flex w-full max-w-sm items-center gap-3">
          <span className="text-xs text-alengka-cream/40">HP</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full border border-alengka-gold/25 bg-alengka-night">
            <motion.div
              className="h-full bg-alengka-blood"
              animate={{ width: `${(health / MAX_HEALTH) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <span className="w-10 text-right text-xs tabular-nums text-alengka-cream/60">
            {health}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <motion.img
            src="/projects/ashes-of-alengka/attack-indicator.png"
            alt="Attack indicator"
            className="h-12 w-12"
            animate={{ opacity: state === "READY" ? 1 : 0.5 }}
            transition={{ duration: 0.25 }}
          />
          <button
            type="button"
            onClick={attack}
            disabled={state !== "READY"}
            className="rounded-full border border-alengka-gold/40 px-6 py-2 text-sm font-semibold text-alengka-gold transition-all duration-300 hover:border-alengka-gold hover:bg-alengka-gold/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Attack
          </button>
        </div>

        <motion.p
          key={state}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-alengka-cream/60"
        >
          {STATES.find((entry) => entry.id === state).note}
        </motion.p>
      </div>
    </div>
  );
}
