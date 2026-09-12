import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { FaAnglesLeft } from "react-icons/fa6";
import { LuExternalLink, LuGithub } from "react-icons/lu";

import PhoneFrame from "./PhoneFrame.jsx";
import { LIVE_URL, REPO_URL } from "./links.js";

const STACK = [
  "React 19",
  "TypeScript",
  "Vite",
  "Tailwind 4",
  "TanStack Query",
  "Framer Motion",
  "Go",
  "Gemini",
  "Vercel",
];

export default function Hero() {
  const hero_ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: hero_ref,
    offset: ["start start", "end start"],
  });

  const phone_y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const kanji_y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const kanji_opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={hero_ref}
      className="relative flex w-full justify-center overflow-hidden bg-tomo-paper"
    >
      {/* 友 watermark */}
      <motion.span
        style={{ y: kanji_y, opacity: kanji_opacity }}
        className="pointer-events-none absolute -right-8 top-8 select-none text-[18rem] font-black leading-none text-tomo-blue/[0.055] sm:text-[26rem] lg:-right-16 lg:text-[34rem]"
        aria-hidden="true"
      >
        友
      </motion.span>

      <div className="relative flex w-full max-w-6xl flex-col items-center gap-12 px-6 pb-20 pt-20 sm:px-10 lg:flex-row lg:justify-between lg:gap-16 lg:pb-28 lg:pt-24">
        <Link
          to="/projects"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 text-xs text-tomo-slate transition-colors hover:text-tomo-blue sm:left-10"
        >
          <FaAnglesLeft className="text-[10px]" />
          <span>Back to Projects</span>
        </Link>

        {/* copy */}
        <div className="flex w-full flex-col items-start gap-5 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <img
              src="/projects/tomo/tomo-logo.png"
              alt="Tomo"
              className="h-10 w-auto object-contain transition-transform duration-300 hover:rotate-3 hover:scale-110 sm:h-12"
            />
            <div className="flex flex-col">
              <span className="text-3xl font-black leading-none text-tomo-blue sm:text-4xl">
                Tomo
              </span>
              <span className="text-xs text-tomo-slate">友 · friend</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            Learn Japanese through
            <br />
            <span className="text-tomo-blue">natural conversations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="max-w-lg text-justify leading-relaxed text-tomo-slate"
          >
            Tomo is a mobile-first web app that lets you practice having
            natural conversations by chatting with an AI. Pick a topic, it
            opens the conversation, and you reply however you can. The English
            translation stays hidden until you ask for it.
          </motion.p>

          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap gap-1.5"
          >
            {STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-tomo-line bg-white px-2.5 py-1 text-[11px] font-semibold text-tomo-slate transition-all duration-200 hover:-translate-y-0.5 hover:border-tomo-blue hover:text-tomo-blue"
              >
                {tech}
              </span>
            ))}
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-2 flex flex-wrap gap-3"
          >
            <Link
              to={LIVE_URL}
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-tomo-blue px-5 py-2.5 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(37,99,235,0.85)] transition-all hover:-translate-y-0.5 hover:bg-tomo-blue-deep"
            >
              Try it live <LuExternalLink />
            </Link>
            <Link
              to={REPO_URL}
              target="_blank"
              className="flex items-center gap-2 rounded-full border border-tomo-line bg-white px-5 py-2.5 text-sm font-bold text-tomo-ink transition-all hover:-translate-y-0.5 hover:border-tomo-blue hover:text-tomo-blue"
            >
              <LuGithub /> Source
            </Link>
          </motion.div>
        </div>

        {/* hero phone */}
        <motion.div
          style={{ y: phone_y }}
          initial={{ opacity: 0, y: 60, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-52 shrink-0 sm:w-60 lg:w-64"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[75%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-tomo-blue/25 blur-[80px]" />
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ rotate: 0, scale: 1.03 }}
          >
            <PhoneFrame
              src="/projects/tomo/screens/conversation-translation.png"
              alt="A Tomo conversation in Japanese"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
