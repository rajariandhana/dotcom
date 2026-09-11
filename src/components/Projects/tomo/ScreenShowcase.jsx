import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import PhoneFrame from "./PhoneFrame";

const BASE = "/projects/tomo/screens";

const SCREENS = [
  {
    id: "home",
    label: "Home",
    ja: "ホーム",
    src: `${BASE}/home.png`,
    note: "One kanji, one verb. The whole landing screen is a logo and a button, because the only thing a first-time visitor should have to decide is whether to start talking.",
  },
  {
    id: "topics",
    label: "Topics",
    ja: "トピック",
    src: `${BASE}/topics.png`,
    note: "Topics are shaped like playing cards on purpose. A 3:4 card reads as something you pick up, not a menu row you scan past.",
  },
  {
    id: "waiting",
    label: "Waiting",
    ja: "考え中",
    src: `${BASE}/conversation-streaming.png`,
    note: "Three dots in an empty bubble. The turn counter in the corner already says 1/5, so you know what the session costs before you spend it.",
  },
  {
    id: "conversation",
    label: "Conversation",
    ja: "会話",
    src: `${BASE}/conversation-translation.png`,
    note: "Japanese first, English only when asked for. The translation hides behind a tap so the reflex is to read the Japanese, not skip to the answer.",
  },
  {
    id: "ended",
    label: "Session end",
    ja: "終了",
    src: `${BASE}/conversation-ended.png`,
    note: "Five turns and the session closes on its own. Ending on a clean note beats letting a free conversation trail off into a rate-limit error.",
  },
  {
    id: "history",
    label: "Transcript",
    ja: "記録",
    src: `${BASE}/conversation-history.png`,
    note: "The finished conversation comes back as a modal, with the audio it already generated. Replaying a line never costs a second API call.",
  },
  {
    id: "kanji",
    label: "Kanji",
    ja: "漢字",
    src: `${BASE}/kanji-modes.png`,
    note: "Conversation is the hard sell, so kanji drills give the app something to do on a two-minute break.",
  },
  {
    id: "levels",
    label: "Levels",
    ja: "レベル",
    src: `${BASE}/kanji-levels.png`,
    note: "Levels run vertically, N5 down to N1, and the screen says outright which end is easiest. JLPT numbering is backwards to anyone who has not met it before.",
  },
  {
    id: "matching",
    label: "Matching",
    ja: "組み合わせ",
    src: `${BASE}/kanji-matching.png`,
    note: "Five kanji, five meanings, five rounds. Pairs resolve in place instead of navigating, which keeps the whole round on one screen.",
  },
  {
    id: "guide",
    label: "Guide",
    ja: "ガイド",
    src: `${BASE}/guide.png`,
    note: "A four-step explainer, written because the first testers all asked the same question: am I supposed to type in Japanese?",
  },
  {
    id: "pro",
    label: "Pro",
    ja: "プロ",
    src: `${BASE}/pro.png`,
    note: "A deliberately honest paywall. It lists what Pro would unlock and labels the button coming soon, rather than pretending a checkout exists.",
  },
];

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 70 : -70, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -70 : 70, scale: 0.97 }),
};

export default function ScreenShowcase() {
  const [[index, direction], setState] = useState([0, 0]);
  const screen = SCREENS[index];

  // Decode every screenshot up front — otherwise the first visit to a tab
  // waits on a fresh PNG decode and the frame sits empty mid-transition.
  useEffect(() => {
    SCREENS.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  const go = (next) => {
    const wrapped = (next + SCREENS.length) % SCREENS.length;
    setState([wrapped, next > index ? 1 : -1]);
  };

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {/* tabs */}
      <div className="flex w-full max-w-3xl flex-wrap justify-center gap-2">
        {SCREENS.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.id}
              onClick={() => go(i)}
              className={`tomo-pill relative ${
                active
                  ? "border-tomo-blue text-white"
                  : "border-tomo-line bg-white text-tomo-slate hover:border-tomo-blue-100 hover:text-tomo-blue"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="tomo-tab"
                  className="absolute inset-0 z-0 rounded-full bg-tomo-blue"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
        {/* phone */}
        <div className="relative flex shrink-0 items-center gap-3 sm:gap-5">
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous screen"
            className="flex size-9 items-center justify-center rounded-full border border-tomo-line bg-white text-tomo-slate transition-all hover:scale-110 hover:border-tomo-blue hover:text-tomo-blue"
          >
            <LuChevronLeft />
          </button>

          <div className="relative w-56 sm:w-64">
            {/* soft brand glow behind the device */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-tomo-blue/20 blur-[70px]" />

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={screen.id}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -55) go(index + 1);
                  else if (info.offset.x > 55) go(index - 1);
                }}
                whileDrag={{ cursor: "grabbing", scale: 0.985 }}
                className="cursor-grab"
              >
                <PhoneFrame src={screen.src} alt={`Tomo — ${screen.label}`} />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => go(index + 1)}
            aria-label="Next screen"
            className="flex size-9 items-center justify-center rounded-full border border-tomo-line bg-white text-tomo-slate transition-all hover:scale-110 hover:border-tomo-blue hover:text-tomo-blue"
          >
            <LuChevronRight />
          </button>
        </div>

        {/* caption */}
        <div className="flex w-full max-w-md flex-col gap-4 lg:w-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-tomo-ink lg:text-3xl">
                  {screen.label}
                </span>
                <span className="text-sm text-tomo-slate">{screen.ja}</span>
              </div>
              <p className="text-justify text-sm leading-relaxed text-tomo-slate lg:text-base">
                {screen.note}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* progress dots */}
          <div className="mt-1 flex flex-wrap gap-1.5">
            {SCREENS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                aria-label={s.label}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-7 bg-tomo-blue"
                    : "w-1.5 bg-tomo-line hover:bg-tomo-blue/40"
                }`}
              />
            ))}
          </div>

          <span className="text-xs text-tomo-slate/70">
            Drag the phone, or use the arrows. Screens captured at 390 × 844.
          </span>
        </div>
      </div>
    </div>
  );
}
