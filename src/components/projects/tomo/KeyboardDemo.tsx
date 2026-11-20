"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { LuKeyboard } from "react-icons/lu";

import { PhoneFrame } from "./PhoneFrame";
import { demoButton } from "./shared";

const KEY_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const KEYBOARD_PCT = 42;
// iOS pans the layout viewport, so content slides up and the header clips out.
const PAN_PCT = 28;
const spring = { type: "spring", stiffness: 260, damping: 30 } as const;

function Keyboard({ open }: { open: boolean }) {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end gap-[3px] bg-[#d1d3d9] px-1 pt-1.5 pb-2"
      style={{ height: `${KEYBOARD_PCT}%` }}
      initial={false}
      animate={{ y: open ? "0%" : "100%" }}
      transition={spring}
    >
      {KEY_ROWS.map((row, i) => (
        <div key={i} className="flex shrink-0 justify-center gap-[3px]">
          {row.map((k) => (
            <span
              key={k}
              className="flex h-[18px] flex-1 shrink-0 items-center justify-center rounded-[3px] bg-white text-[7px] font-medium text-tomo-ink shadow-sm"
            >
              {k}
            </span>
          ))}
        </div>
      ))}
      <div className="flex shrink-0 justify-center gap-[3px]">
        <span className="h-[18px] w-6 shrink-0 rounded-[3px] bg-[#adb1b9]" />
        <span className="flex h-[18px] flex-1 shrink-0 items-center justify-center rounded-[3px] bg-white text-[7px] text-tomo-slate">
          space
        </span>
        <span className="h-[18px] w-6 shrink-0 rounded-[3px] bg-tomo-blue" />
      </div>
    </motion.div>
  );
}

function ChatBody() {
  return (
    <>
      <div className="flex shrink-0 items-center gap-2 border-b border-tomo-line px-3 pt-7 pb-2">
        <span className="text-[9px] text-tomo-slate">‹</span>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-tomo-ink">Self Introduction</span>
          <span lang="ja" className="text-[7px] text-tomo-slate">
            自己紹介
          </span>
        </div>
        <span className="ml-auto text-[8px] text-tomo-slate">1/5</span>
      </div>

      <div lang="ja" className="flex flex-1 flex-col gap-1.5 px-3 py-2.5">
        <div className="max-w-[80%] rounded-lg border border-tomo-blue-100 px-2 py-1.5 text-[7px] leading-relaxed text-tomo-ink">
          はじめまして！私はトモです。
        </div>
        <div className="ml-auto max-w-[80%] rounded-lg bg-tomo-blue px-2 py-1.5 text-[7px] leading-relaxed text-white">
          はじめまして！ラルフです。
        </div>
        <div className="max-w-[80%] rounded-lg border border-tomo-blue-100 px-2 py-1.5 text-[7px] leading-relaxed text-tomo-ink">
          オーストラリアは素敵な国ですね。
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 border-t border-tomo-line px-3 py-2">
        <span className="flex-1 rounded-full border border-tomo-line px-2 py-1 text-[7px] text-tomo-slate/60">
          Type a message…
        </span>
        <span className="flex size-4 items-center justify-center rounded-md bg-tomo-orange/40 text-[7px] text-white">
          →
        </span>
      </div>
    </>
  );
}

/** The same keyboard opening on two phones: the broken 100dvh layout and the visualViewport fix. */
export function KeyboardDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-pressed={open}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={demoButton}
      >
        <LuKeyboard aria-hidden />
        {open ? "Dismiss the keyboard" : "Tap the input"}
      </motion.button>

      <div className="flex w-full items-start justify-center gap-5 @xl:gap-10">
        <div className="flex w-40 flex-col items-center gap-3 @xl:w-48">
          <PhoneFrame indicator={false}>
            <div aria-hidden className="relative h-full w-full overflow-hidden bg-white">
              <motion.div
                className="absolute inset-x-0 top-0 flex h-full flex-col"
                initial={false}
                animate={{ y: open ? `-${PAN_PCT}%` : "0%" }}
                transition={spring}
              >
                <ChatBody />
              </motion.div>
              <Keyboard open={open} />
            </div>
          </PhoneFrame>
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-[11px] font-bold text-tomo-orange">100dvh</span>
            <span className="text-[10px] leading-snug text-tomo-slate">
              iOS pans the whole layout viewport. The header leaves the screen.
            </span>
          </div>
        </div>

        <div className="flex w-40 flex-col items-center gap-3 @xl:w-48">
          <PhoneFrame indicator={false}>
            <div aria-hidden className="relative h-full w-full overflow-hidden bg-white">
              <motion.div
                className="absolute inset-x-0 top-0 flex flex-col overflow-hidden"
                initial={false}
                animate={{ height: open ? `${100 - KEYBOARD_PCT}%` : "100%" }}
                transition={spring}
              >
                <ChatBody />
              </motion.div>
              <Keyboard open={open} />
            </div>
          </PhoneFrame>
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-[11px] font-bold text-tomo-blue">visualViewport</span>
            <span className="text-[10px] leading-snug text-tomo-slate">
              Height tracks what is actually visible. Nothing moves but the message list.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
