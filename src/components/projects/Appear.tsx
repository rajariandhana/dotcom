"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** A section that fades and rises into place the first time it scrolls into view. */
export function Appear({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.section>
  );
}
