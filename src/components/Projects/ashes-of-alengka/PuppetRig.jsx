import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * A browser rebuild of the in-game wayang rig.
 *
 * In Godot the puppet is one animated Skeleton2D with two RigidBody2D limbs
 * pinned to it: shoulder PinJoint2D -> forearm -> elbow PinJoint2D -> arm.
 * Nothing about the swing is keyframed; the arms are dragged along by the
 * body and settle on their own. Here the same chain is faked with springs of
 * decreasing stiffness, so the further you get from the rod the more the limb
 * lags behind.
 */

const SHOULDER = "87.7% 30.7%";
const ELBOW = "86.3% 55%";

// The limb art ships on the same canvas as the body but unposed -- in the game
// Godot places the rigid bodies at runtime. This nudges the whole arm chain
// back onto the body's shoulder.
const ARM_OFFSET = "translate(-12.7%, 1.45%)";  // applied to a plain wrapper

const COOLDOWN_MS = 2000;

export default function PuppetRig() {
  const stageRef = useRef(null);
  const [swinging, setSwinging] = useState(false);
  const [ready, setReady] = useState(true);
  const [touched, setTouched] = useState(false);

  // -1 (lean left) .. 1 (lean right)
  const lean = useMotionValue(0);

  const bodyTilt = useSpring(useTransform(lean, [-1, 1], [-11, 11]), {
    stiffness: 120,
    damping: 14,
  });
  const bodyShift = useSpring(useTransform(lean, [-1, 1], [-34, 34]), {
    stiffness: 110,
    damping: 16,
  });
  // the limbs are pinned, not animated: they trail the body
  const shoulderLag = useSpring(useTransform(lean, [-1, 1], [26, -26]), {
    stiffness: 45,
    damping: 7,
  });
  const elbowLag = useSpring(useTransform(lean, [-1, 1], [34, -34]), {
    stiffness: 26,
    damping: 5.5,
  });

  const onPointerMove = (event) => {
    const box = stageRef.current?.getBoundingClientRect();
    if (!box) return;
    const ratio = (event.clientX - box.left) / box.width;
    lean.set(Math.max(-1, Math.min(1, ratio * 2 - 1)));
    setTouched(true);
  };

  const swing = () => {
    if (!ready) return;
    setReady(false);
    setSwinging(true);
    setTouched(true);
  };

  useEffect(() => {
    if (ready) return undefined;
    const done = setTimeout(() => setReady(true), COOLDOWN_MS);
    return () => clearTimeout(done);
  }, [ready]);

  // idle breathing so the puppet never looks switched off
  const idle = touched ? {} : { rotate: [-2.5, 2.5, -2.5] };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div
        ref={stageRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => lean.set(0)}
        onClick={swing}
        className="alengka-kelir relative h-[340px] w-full cursor-pointer select-none overflow-hidden rounded-xl border border-alengka-gold/25 sm:h-[420px]"
      >
        {/* blencong: the oil lamp behind the screen */}
        <div className="alengka-flicker pointer-events-none absolute left-1/2 top-[42%] h-[280px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-alengka-flame/25 blur-[90px]" />

        <motion.div
          className="absolute bottom-0 left-1/2 aspect-[480/691] h-[86%] -translate-x-1/2 sm:h-[88%]"
          style={{ rotate: bodyTilt, x: bodyShift, transformOrigin: "50% 100%" }}
          animate={idle}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative h-full w-full">
            <img
              src="/projects/ashes-of-alengka/anoman-body.png"
              alt="Anoman"
              className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_18px_rgba(255,138,31,0.35)]"
            />

            {/* the arm chain, seated on the body's shoulder */}
            <div className="absolute inset-0" style={{ transform: ARM_OFFSET }}>
              {/* shoulder joint */}
              <motion.div
                className="absolute inset-0"
                style={{ rotate: shoulderLag, transformOrigin: SHOULDER }}
              >
              <motion.div
                className="absolute inset-0"
                style={{ transformOrigin: SHOULDER }}
                animate={swinging ? { rotate: [0, -104, 18, 0] } : { rotate: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => setSwinging(false)}
              >
                <img
                  src="/projects/ashes-of-alengka/anoman-forearm.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain"
                />

                {/* elbow joint */}
                <motion.div
                  className="absolute inset-0"
                  style={{ rotate: elbowLag, transformOrigin: ELBOW }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ transformOrigin: ELBOW }}
                    animate={
                      swinging ? { rotate: [0, 42, -68, 12, 0] } : { rotate: 0 }
                    }
                    transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src="/projects/ashes-of-alengka/anoman-arm.png"
                      alt=""
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* the rod the dalang actually holds */}
        <motion.div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[22%] w-[3px] origin-bottom -translate-x-1/2 bg-linear-to-b from-alengka-gold/50 to-alengka-gold/10"
          style={{ rotate: bodyTilt, x: bodyShift }}
        />

        {/* attack indicator, same 1.0 / 0.5 opacity the game uses */}
        <motion.img
          src="/projects/ashes-of-alengka/attack-indicator.png"
          alt=""
          className="pointer-events-none absolute right-6 top-6 h-10 w-10"
          animate={{ opacity: ready ? 1 : 0.5 }}
          transition={{ duration: 0.25 }}
        />

        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-xs text-alengka-cream/45">
          move your cursor to lean &middot; click to swing
        </span>
      </div>

      <button
        type="button"
        onClick={swing}
        disabled={!ready}
        className="rounded-full border border-alengka-gold/40 px-5 py-2 text-sm font-semibold text-alengka-gold transition-all duration-300 hover:border-alengka-gold hover:bg-alengka-gold/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {ready ? "Swing" : "Cooling down…"}
      </button>
    </div>
  );
}
