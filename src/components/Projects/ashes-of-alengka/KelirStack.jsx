import { useState } from "react";
import { motion } from "framer-motion";
import DalangShadow from "./DalangShadow.jsx";

/**
 * Interactive explode of the arena scene.
 *
 * The fight itself is an ordinary 2D scene (Arena2d) rendered into a
 * SubViewport. That viewport's texture is then painted onto a QuadMesh sitting
 * inside a Node3D world, so everything else in the shot — the cloth, the fog,
 * the drifting clouds, the fire, the dalang's shadow — is real 3D geometry in
 * front of and behind a flat 2D game.
 */

const LAYERS = [
  {
    id: "kelir",
    depth: 0,
    title: "Kelir + volumetric fog",
    detail:
      "A QuadMesh wearing the cloth texture, lit from behind by one OmniLight3D and wrapped in amber volumetric fog.",
  },
  {
    id: "awan",
    depth: 1,
    title: "Awan — Sprite3D",
    detail:
      "Mega mendung clouds drifting in world space. Each one wraps around and bobs on its own random phase, so they never move in lockstep.",
  },
  {
    id: "arena",
    depth: 2,
    title: "SubViewport → ViewportTexture",
    detail:
      "The whole fight — both fighters, hitboxes, health bars — is a flat 2D scene rendered into a viewport, then used as the albedo texture of a quad.",
  },
  {
    id: "fire",
    depth: 3,
    title: "Fire + blencong glow",
    detail:
      "An AnimatedSprite3D fire atlas burning in front of the screen, doubled up with the lamp bloom.",
  },
  {
    id: "dalang",
    depth: 4,
    title: "The dalang's shadow",
    detail:
      "Nearest the camera: the puppeteer himself, blocking the bottom of the screen exactly the way he would at a real performance.",
  },
];

export default function KelirStack() {
  const [spread, setSpread] = useState(45);
  const [active, setActive] = useState("arena");

  const t = spread / 100;
  const activeLayer = LAYERS.find((layer) => layer.id === active);

  // pivot the spread around the middle layer so the stack stays centred
  const layerStyle = (depth) => ({
    transform: `translateZ(${(depth - 2) * t * 88}px)`,
    opacity: active === LAYERS[depth].id || t < 0.08 ? 1 : 0.45,
    // once the stack is pulled apart, outline each plane so you can see where
    // one layer ends and the next begins
    outline:
      t > 0.1
        ? `1px solid rgba(230,200,119,${active === LAYERS[depth].id ? 0.55 : 0.16})`
        : "none",
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <div
        className="relative h-[320px] w-full overflow-hidden rounded-xl border border-alengka-gold/20 bg-alengka-night sm:h-[420px]"
        style={{ perspective: "1400px" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${-12 * t}deg) rotateY(${-26 * t}deg) scale(${1 - 0.26 * t})`,
          }}
        >
          {/* 0 — kelir */}
          <div
            className="alengka-kelir absolute h-[70%] w-[78%] rounded-md border border-alengka-gold/20 transition-opacity duration-300"
            style={layerStyle(0)}
            onMouseEnter={() => setActive("kelir")}
            onClick={() => setActive("kelir")}
          >
            <div className="alengka-flicker absolute inset-0 rounded-md bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(240,169,60,0.35),transparent_70%)]" />
          </div>

          {/* 1 — awan */}
          <div
            className="absolute h-[70%] w-[78%] transition-opacity duration-300"
            style={layerStyle(1)}
            onMouseEnter={() => setActive("awan")}
            onClick={() => setActive("awan")}
          >
            <motion.img
              src="/projects/ashes-of-alengka/awan-1.png"
              alt=""
              className="absolute left-[6%] top-[10%] w-[34%]"
              animate={{ x: [0, 26, 0], y: [0, -6, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src="/projects/ashes-of-alengka/awan-2.png"
              alt=""
              className="absolute right-[8%] top-[4%] w-[28%]"
              animate={{ x: [0, -22, 0], y: [0, 8, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* 2 — the 2D game */}
          <div
            className="absolute flex h-[70%] w-[78%] items-end justify-center gap-[12%] transition-opacity duration-300"
            style={layerStyle(2)}
            onMouseEnter={() => setActive("arena")}
            onClick={() => setActive("arena")}
          >
            <div className="absolute left-[8%] right-[8%] top-[12%] flex gap-4">
              <div className="h-2 flex-1 rounded-full bg-alengka-blood" />
              <div className="h-2 flex-1 rounded-full bg-alengka-blood" />
            </div>
            <img
              src="/projects/ashes-of-alengka/anoman-body.png"
              alt="Anoman"
              className="h-[62%] w-auto object-contain"
            />
            <img
              src="/projects/ashes-of-alengka/dasamuka-body.png"
              alt="Dasamuka"
              className="h-[58%] w-auto -scale-x-100 object-contain"
            />
          </div>

          {/* 3 — fire */}
          <div
            className="absolute h-[70%] w-[78%] transition-opacity duration-300"
            style={layerStyle(3)}
            onMouseEnter={() => setActive("fire")}
            onClick={() => setActive("fire")}
          >
            <motion.img
              src="/projects/ashes-of-alengka/fire.png"
              alt=""
              className="absolute bottom-[6%] left-[14%] h-[34%]"
              animate={{ scaleY: [1, 1.12, 0.96, 1], opacity: [0.9, 1, 0.85, 0.9] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              style={{ transformOrigin: "50% 100%" }}
            />
            <motion.img
              src="/projects/ashes-of-alengka/fire.png"
              alt=""
              className="absolute bottom-[6%] right-[16%] h-[28%]"
              animate={{ scaleY: [1, 0.94, 1.14, 1], opacity: [0.85, 1, 0.9, 0.85] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              style={{ transformOrigin: "50% 100%" }}
            />
          </div>

          {/* 4 — dalang */}
          <div
            className="absolute h-[70%] w-[78%] transition-opacity duration-300"
            style={layerStyle(4)}
            onMouseEnter={() => setActive("dalang")}
            onClick={() => setActive("dalang")}
          >
            <DalangShadow
              className="absolute bottom-0 left-1/2 h-[42%] w-[46%] -translate-x-1/2 drop-shadow-[0_0_24px_rgba(0,0,0,0.9)]"
              fill="#050302"
              stroke="rgba(230,200,119,0.45)"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <span className="alengka-eyebrow shrink-0">Pull apart</span>
          <input
            type="range"
            min="0"
            max="100"
            value={spread}
            onChange={(event) => setSpread(Number(event.target.value))}
            aria-label="Separate the scene layers"
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-alengka-gold/25 accent-alengka-flame"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {LAYERS.map((layer) => (
            <button
              key={layer.id}
              type="button"
              onMouseEnter={() => setActive(layer.id)}
              onClick={() => setActive(layer.id)}
              className={`rounded-full border px-3 py-1 text-xs transition-all duration-300 ${
                active === layer.id
                  ? "border-alengka-gold bg-alengka-gold/15 text-alengka-gold"
                  : "border-alengka-gold/20 text-alengka-cream/50 hover:border-alengka-gold/50"
              }`}
            >
              {layer.title}
            </button>
          ))}
        </div>

        <motion.p
          key={activeLayer.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="min-h-[3.5rem] text-sm text-alengka-cream/70"
        >
          {activeLayer.detail}
        </motion.p>
      </div>
    </div>
  );
}
