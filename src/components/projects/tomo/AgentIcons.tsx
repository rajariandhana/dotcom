"use client";

import { motion } from "motion/react";
import type { ComponentType } from "react";
import { LuCheck } from "react-icons/lu";
import { RiOpenaiFill } from "react-icons/ri";
import { SiClaude } from "react-icons/si";

export const CLAUDE_CODE_URL = "https://claude.com/claude-code";

// Cursor ships no mark in this icon set, so its isometric cube is drawn here.
// An approximation, labelled, not a reproduction of the trademark.
function CursorMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2 3 7v10l9 5 9-5V7Z" fill="currentColor" opacity="0.25" />
      <path d="M12 12 3 7v10l9 5Z" fill="currentColor" opacity="0.55" />
      <path d="M12 12l9-5v10l-9 5Z" fill="currentColor" opacity="0.85" />
      <path d="M12 2 3 7l9 5 9-5Z" fill="currentColor" />
    </svg>
  );
}

type App = {
  name: string;
  tile: string;
  glyph: string;
  Icon: ComponentType<{ className?: string }>;
  href?: string;
  mine?: boolean;
};

const APPS: App[] = [
  { name: "ChatGPT", tile: "bg-[#0D0D0D]", glyph: "text-white", Icon: RiOpenaiFill },
  { name: "Claude Code", tile: "bg-[#D97757]", glyph: "text-white", Icon: SiClaude, href: CLAUDE_CODE_URL, mine: true },
  { name: "Codex", tile: "bg-white ring-1 ring-inset ring-black/10", glyph: "text-[#0D0D0D]", Icon: RiOpenaiFill },
  { name: "Cursor", tile: "bg-[#131316]", glyph: "text-white", Icon: CursorMark },
];

function AppTile({ name, tile, glyph, Icon, href, mine }: App) {
  const body = (
    <motion.div
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 340, damping: 20 }}
      className="flex w-20 flex-col items-center gap-2 @xl:w-24"
    >
      <div className="relative">
        {/* the squircle, sized and rounded like a home-screen icon */}
        <div
          className={`flex size-16 items-center justify-center rounded-[1.35rem] shadow-[0_10px_24px_-10px_rgba(15,23,42,0.45)] @xl:size-[4.5rem] @xl:rounded-[1.5rem] ${tile}`}
        >
          <Icon className={`size-8 text-3xl @xl:size-9 ${glyph}`} />
        </div>
        {mine && (
          <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-tomo-blue text-[9px] text-white">
            <LuCheck aria-hidden />
          </span>
        )}
      </div>
      <span className={`text-[11px] leading-tight font-bold ${mine ? "text-tomo-blue" : "text-tomo-ink"}`}>
        {name}
      </span>
    </motion.div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    body
  );
}

/** The four agent tools, as home-screen icons, with the one I picked ticked. */
export function AgentIcons() {
  return (
    <div className="mt-2 flex flex-wrap justify-center gap-5 @xl:justify-start @xl:gap-7">
      {APPS.map((app) => (
        <AppTile key={app.name} {...app} />
      ))}
    </div>
  );
}
