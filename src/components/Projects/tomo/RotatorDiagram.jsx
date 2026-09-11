import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuRotateCw, LuZap } from "react-icons/lu";

const PROJECTS = ["BOT_1_TOMO", "BOT_2_TOMO", "BOT_3_TOMO", "BOT_4_TOMO"];

const MODELS = [
  "3.8-flash",
  "3.7-flash",
  "3.6-flash",
  "3.5-flash",
  "3.5-flash-lite",
  "3.1-flash-lite",
];

const SLOTS = PROJECTS.length * MODELS.length;
const STEP_MS = 420;

const slot_of = (p, m) => p * MODELS.length + m;

export default function RotatorDiagram() {
  const [counter, setCounter] = useState(0);
  const [broken, setBroken] = useState(() => new Set([0, 1]));
  const [trying, setTrying] = useState(null);
  const [failing, setFailing] = useState([]);
  const [settled, setSettled] = useState(null);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState([]);

  const cancelled = useRef(false);
  const timers = useRef([]);

  useEffect(() => {
    // Reset on mount as well as tear down on unmount: StrictMode's
    // mount/unmount/remount would otherwise leave the flag stuck at true.
    cancelled.current = false;
    const pending = timers.current;
    return () => {
      cancelled.current = true;
      pending.forEach(clearTimeout);
    };
  }, []);

  const wait = (ms) =>
    new Promise((resolve) => {
      timers.current.push(setTimeout(resolve, ms));
    });

  // A model is "under high demand" when its index is in `broken` — the same
  // condition the backend treats as retriable (503 / 429 / RESOURCE_EXHAUSTED).
  const is_broken = (model_index) => broken.has(model_index);

  const send = async () => {
    if (running) return;
    setRunning(true);
    setFailing([]);
    setSettled(null);
    setLog([]);

    let slot = counter % SLOTS;
    const burned = [];

    for (let attempt = 0; attempt < SLOTS; attempt++) {
      if (cancelled.current) return;

      const project = Math.floor(slot / MODELS.length);
      const model = slot % MODELS.length;

      setTrying(slot);
      await wait(STEP_MS);
      if (cancelled.current) return;

      if (is_broken(model)) {
        burned.push(slot);
        setFailing([...burned]);
        setTrying(null);
        setLog((prev) => [
          ...prev,
          {
            id: `${slot}-${attempt}`,
            ok: false,
            text: `503 · ${PROJECTS[project]} / gemini-${MODELS[model]} — trying next`,
          },
        ]);
        slot = (slot + 1) % SLOTS;
        await wait(140);
        continue;
      }

      setTrying(null);
      setSettled(slot);
      setLog((prev) => [
        ...prev,
        {
          id: `${slot}-ok`,
          ok: true,
          text: `200 · ${PROJECTS[project]} / gemini-${MODELS[model]} — replied`,
        },
      ]);
      setCounter(counter + burned.length + 1);
      setRunning(false);
      return;
    }

    setTrying(null);
    setLog((prev) => [
      ...prev,
      { id: "dead", ok: false, text: "all 24 slots exhausted — served the bilingual unavailable message" },
    ]);
    setCounter(counter + SLOTS);
    setRunning(false);
  };

  const toggle_model = (model_index) => {
    if (running) return;
    setBroken((prev) => {
      const next = new Set(prev);
      next.has(model_index) ? next.delete(model_index) : next.add(model_index);
      return next;
    });
    setFailing([]);
    setSettled(null);
    setLog([]);
  };

  const reset = () => {
    if (running) return;
    setCounter(0);
    setBroken(new Set([0, 1]));
    setFailing([]);
    setSettled(null);
    setTrying(null);
    setLog([]);
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl border border-tomo-line bg-white p-5 sm:p-7">
      {/* controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-tomo-slate">
            Round-robin rotator
          </span>
          <span className="text-sm text-tomo-slate">
            Tap any model row to put it under high demand.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            disabled={running}
            className="flex items-center gap-1.5 rounded-full border border-tomo-line px-3 py-2 text-xs font-semibold text-tomo-slate transition-all hover:border-tomo-blue hover:text-tomo-blue disabled:opacity-40"
          >
            <LuRotateCw /> Reset
          </button>
          <motion.button
            onClick={send}
            disabled={running}
            whileHover={{ scale: running ? 1 : 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 rounded-full bg-tomo-blue px-4 py-2 text-xs font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.8)] transition-colors hover:bg-tomo-blue-deep disabled:opacity-60"
          >
            <LuZap />
            {running ? "Routing…" : "Send a request"}
          </motion.button>
        </div>
      </div>

      {/* counter readout */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-tomo-paper px-4 py-3 tomo-mono text-xs text-tomo-slate">
        <span>
          counter.Add(1) →{" "}
          <span className="font-bold text-tomo-ink">{counter}</span>
        </span>
        <span>
          next slot →{" "}
          <span className="font-bold text-tomo-blue">{counter % SLOTS}</span>
        </span>
        <span>
          slots →{" "}
          <span className="font-bold text-tomo-ink">
            {PROJECTS.length} × {MODELS.length} = {SLOTS}
          </span>
        </span>
      </div>

      {/* grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {PROJECTS.map((project, p) => (
          <div
            key={project}
            className="flex flex-col gap-2 rounded-2xl border border-tomo-line bg-tomo-paper/60 p-2.5"
          >
            <span className="tomo-mono px-1 text-[10px] font-bold tracking-tight text-tomo-slate">
              {project}
            </span>

            <div className="flex flex-col gap-1.5">
              {MODELS.map((model, m) => {
                const slot = slot_of(p, m);
                const is_trying = trying === slot;
                const is_failed = failing.includes(slot);
                const is_ok = settled === slot;
                const down = is_broken(m);

                return (
                  <button
                    key={model}
                    onClick={() => toggle_model(m)}
                    className={`relative flex items-center justify-between gap-1 overflow-hidden rounded-lg border px-2 py-1.5 text-left transition-colors duration-200 ${
                      is_ok
                        ? "border-tomo-blue bg-tomo-blue text-white"
                        : is_failed
                          ? "border-tomo-orange bg-tomo-orange-50 text-tomo-orange"
                          : down
                            ? "border-dashed border-tomo-orange/50 bg-white text-tomo-orange/70"
                            : "border-tomo-line bg-white text-tomo-slate hover:border-tomo-blue-100"
                    }`}
                  >
                    {is_trying && (
                      <motion.span
                        layoutId="tomo-probe"
                        className="absolute inset-0 z-0 rounded-lg bg-tomo-blue-100"
                        transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      />
                    )}

                    <span className="relative z-10 tomo-mono truncate text-[10px] font-semibold">
                      {model}
                    </span>

                    <span className="relative z-10 shrink-0 text-[9px] font-bold tabular-nums opacity-70">
                      {is_ok ? "200" : is_failed ? "503" : down ? "hot" : slot}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* log */}
      <div className="flex min-h-20 flex-col gap-1.5">
        <AnimatePresence initial={false}>
          {log.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className={`tomo-mono flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] ${
                entry.ok
                  ? "bg-tomo-blue-50 text-tomo-blue-deep"
                  : "bg-tomo-orange-50 text-tomo-orange"
              }`}
            >
              <span className="size-1.5 shrink-0 rounded-full bg-current" />
              <span className="truncate">{entry.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {log.length === 0 && (
          <span className="tomo-mono px-1 text-[11px] text-tomo-slate/60">
            [gemini] waiting for a request…
          </span>
        )}
      </div>
    </div>
  );
}
