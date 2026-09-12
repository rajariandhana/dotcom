import { useState } from "react";
import { motion } from "motion/react";
import { LuCheck, LuChevronDown, LuCopy } from "react-icons/lu";
import { copyText } from "./copyText.js";

// The prompt that started the project, kept as written. Only the line-wrap
// damage in "2x2 grid" has been repaired.
const PROMPT = `# Tomo
I want to create an app called Tomo, an application where you learn Japanese by having normal conversation with an AI.

User will be prompted with 4 cards in a 2x2 grid containing topics selected randomly from:
	["self introduction", "hometown", "food", "hobbies", "travel", "pop culture"]
User will choose 1 topic/card for conversation.
The bot will talk first and then starts a back and forth conversation according to the user's reply. It will be turn based so if the AI is loading, the user cannot reply.

## Tech Stack
- Frontend: use React, TailwindCSS 4, TypeScript, React Router, TanStack Query and axios for API calls, and Framer Motion for simple animation.
- Backend: use Go with Gin framework, use /api prefix for API routes.
- Make sure that the frontend and backend has different directories.
- Use REST API with JSON
- I have a Google Gemini AI Pro account and have an access to Gemini API. Make sure that the AI will only reply in Japanese.
- At this first stage it does not need accounts nor authentication.
- Specifically use snake case for variables and JSON attributes.
- Use Bun JS instead of NPM or PNPM

## Design
- Colors: white, blue, orange. White will be used for background
- NEVER use gradient, NEVER use emojis
- don't be an AI slop

At this first stage focus on the frontend and UI, no need for the backend`;

export default function InitialPrompt() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!(await copyText(PROMPT))) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-tomo-line bg-tomo-ink">
        {/* title bar */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
          <span className="tomo-mono text-[11px] font-semibold text-white/50">
            the first prompt
          </span>

          <button
            onClick={copy}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-semibold text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            {copied ? <LuCheck /> : <LuCopy />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {/* body */}
        <div className="relative">
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 260 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <pre className="tomo-mono overflow-x-auto px-4 py-4 text-[11px] leading-relaxed text-white/75 sm:text-[12px]">
              {PROMPT}
            </pre>
          </motion.div>

          {!open && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-tomo-ink to-transparent" />
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-white/10 py-2.5 text-[11px] font-semibold text-white/50 transition-colors hover:text-white"
        >
          {open ? "Collapse" : "Read the whole thing"}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex"
          >
            <LuChevronDown />
          </motion.span>
        </button>
      </div>

      <p className="text-[13px] leading-relaxed text-tomo-slate">
        Of course this prompt is not just gonna one shot the whole app according
        to my mind, but it is a start. There are so many back and forth and
        design decision and features that changes along the way.
      </p>
    </div>
  );
}
