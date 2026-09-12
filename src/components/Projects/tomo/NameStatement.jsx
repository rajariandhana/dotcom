import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * The naming beat: 友 = tomo = friend. Deliberately spare — one glyph, one
 * rule, three words, one sentence. Hovering the kanji lifts its reading in
 * as furigana.
 */
export default function NameStatement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const drift = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <section
      ref={ref}
      className="flex w-full justify-center overflow-hidden bg-white py-24 sm:py-32 lg:py-40"
    >
      <div className="flex w-full max-w-3xl flex-col items-center gap-8 px-6 text-center sm:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[10px] font-semibold tracking-[0.35em] text-tomo-slate/60"
        >
          名前
        </motion.span>

        {/* the glyph, with its reading set above it as furigana */}
        <motion.div
          style={{ y: drift }}
          className="group flex flex-col items-center gap-2 sm:gap-3"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="select-none indent-[0.5em] text-xs tracking-[0.5em] text-tomo-blue sm:text-sm"
          >
            とも
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="cursor-default select-none pb-2 text-[8.5rem] font-black leading-none text-tomo-ink transition-colors duration-500 group-hover:text-tomo-blue sm:text-[12rem] lg:text-[15rem]"
          >
            友
          </motion.span>
        </motion.div>

        {/* rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          className="h-px w-20 origin-center bg-tomo-line sm:w-28"
        />

        {/* tomo · friend */}
        <div className="flex items-center gap-3 sm:gap-5">
          {["tomo", "·", "friend"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.35 + i * 0.12,
                ease: "easeOut",
              }}
              className={
                word === "·"
                  ? "text-sm text-tomo-line sm:text-base"
                  : "text-sm font-semibold uppercase tracking-[0.3em] text-tomo-ink sm:text-base"
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
          className="max-w-xl text-lg leading-relaxed text-tomo-slate sm:text-xl"
        >
          Tomo means friend, a friend who helps you in your Japanese learning journey.
        </motion.p>
      </div>
    </section>
  );
}
