"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * The naming beat: 友 = tomo = friend. Deliberately spare — one glyph, one
 * rule, three words, one sentence. Hovering the kanji turns it blue.
 */
export function NameStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <section ref={ref} className="flex w-full justify-center overflow-hidden bg-white py-24 @xl:py-32 @5xl:py-40">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8 px-6 text-center @xl:px-10">
        <motion.span
          lang="ja"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[10px] font-semibold tracking-[0.35em] text-tomo-slate/60"
        >
          名前
        </motion.span>

        {/* the glyph, with its reading set above it as furigana */}
        <motion.div style={{ y: drift }} lang="ja" className="group flex flex-col items-center gap-2 @xl:gap-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="indent-[0.5em] text-xs tracking-[0.5em] text-tomo-blue select-none @xl:text-sm"
          >
            とも
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="cursor-default pb-2 text-[8.5rem] leading-none font-black text-tomo-ink transition-colors duration-500 select-none group-hover:text-tomo-blue @xl:text-[12rem] @5xl:text-[15rem]"
          >
            友
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          className="h-px w-20 origin-center bg-tomo-line @xl:w-28"
        />

        <div className="flex items-center gap-3 @xl:gap-5">
          {["tomo", "·", "friend"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.12, ease: "easeOut" }}
              className={
                word === "·"
                  ? "text-sm text-tomo-line @xl:text-base"
                  : "text-sm font-semibold tracking-[0.3em] text-tomo-ink uppercase @xl:text-base"
              }
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="max-w-xl text-lg leading-relaxed text-tomo-slate @xl:text-xl"
        >
          Tomo means friend, a friend who helps you in your Japanese learning journey.
        </motion.p>
      </div>
    </section>
  );
}
