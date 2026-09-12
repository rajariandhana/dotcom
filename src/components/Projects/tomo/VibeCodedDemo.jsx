import { motion } from "motion/react";
import PhoneFrame from "./PhoneFrame";

/**
 * The two outcomes side by side. The "vibe coded" phone is live markup rather
 * than a screenshot, because it never existed — it is every default the first
 * prompt was written to forbid: gradients, emoji, glass cards, gamification,
 * and copy that could belong to any app.
 */
function SlopScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#6d28d9] via-[#a21caf] to-[#db2777]">
      <div className="absolute -left-6 top-10 size-24 rounded-full bg-cyan-400/40 blur-2xl" />
      <div className="absolute -right-4 top-40 size-28 rounded-full bg-amber-300/40 blur-2xl" />

      <div className="relative flex h-full flex-col gap-2 px-3 pb-3 pt-9">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[7px] font-bold text-white backdrop-blur">
            ✨ PRO PLAN
          </span>
          <span className="text-[8px] text-white/80">🔥 7 day streak</span>
        </div>

        <h1 className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-[14px] font-black leading-tight text-transparent">
          Let&apos;s Learn Japanese! 🎉
        </h1>
        <p className="text-[8px] leading-snug text-white/80">
          Your AI-powered language journey starts here 🚀✨
        </p>

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
            <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-yellow-300 to-lime-300" />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-1">
          <button className="rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 py-1.5 text-[8px] font-black text-purple-900 shadow-lg">
            🚀 Start Your Journey!
          </button>
          <span className="text-center text-[6px] text-white/60">
            Powered by AI ✨ · Level up your 日本語 💪
          </span>
        </div>
      </div>
    </div>
  );
}

const SIDES = [
  {
    id: "slop",
    label: "Some Vibe Coder's Dream",
    tone: "orange",
  },
  {
    id: "real",
    label: "My Own Vision",
    tone: "blue",
  },
];

export default function VibeCodedDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:gap-8">
      {SIDES.map((side, i) => {
        const accent =
          side.tone === "orange" ? "text-tomo-orange" : "text-tomo-blue";
        const dot =
          side.tone === "orange" ? "bg-tomo-orange" : "bg-tomo-blue";

        return (
          <motion.div
            key={side.id}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
            className="flex flex-col items-center gap-3 sm:gap-4"
          >
            <div className="flex flex-col items-center gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
              <span className={`text-[13px] font-bold sm:text-sm ${accent}`}>
                {side.label}
              </span>
            </div>

            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="w-full max-w-[8.5rem] sm:max-w-[11rem]"
            >
              {side.id === "slop" ? (
                <PhoneFrame>
                  <SlopScreen />
                </PhoneFrame>
              ) : (
                <PhoneFrame
                  src="/projects/tomo/screens/topics.png"
                  alt="The Tomo topic selection screen as shipped"
                />
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
