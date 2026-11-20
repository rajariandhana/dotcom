"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LuPlay } from "react-icons/lu";

import { demoButton } from "./shared";

const REPLY = "ラルフさん、はじめまして！オーストラリアは自然がきれいで素敵な国ですね。";
const TOTAL_MS = 2600;
const FIRST_CHUNK_MS = 420;

function Dots() {
  return (
    <span className="inline-flex items-center gap-1 align-middle" aria-label="Waiting">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-tomo-blue/60"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

function Lane({
  title,
  endpoint,
  tone,
  elapsed,
  text,
  waiting,
  firstAt,
}: {
  title: string;
  endpoint: string;
  tone: "blue" | "slate";
  elapsed: number;
  text: string;
  waiting: boolean;
  firstAt: number | null;
}) {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-tomo-line bg-white p-4">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-bold text-tomo-ink">{title}</span>
        <span className="font-mono text-[10px] text-tomo-slate tabular-nums">{elapsed}ms</span>
      </div>
      <span className="font-mono text-[10px] text-tomo-slate/70">{endpoint}</span>

      <div className="flex min-h-24 items-start rounded-xl border border-tomo-blue-100 bg-tomo-blue-50/40 px-3 py-2.5">
        {waiting ? (
          <Dots />
        ) : (
          <p lang="ja" className="text-[13px] leading-relaxed text-tomo-ink">
            {text}
            {text.length > 0 && text.length < REPLY.length && (
              <motion.span
                className="ml-0.5 inline-block h-3.5 w-0.5 translate-y-0.5 bg-tomo-blue"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </p>
        )}
      </div>

      <span className={`text-[11px] font-semibold ${tone === "blue" ? "text-tomo-blue" : "text-tomo-slate"}`}>
        {firstAt === null ? "nothing on screen yet" : `first character at ${firstAt}ms`}
      </span>
    </div>
  );
}

/** Waiting for the whole reply vs streaming it, played side by side on the same 2.6s clock. */
export function StreamDemo() {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const raf = useRef(0);
  const start = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const play = () => {
    cancelAnimationFrame(raf.current);
    setPlaying(true);
    start.current = performance.now();
    const tick = (now: number) => {
      const dt = now - start.current;
      if (dt >= TOTAL_MS) {
        setElapsed(TOTAL_MS);
        setPlaying(false);
        return;
      }
      setElapsed(dt);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const done = elapsed >= TOTAL_MS;
  // Streaming: characters land as SSE `chunk` events arrive.
  const streamProgress = Math.max(0, Math.min(1, (elapsed - FIRST_CHUNK_MS) / (TOTAL_MS - FIRST_CHUNK_MS)));
  const streamText = REPLY.slice(0, Math.floor(streamProgress * REPLY.length));

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col items-start gap-3 @xl:flex-row @xl:items-center @xl:justify-between">
        <span className="text-xs font-bold tracking-[0.18em] text-tomo-slate uppercase">
          Same reply, same model, same 2.6 seconds
        </span>
        <motion.button
          type="button"
          onClick={play}
          disabled={playing}
          whileHover={{ scale: playing ? 1 : 1.04 }}
          whileTap={{ scale: 0.96 }}
          className={demoButton}
        >
          <LuPlay aria-hidden />
          {playing ? "Streaming…" : elapsed > 0 ? "Replay" : "Play both"}
        </motion.button>
      </div>

      <div className="flex flex-col gap-4 @xl:flex-row">
        <Lane
          title="Wait for the whole reply"
          endpoint="POST /api/send"
          tone="slate"
          elapsed={Math.round(elapsed)}
          waiting={!done && elapsed > 0}
          text={done ? REPLY : ""}
          firstAt={done ? TOTAL_MS : null}
        />
        <Lane
          title="Stream it as it lands"
          endpoint="POST /api/send/stream"
          tone="blue"
          elapsed={Math.round(elapsed)}
          waiting={elapsed > 0 && elapsed < FIRST_CHUNK_MS}
          text={elapsed === 0 ? "" : streamText}
          firstAt={elapsed >= FIRST_CHUNK_MS ? FIRST_CHUNK_MS : null}
        />
      </div>

      <p className="text-justify text-sm leading-relaxed text-tomo-slate">
        Both finish at the same moment. Only one of them gives you something to read while you wait, and that is the
        entire difference between the app feeling responsive and feeling broken.
      </p>
    </div>
  );
}
