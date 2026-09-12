import { Link } from "react-router";
import { motion } from "motion/react";
import { FaAnglesLeft } from "react-icons/fa6";
import { LuArrowRight, LuExternalLink, LuGithub } from "react-icons/lu";
import {
  SiAxios,
  SiBun,
  SiFramer,
  SiGo,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import AppearSection from "../../AppearSection.jsx";
import PhoneFrame from "./PhoneFrame.jsx";
import Hero from "./Hero.jsx";
import NameStatement from "./NameStatement.jsx";
import ScreenShowcase from "./ScreenShowcase.jsx";
import RotatorDiagram from "./RotatorDiagram.jsx";
import StreamDemo from "./StreamDemo.jsx";
import KeyboardDemo from "./KeyboardDemo.jsx";
import AgentIcons from "./AgentIcons.jsx";
import VibeCodedDemo from "./VibeCodedDemo.jsx";
import InitialPrompt from "./InitialPrompt.jsx";
import { LIVE_URL, REPO_URL, GEMINI_PROGRAM_URL } from "./links.js";

const CLAUDE_CODE_URL = "https://claude.com/claude-code";

const ALLOWED_LIBS = [
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "React Router", Icon: SiReactrouter },
  { name: "TanStack Query", Icon: SiReactquery },
  { name: "axios", Icon: SiAxios },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "Go", Icon: SiGo },
  { name: "Bun", Icon: SiBun },
];

