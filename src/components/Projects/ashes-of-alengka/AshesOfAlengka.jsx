import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaAnglesLeft } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";

import AppearSection from "../../AppearSection.jsx";
import PuppetRig from "./PuppetRig.jsx";
import KelirStack from "./KelirStack.jsx";
import SharedController from "./SharedController.jsx";
import CombatLoop from "./CombatLoop.jsx";
import ShotGallery from "./ShotGallery.jsx";
import DalangShadow from "./DalangShadow.jsx";

const PLAY_LINK = "https://ashes-of-alengka.ralfazza.com";
const REPO_LINK = "https://github.com/rajariandhana/Wayang";

const LOADING_DURATION = 1800;

const TIMELINE = [
  { label: "added wayang interface and player and enemy class", note: "Hour one. Classes before art." },
  { label: "add player movement, ground, main scene", note: "" },
  { label: "feat: Add main menu scenes, scripts and assets", note: "" },
  { label: "feat: Player wayang rigging", note: "The puppet gets joints." },
  { label: "feat: bind to game controller", note: "" },
  { label: "feat: arena 3d 2d", note: "The 2D fight moves inside a 3D stage." },
  { label: "feat: tiba2 fighting game", note: "The pivot. \"Tiba-tiba\" is Indonesian for \"suddenly\".", pivot: true },
  { label: "feat: detect attack", note: "" },
  { label: "feat: hurtbox hitbox damage particle", note: "" },
  { label: "feat: added healthbar fr this time", note: "" },
  { label: "feat: added audio sound for hitting", note: "" },
  { label: "feat: final game", note: "Submitted." },
];

const TEAM = [
  { name: "Dimas Gistha Adnyana", role: "Art direction" },
  { name: "Shafa Kirana Mulia", role: "Art & character design" },
  { name: "Muhammad Iqbal Shafarel", role: "Illustration & animation" },
  { name: "Farrell Reynard Jechoniah Simarmarta", role: "Frame & UI" },
  { name: "Rogelio Kenny Arisandi", role: "Development" },
  { name: "Ralfazza Rajariandhana", role: "Development" },
];

