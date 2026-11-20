"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { LuExternalLink, LuGithub } from "react-icons/lu";

import { PhoneFrame } from "./PhoneFrame";
import { primaryButton, secondaryButton } from "./shared";

export function Hero({ demo, repo }: { demo?: string; repo?: string }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const kanjiY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const kanjiOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative flex w-full justify-center overflow-hidden bg-tomo-paper">
      {/* 友 watermark */}
      <motion.span
        style={{ y: kanjiY, opacity: kanjiOpacity }}
        className="pointer-events-none absolute top-8 -right-8 text-[18rem] leading-none font-black text-tomo-blue/[0.055] select-none @xl:text-[26rem] @5xl:-right-16 @5xl:text-[34rem]"
        aria-hidden="true"
      >
        友
      </motion.span>

      <div className="relative flex w-full max-w-6xl flex-col items-center gap-12 px-6 pt-20 pb-20 @xl:px-10 @5xl:flex-row @5xl:justify-between @5xl:gap-16 @5xl:pt-24 @5xl:pb-28">

        {/* copy */}
        <div className="flex w-full flex-col items-start gap-5 @5xl:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <Image
              src="/projects/tomo/tomo-logo.png"
              alt=""
              width={512}
              height={512}
              priority
              className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-110 hover:rotate-3 @xl:h-12"
            />
            <div className="flex flex-col">
              <span className="text-3xl leading-none font-black text-tomo-blue @xl:text-4xl">Tomo</span>
              <span className="text-xs text-tomo-slate">
                <span lang="ja">友</span> · friend
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-3xl leading-[1.1] font-black tracking-tight @xl:text-4xl @5xl:text-5xl"
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
            Tomo is a mobile-first web app that lets you practice having natural conversations by chatting with an AI.
            Pick a topic, it opens the conversation, and you reply however you can. The English translation stays
            hidden until you ask for it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-2 flex flex-wrap gap-3"
          >
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                Try it live <LuExternalLink aria-hidden />
              </a>
            )}
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                <LuGithub aria-hidden /> Source
              </a>
            )}
          </motion.div>
        </div>

        {/* hero phone */}
        <motion.div
          style={{ y: phoneY }}
          initial={{ opacity: 0, rotate: -4 }}
          animate={{ opacity: 1, rotate: -3 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-52 shrink-0 @xl:w-60 @5xl:w-64"
        >
          <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[75%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-tomo-blue/25 blur-[80px]" />
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
