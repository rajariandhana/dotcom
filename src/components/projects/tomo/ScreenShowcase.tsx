"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { PhoneFrame } from "./PhoneFrame";

const BASE = "/projects/tomo/screens";

const SCREENS = [
  { id: "home", label: "Home", ja: "ホーム", src: `${BASE}/home.png`, note: "Start chatting or learn the words." },
  {
    id: "topics",
    label: "Topics",
    ja: "トピック",
    src: `${BASE}/topics.png`,
    note: "Before talking with Tomo, choose a topic that you're comfortable with.",
  },
  {
    id: "conversation",
    label: "Chat",
    ja: "会話",
    src: `${BASE}/conversation-translation.png`,
    note: "Chat normally like with a real person. Forgot some words? don't worry, Tomo can still understands if you speak in English.",
  },
  {
    id: "history",
    label: "Review",
    ja: "復習",
    src: `${BASE}/conversation-history.png`,
    note: "Look back at your conversation history, check for yourself or use our AI feedback feature by unlocking Tomo plus",
  },
  {
    id: "kanji",
    label: "Don't forget Kanjis!",
    ja: "漢字",
    src: `${BASE}/kanji-modes.png`,
    note: "We don't want you to forgot your kanjis (trust me). So we have two modes, matching and flashcards for a quick lesson.",
  },
  {
    id: "matching",
    label: "Matching",
    ja: "組み合わせ",
    src: `${BASE}/kanji-matching.png`,
    note: "Five kanji, five meanings, five rounds.",
  },
  {
    id: "flashcards",
    label: "Flashcards",
    ja: "単語カード",
    src: `${BASE}/kanji-flashcards.png`,
    note: "See a Kanji, remember it, say it, check it, check other meanings.",
  },
  {
    id: "levels",
    label: "Levels",
    ja: "レベル",
    src: `${BASE}/kanji-levels.png`,
    note: "Choose a level you are comfortable with. Tomo has everything you need.",
  },
  {
    id: "plus",
    label: "Plus",
    ja: "プラス",
    src: `${BASE}/plus.png`,
    note: "Like Tomo and wanted more? Upgrade to Plus and unlock all features. Yes Tomo is your friend, but a friend still needs money to live :).",
  },
];

const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 70 : -70, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -70 : 70, scale: 0.97 }),
};

const arrow =
  "flex size-9 items-center justify-center rounded-full border border-tomo-line bg-white text-tomo-slate transition-all hover:scale-110 hover:border-tomo-blue hover:text-tomo-blue";

/** Tomo's screens in a phone, one at a time: arrows or swipe to step through, with a caption beside. */
export function ScreenShowcase() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const screen = SCREENS[index];

  // Decode every screenshot up front, so a first visit to a screen doesn't sit
  // empty mid-transition while its PNG decodes.
  useEffect(() => {
    for (const s of SCREENS) {
      const img = new window.Image();
      img.src = s.src;
    }
  }, []);

  const go = (next: number) => {
    const wrapped = (next + SCREENS.length) % SCREENS.length;
    setState([wrapped, next > index ? 1 : -1]);
  };

  return (
    <div className="flex w-full flex-col items-center gap-8 @5xl:flex-row @5xl:items-center @5xl:justify-center @5xl:gap-16">
      <div className="relative flex shrink-0 items-center gap-3 @xl:gap-5">
        <button type="button" onClick={() => go(index - 1)} aria-label="Previous screen" className={arrow}>
          <LuChevronLeft aria-hidden />
        </button>

        <div className="relative w-56 @xl:w-64">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[70%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-tomo-blue/20 blur-[70px]" />

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

        <button type="button" onClick={() => go(index + 1)} aria-label="Next screen" className={arrow}>
          <LuChevronRight aria-hidden />
        </button>
      </div>

      <div className="flex w-full max-w-md flex-col gap-4 @5xl:w-96" aria-live="polite">
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
              <span className="text-2xl font-black text-tomo-ink @5xl:text-3xl">{screen.label}</span>
              <span lang="ja" className="text-sm text-tomo-slate">
                {screen.ja}
              </span>
            </div>
            <p className="text-justify text-sm leading-relaxed text-tomo-slate @5xl:text-base">{screen.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