function Awan({ src, className, duration, drift }) {
  return (
    <motion.img
      src={src}
      alt=""
      className={`pointer-events-none absolute select-none opacity-70 ${className}`}
      animate={{ x: [0, drift, 0], y: [0, -10, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function AshesOfAlengka() {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroLift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    const done = setTimeout(() => setLoading(false), LOADING_DURATION);
    return () => clearTimeout(done);
  }, []);

  return (
    <main className="flex w-full flex-col bg-alengka-night font-jakarta text-base text-alengka-cream lg:text-lg">
      {/* the lamp coming up before the show */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-alengka-night px-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute h-[300px] w-[520px] rounded-[50%] bg-alengka-flame/30 blur-[120px]"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.5, 0.3, 0.9], scale: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            <motion.img
              src="/projects/ashes-of-alengka/title-logo.png"
              alt="Ashes of Alengka"
              className="relative w-64 sm:w-96"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.15, 1] }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="alengka-kelir relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6"
        >
          <Link
            to="/projects"
            className="absolute left-6 top-6 z-20 flex items-center gap-2 text-sm text-alengka-cream/45 transition-colors hover:text-alengka-cream sm:left-10"
          >
            <FaAnglesLeft className="text-xs" />
            <span>Back to Projects</span>
          </Link>

          <div className="alengka-flicker pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-alengka-flame/20 blur-[150px]" />

          <Awan src="/projects/ashes-of-alengka/awan-1.png" className="left-[4%] top-[14%] w-40 sm:w-64" duration={13} drift={40} />
          <Awan src="/projects/ashes-of-alengka/awan-2.png" className="right-[6%] top-[10%] w-32 sm:w-52" duration={17} drift={-34} />
          <Awan src="/projects/ashes-of-alengka/awan-3.png" className="right-[16%] bottom-[26%] w-28 sm:w-44" duration={21} drift={26} />

          <motion.div
            style={{ opacity: heroFade, y: heroLift }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <motion.img
              src="/projects/ashes-of-alengka/title-logo.png"
              alt="Ashes of Alengka"
              className="w-72 sm:w-[30rem] lg:w-[38rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            />

            <motion.p
              className="max-w-xl text-center text-alengka-cream/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              A local multiplayer shadow-puppet fighting game, built in Godot over
              a 48 hour jam weekend. Two players share one controller, the way two
              hands share one dalang.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <span className="rounded-full border border-alengka-gold/60 bg-alengka-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-alengka-gold">
                Best Story / Art &middot; UQCS Game Jam 2026
              </span>
              <span className="rounded-full border border-alengka-cream/15 px-4 py-1.5 text-xs text-alengka-cream/50">
                Godot 4 &middot; GDScript
              </span>
            </motion.div>
          </motion.div>

          <DalangShadow className="absolute bottom-0 left-1/2 h-[22vh] w-[70vw] -translate-x-1/2 sm:w-[42vw] lg:w-[32vw]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-alengka-night" />

          <motion.span
            className="absolute bottom-8 z-10 text-xs uppercase tracking-[0.3em] text-alengka-cream/30"
            animate={{ opacity: [0.25, 0.8, 0.25] }}
            transition={{ duration: 2.6, repeat: Infinity }}
          >
            scroll
          </motion.span>
        </section>

        {/* ── Four hours before ────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-alengka-night py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-3xl flex-col gap-5 px-6">
            <span className="alengka-eyebrow">01 &middot; Before anything existed</span>
            <h2 className="alengka-heading">A team that met four hours before the jam</h2>
            <p className="text-justify text-alengka-cream/75">
              There was no plan. We put the team together about four hours before
              the UQ Computing Society Game Jam actually started, six of us. The first
              idea on the table was a soulslike, which is roughly the least
              sensible thing you can attempt in 48 hours.
            </p>
            <p className="text-justify text-alengka-cream/75">
              We dropped it and asked a better question: what do we already know
              that nobody else at this jam is going to make? The answer was sitting
              in all of our childhoods. Wayang kulit, the Javanese shadow puppet
              theatre, where one puppeteer works a whole cast of leather puppets
              against a lamp-lit cloth screen and narrates an epic until sunrise.
            </p>
          </AppearSection>
        </section>

        {/* ── Why Alengka ──────────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-linear-to-b from-alengka-night to-alengka-ink py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-5xl flex-col items-center gap-10 px-6 lg:flex-row lg:gap-16">
            <div className="flex shrink-0 items-end justify-center gap-4">
              <motion.img
                src="/projects/ashes-of-alengka/anoman-body.png"
                alt="Anoman, the white monkey"
                className="h-44 w-auto object-contain sm:h-60"
                animate={{ rotate: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "50% 100%" }}
              />
              <motion.img
                src="/projects/ashes-of-alengka/dasamuka-body.png"
                alt="Dasamuka, the ten-faced king"
                className="h-40 w-auto -scale-x-100 object-contain sm:h-56"
                animate={{ rotate: [5, -3, 5] }}
                transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "50% 100%" }}
              />
            </div>

            <div className="flex flex-col gap-5">
              <span className="alengka-eyebrow">02 &middot; The story</span>
              <h2 className="alengka-heading">Anoman, Dasamuka, and a kingdom on fire</h2>
              <p className="text-justify text-alengka-cream/75">
                We took the fight everybody already knows from the Ramayana.
                Anoman, the white monkey, against Dasamuka, the ten-faced king of
                Alengka. In the story Anoman is captured and set alight, and he
                burns the kingdom down with his own tail. That is where the title
                comes from, and it is why there is fire in every single frame of
                this game.
              </p>
              <p className="text-justify text-alengka-cream/75">
                Choosing a story everyone on the team grew up with meant nobody had
                to be briefed. The artists knew what the characters looked like,
                what the cloud motifs meant, what the frame around a wayang screen
                is supposed to be. That saved us hours we did not have.
              </p>
            </div>
          </AppearSection>
        </section>

        {/* ── The pivot ────────────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-alengka-ink py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-3xl flex-col gap-6 px-6">
            <span className="alengka-eyebrow">03 &middot; The pivot</span>
            <h2 className="alengka-heading">Seventeen hours out, the game was not working</h2>
            <p className="text-justify text-alengka-cream/75">
              The original build had a player and an enemy and physics and none of
              it was fun. With well under a day left we stopped adding and asked
              what the puppets were actually good at. They are held on sticks. They
              lean. They flail. That is a fighting game, not a platformer.
            </p>
            <p className="text-justify text-alengka-cream/75">
              The commit where that decision landed is still in the history, and we
              did not pick a graceful name for it.
            </p>

            <div className="alengka-panel alengka-mono mt-2 flex flex-col gap-1 p-5 text-sm">
              {TIMELINE.map((entry, index) => (
                <motion.div
                  key={entry.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className={`flex flex-col gap-0.5 border-l-2 py-1.5 pl-4 ${
                    entry.pivot
                      ? "border-alengka-flame"
                      : "border-alengka-gold/15"
                  }`}
                >
                  <span
                    className={
                      entry.pivot
                        ? "font-bold text-alengka-flame"
                        : "text-alengka-cream/65"
                    }
                  >
                    {entry.label}
                  </span>
                  {entry.note && (
                    <span className="font-jakarta text-xs text-alengka-cream/35 [font-family:var(--font-jakarta)]">
                      {entry.note}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </AppearSection>
        </section>

        {/* ── One controller ───────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-alengka-ink py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-3xl flex-col gap-6 px-6">
            <span className="alengka-eyebrow">04 &middot; Design decision</span>
            <h2 className="alengka-heading">One controller, split down the middle</h2>
            <p className="text-justify text-alengka-cream/75">
              A dalang works two puppets with two hands. So we gave two players one
              controller and cut it in half. Player one holds the left grip and
              owns the left analog stick and the d-pad. Player two holds the right
              grip and owns the right stick and the face buttons. You end up
              shoulder to shoulder with the person you are trying to beat, elbowing
              each other over a single pad.
            </p>
            <p className="text-justify text-alengka-cream/75">
              Tilting the stick does not move a character sprite around a level. It
              leans the puppet, holds the lean for half a second, then lets it fall
              back upright, exactly like tipping a rod.
            </p>
            <SharedController />
          </AppearSection>
        </section>

        {/* ── 2D in 3D ─────────────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-linear-to-b from-alengka-ink to-alengka-night py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-3xl flex-col gap-6 px-6">
            <span className="alengka-eyebrow">05 &middot; Design decision</span>
            <h2 className="alengka-heading">A 2D fighter built inside a 3D stage</h2>
            <p className="text-justify text-alengka-cream/75">
              This is the trick the whole look hangs on. The fight is a completely
              ordinary 2D scene. It is rendered into a SubViewport, and that
              viewport texture is then painted onto a flat quad standing inside a
              3D world. Everything else in the shot is real geometry in that world:
              the cloth, the fog, the clouds, the fire, the puppeteer.
            </p>
            <p className="text-justify text-alengka-cream/75">
              It means we got depth, volumetric haze and a camera that can drift,
              without ever having to write a 3D fighting game. Drag the slider to
              pull the scene apart.
            </p>
            <KelirStack />
          </AppearSection>
        </section>

        {/* ── The rig ──────────────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-alengka-night py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-3xl flex-col gap-6 px-6">
            <span className="alengka-eyebrow">06 &middot; The unique bit</span>
            <h2 className="alengka-heading">The arms are not animated at all</h2>
            <p className="text-justify text-alengka-cream/75">
              Only the body is keyframed. Each arm is two rigid bodies hanging off
              the puppet on pin joints, shoulder to forearm to elbow to hand, with
              a small animatable anchor that chases the shoulder position every
              frame so the joint has something real to hold on to. When the body
              tilts, the arms get dragged along and then keep going.
            </p>
            <p className="text-justify text-alengka-cream/75">
              Letting the simulation do the work looked more like a real puppet
              than anything we could have posed by hand, so the tuning went into
              the damping rather than into keyframes. It also means no two swings
              ever land quite the same way.
            </p>
            <PuppetRig />
          </AppearSection>
        </section>

        {/* ── Combat ───────────────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-alengka-night py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-3xl flex-col gap-6 px-6">
            <span className="alengka-eyebrow">07 &middot; Under the hood</span>
            <h2 className="alengka-heading">Three small enums instead of a pile of booleans</h2>
            <p className="text-justify text-alengka-cream/75">
              A fighter tracks three independent things: whether it is alive,
              whether it is leaning, and where it is in the attack cycle. Splitting
              them meant a dying puppet mid-lean mid-cooldown was never an
              undefined case, which matters a lot when you are writing code at four
              in the morning.
            </p>
            <p className="text-justify text-alengka-cream/75">
              The hit detection is deliberately blunt. The hitbox is an area with
              monitoring switched off, turned on only for the duration of the
              swing and off again the instant it ends. No frame data, no cancels.
              A hundred health each, ten damage a hit, two seconds before you can
              swing again, and an indicator above your head that dims so you can
              see it.
            </p>
            <CombatLoop />
          </AppearSection>
        </section>

        {/* ── Details ──────────────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-linear-to-b from-alengka-night to-alengka-ink py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-3xl flex-col gap-6 px-6">
            <span className="alengka-eyebrow">08 &middot; The small stuff</span>
            <h2 className="alengka-heading">Things nobody asked for</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  title: "The camera is never still",
                  body: "A handheld jitter script on the 3D root, layered sine waves at different frequencies. Sub-millimetre, but it stops the shot from feeling like a screenshot.",
                },
                {
                  title: "Every cloud has its own phase",
                  body: "Each awan gets a random starting offset when it spawns, so they drift and bob independently instead of sliding in formation.",
                },
                {
                  title: "Three different hit sounds",
                  body: "Picked at random on every connection, because one sample repeated forty times in a round is unbearable.",
                },
                {
                  title: "The dalang is in frame",
                  body: "His shadow sits closest to the camera and covers the bottom of the screen, exactly where your view would be blocked at a real performance.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  className="alengka-panel flex flex-col gap-2 p-5 transition-colors duration-300 hover:border-alengka-gold/60"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <span className="font-bold text-alengka-gold">{item.title}</span>
                  <span className="text-sm text-alengka-cream/65">{item.body}</span>
                </motion.div>
              ))}
            </div>
          </AppearSection>
        </section>

        {/* ── Screenshots ──────────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-alengka-ink py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-4xl flex-col gap-6 px-6">
            <span className="alengka-eyebrow">09 &middot; The game</span>
            <h2 className="alengka-heading">Screenshots</h2>
            <ShotGallery />
          </AppearSection>
        </section>

        {/* ── Result ───────────────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-alengka-ink py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-3xl flex-col items-center gap-6 px-6">
            <span className="alengka-eyebrow">10 &middot; The result</span>
            <h2 className="alengka-heading text-center">Best Story / Art</h2>
            <p className="text-center text-alengka-cream/75">
              We won the story and art category. The part I keep thinking about is
              that the thing the judges responded to was the thing we nearly did
              not make. A soulslike would have been a worse game and a much worse
              story, and we only found this one because we ran out of time and had
              to be honest about what we were good at.
            </p>

            <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              {TEAM.map((member) => (
                <motion.div
                  key={member.name}
                  className="alengka-panel flex flex-col p-4"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -3 }}
                >
                  <span className="text-sm text-alengka-cream/85">{member.name}</span>
                  <span className="text-xs text-alengka-amber/70">{member.role}</span>
                </motion.div>
              ))}
            </div>

            <p className="mt-2 text-center text-xs italic text-alengka-cream/35">
              Team name, as submitted: &ldquo;the team that if we win, we will cut
              kenny&rsquo;s hair&rdquo;.
            </p>
          </AppearSection>
        </section>

        {/* ── After ────────────────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-alengka-ink py-20 sm:py-28">
          <AppearSection className="flex w-full max-w-3xl flex-col gap-6 px-6">
            <span className="alengka-eyebrow">11 &middot; After the jam</span>
            <h2 className="alengka-heading">I kept going back to it</h2>
            <p className="text-justify text-alengka-cream/75">
              Jam code is jam code, and this one had a to-do list sitting in the
              README. Over the following weeks I went back and gave it a proper
              main menu, a pause menu, a win screen and game over flow, the attack
              cooldown indicator, and finally pulled the fighter apart into the
              state machine it should have been from the start.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={PLAY_LINK}
                target="_blank"
                className="flex items-center gap-2 rounded-full bg-alengka-flame px-6 py-2.5 text-sm font-semibold text-alengka-night transition-all duration-300 hover:scale-105 hover:bg-alengka-amber"
              >
                Play it in the browser
                <LuExternalLink />
              </Link>
              <Link
                to={REPO_LINK}
                target="_blank"
                className="flex items-center gap-2 rounded-full border border-alengka-gold/40 px-6 py-2.5 text-sm font-semibold text-alengka-gold transition-all duration-300 hover:border-alengka-gold hover:bg-alengka-gold/10"
              >
                Repository
                <LuExternalLink />
              </Link>
            </div>
            <p className="text-xs text-alengka-cream/35">
              Two players and a gamepad is the way it is meant to be played. On a
              keyboard, player one is WASD and C, player two is IJKL and N.
            </p>
          </AppearSection>
        </section>

        {/* ── Closing ──────────────────────────────────────────────── */}
        <section className="flex w-full justify-center bg-alengka-night pb-20 pt-16 sm:pb-28">
          <AppearSection className="flex flex-col items-center gap-6 px-6">
            <img
              src="/projects/ashes-of-alengka/title-logo.png"
              alt="Ashes of Alengka"
              className="w-52 opacity-40 transition-opacity duration-500 hover:opacity-90 sm:w-72"
            />
            <Link
              to="/projects"
              className="flex items-center gap-2 text-sm text-alengka-cream/40 transition-colors hover:text-alengka-cream"
            >
              <FaAnglesLeft className="text-xs" />
              <span>Back to Projects</span>
            </Link>
          </AppearSection>
        </section>
      </motion.div>
    </main>
  );
}
