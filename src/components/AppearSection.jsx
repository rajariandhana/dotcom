import {
  appear_initial,
  appear_transition,
  appear_viewport,
  appear_whileInView,
} from "../libs/motion/motion";
import { motion } from "motion/react";

export default function AppearSection({ children, className }) {
  return (
    <motion.section
      className={className}
      initial={appear_initial}
      whileInView={appear_whileInView}
      transition={appear_transition}
      viewport={appear_viewport}
    >
      {children}
    </motion.section>
  );
}
