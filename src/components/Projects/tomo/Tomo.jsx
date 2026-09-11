import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { FaAnglesLeft } from "react-icons/fa6";
import { LuExternalLink, LuGithub } from "react-icons/lu";

import AppearSection from "../../AppearSection.jsx";
import PhoneFrame from "./PhoneFrame.jsx";
import ScreenShowcase from "./ScreenShowcase.jsx";
import RotatorDiagram from "./RotatorDiagram.jsx";
import StreamDemo from "./StreamDemo.jsx";
import KeyboardDemo from "./KeyboardDemo.jsx";

const LIVE_URL = "https://tomo.ralfazza.com";
const REPO_URL = "https://github.com/rajariandhana/tomo";
// TODO: the Google program the free Gemini API access came from.
// While this is empty the sentence renders as plain text instead of a dead link.
const GEMINI_PROGRAM_URL = "";

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

function SectionTitle({ children, ja }) {
  return (
    <div className="flex w-full flex-col gap-1">
      {ja && (
        <span className="text-xs font-semibold tracking-[0.2em] text-tomo-blue">
          {ja}
        </span>
      )}
      <h2 className="text-2xl font-black leading-tight text-tomo-ink lg:text-4xl">
        {children}
      </h2>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="flex flex-1 flex-col gap-1 rounded-2xl border border-tomo-line bg-white px-4 py-4"
    >
      <span className="text-2xl font-black text-tomo-blue lg:text-3xl">
        {value}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-tomo-slate">
        {label}
      </span>
    </motion.div>
  );
}