const PALETTE = [
  { name: "Background", hex: "#FFFFFF", swatch: "bg-white border-tomo-line" },
  { name: "Tomo", hex: "#2563EB", swatch: "bg-tomo-blue border-tomo-blue" },
  { name: "You", hex: "#F97316", swatch: "bg-tomo-orange border-tomo-orange" },
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
  return (
    <main className="flex w-full flex-col bg-white font-jakarta text-[15px] text-tomo-ink lg:text-base">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── Name ───────────────────────────────────────────────────────── */}
      <NameStatement />

      {/* ── Why ────────────────────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-white py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-3xl flex-col gap-6 px-6 sm:px-10">
          <SectionTitle ja="問題">
            The <span className="text-tomo-blue">problem</span> I have
          </SectionTitle>

          <p className="text-justify leading-relaxed text-tomo-slate">
            I love Japan's culture, I have been learning Japanese for a while
            now, I even hit a year streak at Duolingo during the pandemic.
          </p>

          {/* the work was getting done — that is what makes the freeze sting */}
          <div className="mt-2 flex flex-col items-center gap-5 sm:flex-row sm:items-stretch">
            <div className="flex w-40 shrink-0 flex-col items-center gap-2 sm:w-48">
              <motion.img
                src="/projects/tomo/duolingo-score.png"
                alt="A 365 day Duolingo streak"
                className="w-full rounded-2xl border border-tomo-line object-contain"
                initial={{ rotate: -3 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              />
              <span className="text-center text-[11px] leading-snug text-tomo-slate/70">
                A year without missing a day
              </span>
            </div>

            <Link
              to="/projects/studykanji"
              className="tomo-card tomo-card-hover group flex flex-1 flex-col justify-center gap-2"
              target="_blank"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-tomo-blue">
                前作
              </span>
              <h3 className="text-base font-bold leading-snug">StudyKanji</h3>
              <p className="text-[13px] leading-relaxed text-tomo-slate">
                Before Tomo I built a kanji learning site for myself and my
                friends. The website was simple and it fullfilled it's purpose
                to make me quicker at recognising characters.
              </p>
              <span className="font-light text-tomo-slate text-xs">
                (it's an old project, very broken, back then I only know HTML
                CSS JS)
              </span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-tomo-blue">
                See the project
                <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <p className="text-justify leading-relaxed text-tomo-slate">
            Earlier this year I went to Japan with a couple of my friends. I was
            ordering at a katsu place, the staff asked me what to order... yet I
            froze. I knew what the staff meant but I just couldn't put an answer
            together. It was quite embarrassing, I end up just pointing through
            the menu.
          </p>

          <p className="text-justify leading-relaxed text-tomo-slate">
            Knowing the words and producing a sentence under time pressure are
            different skills, and I have only been training one of them. The
            main purpose Tomo was built is to have a chatting partner for me and
            anyone to practice their Japanese by having natural conversations.
          </p>
        </AppearSection>
      </section>

      {/* ── Screen showcase ───────────────────────────────────────────── */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-6xl flex-col items-center gap-10 px-6 sm:px-10">
          <div className="flex max-w-3xl flex-col items-center text-center">
            <SectionTitle ja="機能">Features</SectionTitle>
          </div>

          <ScreenShowcase />
        </AppearSection>
      </section>

      {/* ── Chapter break: product above, engineering below ───────────── */}
      <section className="flex w-full justify-center bg-tomo-ink py-20 sm:py-24">
        <AppearSection className="flex w-full max-w-3xl flex-col items-center gap-5 px-6 text-center sm:px-10">
          <span className="text-[11px] font-semibold tracking-[0.35em] text-tomo-blue">
            技術
          </span>

          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            Technical Aspects
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="h-px w-16 origin-center bg-white/25 sm:w-24"
          />

          <p className="max-w-xl leading-relaxed text-white/60">
            Following sections go behind the scenes: the design choices, the
            backend architecture, and the story of how it got built.
          </p>
        </AppearSection>
      </section>

      {/* ── First time with an agent ──────────────────────────────────── */}
      <section className="flex w-full justify-center bg-white py-20 sm:py-28">
        <AppearSection className="flex w-full max-w-3xl flex-col gap-6 px-6 sm:px-10">
          <SectionTitle ja="初めて">
            My first time using an{" "}
            <span className="text-tomo-blue">AI agent</span>
          </SectionTitle>

          <p className="text-justify leading-relaxed text-tomo-slate">
            I was sceptical of agentic AI tools for a long time. The worry was
            that leaning on one would make me lazier and, eventually, worse at
            the job.
          </p>

          <p className="text-justify leading-relaxed text-tomo-slate">
            Then one day I felt genuine FOMO watching friends work in Claude,
            Codex and Cursor while I was still copying and pasting out of
            ChatGPT like a Neanderthal. So I decided to try the thing before
            judging it, and subscribed to{" "}
            <Link
              to={CLAUDE_CODE_URL}
              target="_blank"
              className="inline-flex items-center gap-1 font-semibold text-tomo-blue hover:underline hover:underline-offset-2"
            >
              Claude Code
              <LuExternalLink className="inline" />
            </Link>
            .
          </p>

          <AgentIcons />
        </AppearSection>
      </section>

      {/* ── Not another vibe coded app ────────────────────────────────── */}
      <section className="flex w-full justify-center bg-white pb-20 sm:pb-28">
        <AppearSection className="flex w-full max-w-4xl flex-col gap-8 px-6 sm:px-10">
          <div className="flex max-w-2xl flex-col gap-5">
            <SectionTitle ja="指示">
              I didn't want another{" "}
              <span className="text-tomo-blue">vibe coded</span> app
            </SectionTitle>

            <p className="text-justify leading-relaxed text-tomo-slate">
              Having worked as a full stack developer, I know I could make it
              not be another vibe coded app by giving it specific prompts.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="tomo-card tomo-card-hover flex flex-col gap-3"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-tomo-blue">
                技術
              </span>
              <h3 className="text-base font-bold">Tech stack</h3>
              <p className="text-[13px] leading-relaxed text-tomo-slate">
                I restricted what it was allowed to install, listing only
                libraries I had already used and understood, and I set the
                directory structure myself.
              </p>

              <div className="mt-1 flex flex-wrap gap-1.5">
                {ALLOWED_LIBS.map(({ name, Icon }) => (
                  <span
                    key={name}
                    className="flex items-center gap-1.5 rounded-full border border-tomo-line px-2.5 py-1 text-[11px] font-semibold text-tomo-slate transition-all duration-200 hover:-translate-y-0.5 hover:border-tomo-blue hover:text-tomo-blue"
                  >
                    <Icon className="text-sm" />
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="tomo-card tomo-card-hover flex flex-col gap-3"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-tomo-blue">
                配色
              </span>
              <h3 className="text-base font-bold">Design</h3>
              <p className="text-[13px] leading-relaxed text-tomo-slate">
                I only want to use 2-3 colors with white for clean background.
                Two or three colours and no more, with white doing the
                background. I also named what to avoid like gradients and emoji.
              </p>

              <div className="mt-1 flex flex-col gap-2">
                {PALETTE.map(({ name, hex, swatch }) => (
                  <div key={hex} className="flex items-center gap-2.5">
                    <span
                      className={`size-6 shrink-0 rounded-lg border ${swatch}`}
                    />
                    <span className="tomo-mono text-[11px] font-semibold text-tomo-ink">
                      {hex}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <VibeCodedDemo />

          <InitialPrompt />
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
              have to guess. Flashcard mode shipped alongside it: the card shows
              a kanji, you say the meaning out loud, and only then do you tap to
              check yourself.
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
              transition={{
                duration: 6.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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
            typed. I still use it to practise, which is the only review I trust.
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
