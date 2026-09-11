import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SHOTS = [
  {
    src: "/projects/ashes-of-alengka/shot-arena.jpg",
    caption: "The arena. Two puppets, one lamp, and the dalang blocking the bottom of the screen.",
  },
  {
    src: "/projects/ashes-of-alengka/shot-swing.jpg",
    caption: "Anoman mid-swing. Nothing about that arm position is keyframed.",
  },
  {
    src: "/projects/ashes-of-alengka/shot-lean.jpg",
    caption: "Leaning in. Tilting the stick walks the puppet toward its opponent.",
  },
  {
    src: "/projects/ashes-of-alengka/shot-clash.jpg",
    caption: "What happens when both players lean in and swing at the same time.",
  },
  {
    src: "/projects/ashes-of-alengka/shot-clouds.jpg",
    caption: "Mega mendung clouds drifting across the screen behind the fight.",
  },
  {
    src: "/projects/ashes-of-alengka/shot-health.jpg",
    caption: "Ten damage a hit, a hundred health each. Somebody is losing.",
  },
  {
    src: "/projects/ashes-of-alengka/shot-title.jpg",
    caption: "The title screen.",
  },
  {
    src: "/projects/ashes-of-alengka/shot-controls.jpg",
    caption: "The keyboard fallback, for when there is no controller in the room.",
  },
];

export default function ShotGallery() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {SHOTS.map((shot, index) => (
          <motion.button
            key={shot.src}
            type="button"
            onClick={() => setOpen(index)}
            className="alengka-shot group relative block"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
          >
            <img
              src={shot.src}
              alt={shot.caption}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-alengka-night/85 p-3 text-left text-xs text-alengka-cream/80 transition-transform duration-300 group-hover:translate-y-0">
              {shot.caption}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[9998] flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-alengka-night/95 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              src={SHOTS[open].src}
              alt={SHOTS[open].caption}
              className="max-h-[78vh] w-auto max-w-full rounded-lg border border-alengka-gold/30"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              transition={{ duration: 0.3 }}
            />
            <p className="max-w-xl text-center text-sm text-alengka-cream/70">
              {SHOTS[open].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