export default function Tomo() {
  const hero_ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: hero_ref,
    offset: ["start start", "end start"],
  });

  const phone_y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const kanji_y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const kanji_opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="flex w-full flex-col bg-white font-jakarta text-[15px] text-tomo-ink lg:text-base">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
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
                className="h-12 w-auto object-contain transition-transform duration-300 hover:rotate-3 hover:scale-110 sm:h-14"
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
              Learn Japanese by
              <br />
              <span className="text-tomo-blue">actually talking</span> to
              <br />
              someone.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="max-w-lg text-justify leading-relaxed text-tomo-slate"
            >
              Tomo is a mobile-first web app that drops you into a five-turn
              Japanese conversation with an AI tutor. Pick a topic, it opens the
              conversation, and you reply however you can. The English
              translation stays hidden until you ask for it.
            </motion.p>

            <motion.div
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
            </motion.div>

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

      {/* ── Why ────────────────────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-white py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-3xl flex-col gap-6 px-6 sm:px-10">
          <SectionTitle ja="はじまり">
            Every app I tried taught me <span className="text-tomo-blue">words</span>,
            not conversation
          </SectionTitle>

          <p className="text-justify leading-relaxed text-tomo-slate">
            I had been learning Japanese the way most people do, by grinding
            vocabulary in an app that rewards streaks. It works right up until
            someone actually speaks to you. Recognising 友 on a flashcard and
            producing a sentence under time pressure are different skills, and
            only one of them was being trained.
          </p>

          <p className="text-justify leading-relaxed text-tomo-slate">
            So Tomo has no streaks, no lesson tree, and no vocabulary lists on
            the way in. You choose a topic and the AI says the first thing.
            From that point the only way forward is to reply. That single
            constraint drove almost every decision that follows.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Stat value="5" label="turns per session" />
            <Stat value="24" label="model slots" />
            <Stat value="2" label="colours, no gradients" />
            <Stat value="1" label="Go codebase, two targets" />
          </div>
        </AppearSection>
      </section>

      {/* ── Screen showcase ───────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-6xl flex-col items-center gap-10 px-6 sm:px-10">
          <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
            <SectionTitle ja="画面">
              Eleven screens, one thumb
            </SectionTitle>
            <p className="text-justify leading-relaxed text-tomo-slate sm:text-center">
              Tomo was designed at 390 by 844 and never at a desktop width.
              Every screenshot below is the real deployed app, captured at that
              exact viewport.
            </p>
          </div>

          <ScreenShowcase />
        </AppearSection>
      </section>

      {/* ── Design decisions ──────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-white py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-5xl flex-col gap-10 px-6 sm:px-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionTitle ja="デザイン">
              Rules I gave myself before writing any CSS
            </SectionTitle>
            <p className="text-justify leading-relaxed text-tomo-slate">
              Language apps tend to look like toys, all mascots and confetti. I
              wanted Tomo to feel like a calm room with one friend in it, so I
              wrote the constraints down first and held to them.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                ja: "二色",
                title: "Two colours, no gradients",
                body: "Blue for Tomo, orange for you, white for everything else. No gradients and no emoji anywhere in the interface. With only two colours available, blue came to mean the AI and orange came to mean your turn, without a legend.",
              },
              {
                ja: "札",
                title: "Topics as playing cards",
                body: "The first build showed topics as wide rows. They read as a settings menu. Reshaping them to a 3:4 portrait card made the same list feel like a hand you draw from, which is the mood the app wanted.",
              },
              {
                ja: "翻訳",
                title: "Translation behind a tap",
                body: "Showing the English next to the Japanese means nobody reads the Japanese. Hiding it behind Show translation makes the effort the default and the shortcut a choice.",
              },
              {
                ja: "五回",
                title: "A session that ends",
                body: "Five user turns and the conversation closes deliberately. A free session that trails off into a rate-limit error feels broken. One that ends on Thanks for trying out Tomo feels finished.",
              },
              {
                ja: "待機",
                title: "A wait worth keeping",
                body: "The four opening lines are prebuilt, so they could appear instantly. They do not. A short typing indicator plays first, because a reply that lands before you can look up reads as canned.",
              },
              {
                ja: "正直",
                title: "An honest paywall",
                body: "The Pro tab lists what a paid tier would unlock and labels the button coming soon. Shipping a real-looking checkout that cannot take money would be the only dishonest screen in the app.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="tomo-card tomo-card-hover flex flex-col gap-2"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-tomo-blue">
                  {card.ja}
                </span>
                <h3 className="text-base font-bold leading-snug">
                  {card.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-tomo-slate">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </AppearSection>
      </section>

      {/* ── Rotator ───────────────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-5xl flex-col gap-8 px-6 sm:px-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionTitle ja="仕組み">
              The part I am most pleased with:{" "}
              <span className="text-tomo-blue">24 ways to answer</span>
            </SectionTitle>
            <p className="text-justify leading-relaxed text-tomo-slate">
              I was building this with no budget, which meant a free tier or
              nothing. The one model I could reach was Gemini, through{" "}
              {GEMINI_PROGRAM_URL ? (
                <Link
                  to={GEMINI_PROGRAM_URL}
                  target="_blank"
                  className="inline-flex items-center gap-1 font-semibold text-tomo-blue hover:underline hover:underline-offset-2"
                >
                  a Google program that gave me the API for free
                  <LuExternalLink className="inline" />
                </Link>
              ) : (
                "a Google program that gave me the API for free"
              )}
              . Every constraint in this section comes from that one fact.
            </p>

            <p className="text-justify leading-relaxed text-tomo-slate">
              I had shipped things on the Gemini API before, and they hit their
              limits constantly. For a side project that was an annoyance. For a
              chat app it is fatal: the entire product is one request per
              message, so availability is not a nice-to-have, it is the feature.
              So instead of guessing, I sat down and actually read the API
              documentation properly for the first time.
            </p>

            <p className="text-justify leading-relaxed text-tomo-slate">
              What I found was that the limits are scoped per project and per
              model, and that I had far more of both than I was using. That
              turned into the question the whole backend is built on:{" "}
              <span className="font-semibold text-tomo-ink">
                what if every prompt switched to a different model and a
                different project key, cycling through them to push the uptime
                up?
              </span>{" "}
              I allocated four projects, gave each access to six models, and
              suddenly there were 24 places a single message could go.
            </p>

            <motion.aside
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="my-2 border-l-2 border-tomo-blue py-1 pl-5"
            >
              <p className="text-justify leading-relaxed text-tomo-slate">
                Neither half of this was my invention. Round-robin is the
                scheduler from my{" "}
                <span className="font-semibold text-tomo-ink">
                  Operating Systems
                </span>{" "}
                class, and cycling requests across healthy nodes while retrying
                past the dead ones is what{" "}
                <span className="font-semibold text-tomo-ink">
                  Computer Networks
                </span>{" "}
                spends a semester on. I had been taught the answer before I had
                the problem, and I only recognised it once the app started
                failing on me.
              </p>
            </motion.aside>

            <p className="text-justify leading-relaxed text-tomo-slate">
              The reason this works at all is the subject matter. Tomo talks
              about food, travel, introductions, the kind of everyday
              conversation where there is no single correct reply. Swapping
              models mid-conversation would wreck an app that needed consistent
              reasoning or a house voice. Here the answer is just as good
              whichever model produces it, so the rotation costs nothing in
              quality.
            </p>

            <p className="text-justify leading-relaxed text-tomo-slate">
              In code it is an atomic counter handing out the next slot per
              request, and a retriable failure advancing to the next slot rather
              than surfacing an error. Only when all 24 refuse does the user see
              anything, and what they see is a message written in both Japanese
              and English.
            </p>
          </div>

          <RotatorDiagram />

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Retriable, not all errors",
                body: "Only 503, 429, UNAVAILABLE, RESOURCE_EXHAUSTED and INTERNAL advance the rotation. A malformed request would otherwise burn all 24 slots to reach the same failure.",
              },
              {
                title: "Thinking budget zero",
                body: "Reasoning tokens cost latency Tomo has no use for. Two of the six models reject the thinking config outright, so each slot records whether it accepts one.",
              },
              {
                title: "Retry before the first byte",
                body: "The streaming route pulls the first chunk manually and inspects it before writing any SSE bytes, so a dead model can still be swapped out mid-request.",
              },
            ].map((c) => (
              <motion.div
                key={c.title}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="tomo-card tomo-card-hover flex flex-col gap-2"
              >
                <h3 className="text-sm font-bold">{c.title}</h3>
                <p className="text-[13px] leading-relaxed text-tomo-slate">
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </AppearSection>
      </section>

      {/* ── Streaming ─────────────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-white py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-4xl flex-col gap-8 px-6 sm:px-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionTitle ja="速さ">
              Making it feel fast without making it fast
            </SectionTitle>
            <p className="text-justify leading-relaxed text-tomo-slate">
              A Gemini reply takes a couple of seconds. I could not shrink that,
              so I stopped trying and changed when the user sees it instead. The
              streaming route pushes each chunk over server-sent events as it
              arrives, then sends one final event carrying the finished Japanese
              and its English translation.
            </p>
          </div>

          <StreamDemo />
        </AppearSection>
      </section>

      {/* ── iOS keyboard ──────────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-4xl flex-col items-center gap-10 px-6 sm:px-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionTitle ja="不具合">
              The bug that only existed on a real iPhone
            </SectionTitle>
            <p className="text-justify leading-relaxed text-tomo-slate">
              Everything worked in the browser. Then I opened the app on my own
              phone, tapped the message box, and the entire interface slid
              upward off the top of the screen. iOS Safari pans the layout
              viewport when a fixed input takes focus, and no amount of dvh
              fixes it because dvh lags a keyboard animation it cannot see.
            </p>
            <p className="text-justify leading-relaxed text-tomo-slate">
              The fix was to stop trusting CSS units and subscribe to
              window.visualViewport directly, pinning the conversation to the
              height and offset that are genuinely visible. Tap the button to
              watch both versions react to the same keyboard.
            </p>
          </div>

          <KeyboardDemo />
        </AppearSection>
      </section>

      {/* ── Voice ─────────────────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-white py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-5xl flex-col items-center gap-10 px-6 sm:px-10 lg:flex-row lg:gap-16">
          <div className="flex w-full flex-col gap-4 lg:w-3/5">
            <SectionTitle ja="音声">
              Reading Japanese is not hearing Japanese
            </SectionTitle>
            <p className="text-justify leading-relaxed text-tomo-slate">
              Text alone teaches you to read, so every message from Tomo carries
              a speaker button that plays the line aloud through Gemini's
              text-to-speech model. The prompt is deliberately blunt: read this
              aloud exactly as written, no changes and no commentary.
            </p>
            <p className="text-justify leading-relaxed text-tomo-slate">
              Gemini hands back raw PCM samples rather than a playable file, so
              the backend assembles a RIFF header by hand, reading the sample
              rate out of the response's own mime type before wrapping the
              samples as mono 16-bit WAV. The four opening lines never hit that
              path at all. They are generated once by a small command in the
              repo and shipped as static files, which is also why the Japanese
              text in the frontend has to stay byte-for-byte identical to the
              text that generated the audio.
            </p>
            <p className="text-justify leading-relaxed text-tomo-slate">
              Audio is generated once per line and carried through to the end
              screen, so replaying a finished conversation never spends a second
              request.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-48 shrink-0 sm:w-56 lg:w-2/5 lg:max-w-[15rem]"
          >
            <motion.div
              animate={{ y: [-5, 5, -5], rotate: [2, 3.5, 2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ rotate: 0, scale: 1.04 }}
            >
              <PhoneFrame
                src="/projects/tomo/screens/conversation-history.png"
                alt="Reviewing a finished Tomo conversation"
              />
            </motion.div>
          </motion.div>
        </AppearSection>
      </section>

      {/* ── Architecture ──────────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-4xl flex-col gap-8 px-6 sm:px-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionTitle ja="構成">
              One Go codebase, two ways to run it
            </SectionTitle>
            <p className="text-justify leading-relaxed text-tomo-slate">
              I wanted Go on the backend and Vercel for hosting, which are not
              obviously compatible. The answer was to put every handler in a
              shared package and give it two thin entry points: a local server
              for development and one serverless function per route in
              production. The same code serves both, so a bug cannot exist in
              only one of them.
            </p>
            <p className="text-justify leading-relaxed text-tomo-slate">
              Serverless has no memory between invocations, so the backend keeps
              no conversation state at all. The client sends the full history
              with every message and the server counts the turns itself, which
              means the five-turn limit is enforced twice: once in the interface
              and once again in Go, where calling the API directly cannot get
              around it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                k: "POST /api/start",
                v: "Opens a conversation for a topic. Now mostly bypassed, since the four openers are prebuilt on the client.",
              },
              {
                k: "POST /api/send/stream",
                v: "The route the app actually uses. Chunk events carry the Japanese as it lands, then one done event carries the final pair.",
              },
              {
                k: "POST /api/send",
                v: "The non-streaming original, kept as a fallback. Asks Gemini for strict JSON with a ja and en field.",
              },
              {
                k: "POST /api/tts",
                v: "Turns one Japanese line into WAV audio, rotating across the same four projects.",
              },
            ].map((row) => (
              <motion.div
                key={row.k}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="tomo-card tomo-card-hover flex flex-col gap-2"
              >
                <span className="tomo-mono text-xs font-bold text-tomo-blue">
                  {row.k}
                </span>
                <p className="text-[13px] leading-relaxed text-tomo-slate">
                  {row.v}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-justify text-sm leading-relaxed text-tomo-slate">
            Getting there was less elegant than it sounds. Vercel would not
            build a Go package directory named internal, its framework detection
            had to be switched off by hand, the function globs needed listing
            explicitly, and the streaming route crashed in production because it
            assumed the response writer could always be flushed. None of that is
            visible in the finished app, which is rather the point.
          </p>
        </AppearSection>
      </section>

      {/* ── Kanji ─────────────────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-white py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-5xl flex-col items-center gap-10 px-6 sm:px-10 lg:flex-row-reverse lg:gap-16">
          <div className="flex w-full flex-col gap-4 lg:w-3/5">
            <SectionTitle ja="漢字">
              Something to do in two minutes
            </SectionTitle>
            <p className="text-justify leading-relaxed text-tomo-slate">
              A five-turn conversation asks for real attention, and there are
              plenty of moments when you do not have any to give. The kanji
              section exists for those moments. Matching mode deals five kanji
              against five meanings across five rounds, resolving pairs in place
              so a whole round never leaves the screen.
            </p>
            <p className="text-justify leading-relaxed text-tomo-slate">
              Levels run from N5 down to N1 in a single column, and the screen
              states plainly which end is easiest. JLPT numbering counts
              backwards, and a learner meeting it for the first time should not
              have to guess. A flashcard mode is still in progress.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-48 shrink-0 sm:w-56 lg:w-2/5 lg:max-w-[15rem]"
          >
            <motion.div
              animate={{ y: [4, -6, 4], rotate: [-2.5, -1, -2.5] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ rotate: 0, scale: 1.04 }}
            >
              <PhoneFrame
                src="/projects/tomo/screens/kanji-matching.png"
                alt="Tomo kanji matching mode"
              />
            </motion.div>
          </motion.div>
        </AppearSection>
      </section>

      {/* ── Closing ───────────────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-3xl flex-col items-center gap-6 px-6 text-center sm:px-10">
          <SectionTitle ja="これから">What Tomo taught me</SectionTitle>

          <p className="text-justify leading-relaxed text-tomo-slate sm:text-center">
            Most of the engineering in Tomo is not about the AI. It is about
            what happens when the AI is unavailable, when the reply is slow,
            when the keyboard opens, when the free tier says no. The model call
            itself is a dozen lines. Everything around it is the product.
          </p>

          <p className="text-justify leading-relaxed text-tomo-slate sm:text-center">
            Next is voice input, so a conversation can be spoken rather than
            typed, and finishing the flashcard mode. I still use it to practise,
            which is the only review I trust.
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link
              to={LIVE_URL}
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-tomo-blue px-5 py-2.5 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(37,99,235,0.85)] transition-all hover:-translate-y-0.5 hover:bg-tomo-blue-deep"
            >
              Have a conversation <LuExternalLink />
            </Link>
            <Link
              to={REPO_URL}
              target="_blank"
              className="flex items-center gap-2 rounded-full border border-tomo-line bg-white px-5 py-2.5 text-sm font-bold text-tomo-ink transition-all hover:-translate-y-0.5 hover:border-tomo-blue hover:text-tomo-blue"
            >
              <LuGithub /> Read the source
            </Link>
          </div>

          <span className="mt-2 text-sm italic text-tomo-slate/70">
            はじめまして。トモです。
          </span>

          <Link
            to="/projects"
            className="mt-4 flex items-center gap-2 text-xs text-tomo-slate transition-colors hover:text-tomo-blue"
          >
            <FaAnglesLeft className="text-[10px]" />
            <span>Back to Projects</span>
          </Link>
        </AppearSection>
      </section>
    </main>
  );
}
