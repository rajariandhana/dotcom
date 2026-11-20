"use client";

import { motion } from "motion/react";

import { PhoneFrame } from "./PhoneFrame";

/**
 * The two outcomes side by side. The "vibe coded" phone is live markup rather
 * than a screenshot, because it never existed — it is every default the first
 * prompt was written to forbid: gradients, emoji, glass cards, gamification,
 * and copy that could belong to any app.
 */
function SlopScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-[#6d28d9] via-[#a21caf] to-[#db2777]">
      <div className="absolute top-10 -left-6 size-24 rounded-full bg-cyan-400/40 blur-2xl" />
      <div className="absolute top-40 -right-4 size-28 rounded-full bg-amber-300/40 blur-2xl" />

      <div className="relative flex h-full flex-col gap-2 px-3 pt-9 pb-3">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[7px] font-bold text-white backdrop-blur">
            ✨ PRO PLAN
          </span>
          <span className="text-[8px] text-white/80">🔥 7 day streak</span>
        </div>

        <span className="bg-linear-to-r from-yellow-200 to-pink-200 bg-clip-text text-[14px] leading-tight font-black text-transparent">
          Let&apos;s Learn Japanese! 🎉
        </span>
        <p className="text-[8px] leading-snug text-white/80">Your AI-powered language journey starts here 🚀✨</p>

        <div className="mt-1 grid grid-cols-2 gap-1.5">
          {[
            ["🍜", "Food"],
            ["✈️", "Travel"],
            ["🎌", "Culture"],
            ["👋", "Intro"],
          ].map(([emoji, label]) => (
            <div
              key={label}
              className="flex flex-col items-center gap-0.5 rounded-2xl border border-white/30 bg-white/20 p-2 shadow-lg backdrop-blur"
            >
              <span className="text-sm">{emoji}</span>
              <span className="text-[7px] font-bold text-white">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-1 rounded-2xl border border-white/30 bg-white/20 p-2 backdrop-blur">
          <div className="flex items-center justify-between text-[7px] font-bold text-white">
            <span>🏆 Daily Goal</span>
            <span>60%</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/25">
            <div className="h-full w-3/5 rounded-full bg-linear-to-r from-yellow-300 to-lime-300" />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-1">
          <span className="rounded-full bg-linear-to-r from-yellow-300 to-orange-400 py-1.5 text-center text-[8px] font-black text-purple-900 shadow-lg">
            🚀 Start Your Journey!
          </span>
          <span className="text-center text-[6px] text-white/60">Powered by AI ✨ · Level up your 日本語 💪</span>
        </div>
      </div>
    </div>
  );
}

const SIDES = [
  { id: "slop", label: "Some Vibe Coder's Dream", accent: "text-tomo-orange" },
  { id: "real", label: "My Own Vision", accent: "text-tomo-blue" },
];

export function VibeCodedDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 @xl:gap-8">
      {SIDES.map((side, i) => (
        <motion.div
          key={side.id}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
          className="flex flex-col items-center gap-3 @xl:gap-4"
        >
          <span className={`text-center text-[13px] font-bold @xl:text-sm ${side.accent}`}>{side.label}</span>

          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="w-full max-w-[8.5rem] @xl:max-w-[11rem]"
          >
            {side.id === "slop" ? (
              <PhoneFrame>
                {/* Decorative: a design that was never built. */}
                <div aria-hidden className="h-full">
                  <SlopScreen />
                </div>
              </PhoneFrame>
            ) : (
              <PhoneFrame src="/projects/tomo/screens/topics.png" alt="The Tomo topic selection screen as shipped" />
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
