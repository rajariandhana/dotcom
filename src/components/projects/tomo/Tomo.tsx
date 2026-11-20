"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
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

import { Appear } from "../Appear";
import { AgentIcons, CLAUDE_CODE_URL } from "./AgentIcons";
import { Hero } from "./Hero";
import { InitialPrompt } from "./InitialPrompt";
import { KeyboardDemo } from "./KeyboardDemo";
import { NameStatement } from "./NameStatement";
import { Palette } from "./Palette";
import { PhoneFrame } from "./PhoneFrame";
import { RotatorDiagram } from "./RotatorDiagram";
import { ScreenShowcase } from "./ScreenShowcase";
import { StreamDemo } from "./StreamDemo";
import { VibeCodedDemo } from "./VibeCodedDemo";
import { card, cardHover, inlineLink, primaryButton, secondaryButton, SectionTitle } from "./shared";

/*
 * The Tomo story page, ported from the previous (React + Vite) site: the
 * product first, then a "Technical Aspects" chapter with playable demos. It
 * keeps Tomo's own white/blue/orange look in both site themes.
 */

// The Google program the free Gemini API access came from. While empty, the
// sentence renders as plain text instead of a dead link.
const GEMINI_PROGRAM_URL = "";

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

const ENDPOINTS = [
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
  { k: "POST /api/tts", v: "Turns one Japanese line into WAV audio, rotating across the same four projects." },
];

const body = "text-justify leading-relaxed text-tomo-slate";
const eyebrow = "text-xs font-semibold tracking-[0.2em] text-tomo-blue";

/** A phone screenshot that rises in, then bobs and tilts gently. */
function FloatingPhone({
  src,
  alt,
  y,
  rotate,
  duration,
}: {
  src: string;
  alt: string;
  y: number[];
  rotate: number[];
  duration: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-48 shrink-0 @xl:w-56 @5xl:w-2/5 @5xl:max-w-[15rem]"
    >
      <motion.div
        animate={{ y, rotate }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ rotate: 0, scale: 1.04 }}
      >
        <PhoneFrame src={src} alt={alt} />
      </motion.div>
    </motion.div>
  );
}

export function Tomo({ demo, repo }: { demo?: string; repo?: string }) {
  return (
    <div className="flex w-full flex-col bg-white text-[15px] text-tomo-ink @5xl:text-base">
      <Hero demo={demo} repo={repo} />

      <NameStatement />

      {/* Why */}
      <section className="flex w-full justify-center bg-white py-20 @xl:py-28">
        <Appear className="flex w-full max-w-3xl flex-col gap-6 px-6 @xl:px-10">
          <SectionTitle ja="問題">
            The <span className="text-tomo-blue">problem</span> I have
          </SectionTitle>

          <p className={body}>
            I love Japan&apos;s culture, I have been learning Japanese for a while now, I even hit a year streak at
            Duolingo during the pandemic.
          </p>

          <div className="mt-2 flex flex-col items-center gap-5 @xl:flex-row @xl:items-stretch">
            <div className="flex w-40 shrink-0 flex-col items-center gap-2 @xl:w-48">
              <motion.div
                initial={{ rotate: -3 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Image
                  src="/projects/tomo/duolingo-score.png"
                  alt="A 365 day Duolingo streak"
                  width={640}
                  height={640}
                  className="w-full rounded-2xl border border-tomo-line object-contain"
                />
              </motion.div>
              <span className="text-center text-[11px] leading-snug text-tomo-slate/70">
                A year without missing a day
              </span>
            </div>

            <Link
              href="/projects/studykanji"
              className={`${card} ${cardHover} group flex flex-1 flex-col justify-center gap-2`}
            >
              <span lang="ja" className={eyebrow}>
                前作
              </span>
              <h3 className="text-base leading-snug font-bold">StudyKanji</h3>
              <p className="text-[13px] leading-relaxed text-tomo-slate">
                Before Tomo I built a kanji learning site for myself and my friends. The website was simple and it
                fullfilled it&apos;s purpose to make me quicker at recognising characters.
              </p>
              <span className="text-xs font-light text-tomo-slate">
                (it&apos;s an old project, very broken, back then I only know HTML CSS JS)
              </span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-tomo-blue">
                See the project
                <LuArrowRight aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <p className={body}>
            Earlier this year I went to Japan with a couple of my friends. I was ordering at a katsu place, the staff
            asked me what to order... yet I froze. I knew what the staff meant but I just couldn&apos;t put an answer
            together. It was quite embarrassing, I end up just pointing through the menu.
          </p>
          <p className={body}>
            Knowing the words and producing a sentence under time pressure are different skills, and I have only been
            training one of them. The main purpose Tomo was built is to have a chatting partner for me and anyone to
            practice their Japanese by having natural conversations.
          </p>
        </Appear>
      </section>

      {/* Screen showcase */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 @xl:py-28">
        <Appear className="flex w-full max-w-6xl flex-col items-center gap-10 px-6 @xl:px-10">
          <div className="flex max-w-3xl flex-col items-center text-center">
            <SectionTitle ja="機能">Features</SectionTitle>
          </div>
          <ScreenShowcase />
        </Appear>
      </section>

      {/* Chapter break: product above, engineering below */}
      <section className="flex w-full justify-center bg-tomo-ink py-20 @xl:py-24">
        <Appear className="flex w-full max-w-3xl flex-col items-center gap-5 px-6 text-center @xl:px-10">
          <span lang="ja" className="text-[11px] font-semibold tracking-[0.35em] text-tomo-blue">
            技術
          </span>
          <h2 className="text-3xl leading-tight font-black text-white @xl:text-4xl @5xl:text-5xl">Technical Aspects</h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="h-px w-16 origin-center bg-white/25 @xl:w-24"
          />
          <p className="max-w-xl leading-relaxed text-white/60">
            Following sections go behind the scenes: the design choices, the backend architecture, and the story of
            how it got built.
          </p>
        </Appear>
      </section>

      {/* First time with an agent */}
      <section className="flex w-full justify-center bg-white py-20 @xl:py-28">
        <Appear className="flex w-full max-w-3xl flex-col gap-6 px-6 @xl:px-10">
          <SectionTitle ja="初めて">
            My first time using an <span className="text-tomo-blue">AI agent</span>
          </SectionTitle>
          <p className={body}>
            I was sceptical of agentic AI tools for a long time. The worry was that leaning on one would make me lazier
            and, eventually, worse at the job.
          </p>
          <p className={body}>
            Then one day I felt genuine FOMO watching friends work in Claude, Codex and Cursor while I was still copying
            and pasting out of ChatGPT like a Neanderthal. So I decided to try the thing before judging it, and
            subscribed to{" "}
            <a href={CLAUDE_CODE_URL} target="_blank" rel="noopener noreferrer" className={inlineLink}>
              Claude Code
              <LuExternalLink aria-hidden className="inline" />
            </a>
            .
          </p>
          <AgentIcons />
        </Appear>
      </section>

      {/* Not another vibe coded app */}
      <section className="flex w-full justify-center bg-white pb-20 @xl:pb-28">
        <Appear className="flex w-full max-w-4xl flex-col gap-8 px-6 @xl:px-10">
          <div className="flex max-w-2xl flex-col gap-5">
            <SectionTitle ja="指示">
              I didn&apos;t want another <span className="text-tomo-blue">vibe coded</span> app
            </SectionTitle>
            <p className={body}>
              Having worked as a full stack developer, I know I could make it not be another vibe coded app by giving
              it specific prompts.
            </p>
          </div>

          <div className="grid gap-4 @xl:grid-cols-2">
            <div className={`${card} flex flex-col gap-3`}>
              <span lang="ja" className={eyebrow}>
                技術
              </span>
              <h3 className="text-base font-bold">Tech stack</h3>
              <p className="text-[13px] leading-relaxed text-tomo-slate">
                I restricted what it was allowed to install, listing only libraries I had already used and understood,
                and I set the directory structure myself.
              </p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {ALLOWED_LIBS.map(({ name, Icon }) => (
                  <li
                    key={name}
                    className="flex items-center gap-1.5 rounded-full border border-tomo-line px-2.5 py-1 text-[11px] font-semibold text-tomo-slate transition-all duration-200 hover:-translate-y-0.5 hover:border-tomo-blue hover:text-tomo-blue"
                  >
                    <Icon aria-hidden className="text-sm" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${card} flex flex-col gap-3`}>
              <span lang="ja" className={eyebrow}>
                配色
              </span>
              <h3 className="text-base font-bold">Design</h3>
              <p className="text-[13px] leading-relaxed text-tomo-slate">
                I only want to use 2-3 colors with white for a clean background. I also named what to avoid, like
                gradients and emoji.
              </p>
              <Palette />
            </div>
          </div>

          <VibeCodedDemo />
          <InitialPrompt />
        </Appear>
      </section>

      {/* Rotator */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 @xl:py-28">
        <Appear className="flex w-full max-w-5xl flex-col gap-8 px-6 @xl:px-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionTitle ja="仕組み">
              The part I am most pleased with: <span className="text-tomo-blue">24 ways to answer</span>
            </SectionTitle>
            <p className={body}>
              I was building this with no budget, which meant a free tier or nothing. The one model I could reach was
              Gemini, through{" "}
              {GEMINI_PROGRAM_URL ? (
                <a href={GEMINI_PROGRAM_URL} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                  a Google program that gave me the API for free
                  <LuExternalLink aria-hidden className="inline" />
                </a>
              ) : (
                "a Google program that gave me the API for free"
              )}
              . Every constraint in this section comes from that one fact.
            </p>
            <p className={body}>
              I had shipped things on the Gemini API before, and they hit their limits constantly. For a side project
              that was an annoyance. For a chat app it is fatal: the entire product is one request per message, so
              availability is not a nice-to-have, it is the feature. So instead of guessing, I sat down and actually
              read the API documentation properly for the first time.
            </p>
            <p className={body}>
              What I found was that the limits are scoped per project and per model, and that I had far more of both
              than I was using. That turned into the question the whole backend is built on:{" "}
              <span className="font-semibold text-tomo-ink">
                what if every prompt switched to a different model and a different project key, cycling through them
                to push the uptime up?
              </span>{" "}
              I allocated four projects, gave each access to six models, and suddenly there were 24 places a single
              message could go.
            </p>

            <motion.aside
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="my-2 border-l-2 border-tomo-blue py-1 pl-5"
            >
              <p className={body}>
                Neither half of this was my invention. Round-robin is the scheduler from my{" "}
                <span className="font-semibold text-tomo-ink">Operating Systems</span> class, and cycling requests
                across healthy nodes while retrying past the dead ones is what{" "}
                <span className="font-semibold text-tomo-ink">Computer Networks</span> spends a semester on. I had been
                taught the answer before I had the problem, and I only recognised it once the app started failing on
                me.
              </p>
            </motion.aside>

            <p className={body}>
              The reason this works at all is the subject matter. Tomo talks about food, travel, introductions, the
              kind of everyday conversation where there is no single correct reply. Swapping models mid-conversation
              would wreck an app that needed consistent reasoning or a house voice. Here the answer is just as good
              whichever model produces it, so the rotation costs nothing in quality.
            </p>
            <p className={body}>
              In code it is an atomic counter handing out the next slot per request, and a retriable failure advancing
              to the next slot rather than surfacing an error. Only when all 24 refuse does the user see anything, and
              what they see is a message written in both Japanese and English.
            </p>
          </div>

          <RotatorDiagram />
        </Appear>
      </section>

      {/* Streaming */}
      <section className="flex w-full justify-center bg-white py-20 @xl:py-28">
        <Appear className="flex w-full max-w-4xl flex-col gap-8 px-6 @xl:px-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionTitle ja="速さ">Making it feel fast without making it fast</SectionTitle>
            <p className={body}>
              A Gemini reply takes a couple of seconds. I could not shrink that, so I stopped trying and changed when
              the user sees it instead. The streaming route pushes each chunk over server-sent events as it arrives,
              then sends one final event carrying the finished Japanese and its English translation.
            </p>
          </div>
          <StreamDemo />
        </Appear>
      </section>

      {/* iOS keyboard */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 @xl:py-28">
        <Appear className="flex w-full max-w-4xl flex-col items-center gap-10 px-6 @xl:px-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionTitle ja="不具合">The bug that only existed on a real iPhone</SectionTitle>
            <p className={body}>
              Everything worked in the browser. Then I opened the app on my own phone, tapped the message box, and the
              entire interface slid upward off the top of the screen. iOS Safari pans the layout viewport when a fixed
              input takes focus, and no amount of dvh fixes it because dvh lags a keyboard animation it cannot see.
            </p>
            <p className={body}>
              The fix was to stop trusting CSS units and subscribe to window.visualViewport directly, pinning the
              conversation to the height and offset that are genuinely visible. Tap the button to watch both versions
              react to the same keyboard.
            </p>
          </div>
          <KeyboardDemo />
        </Appear>
      </section>

      {/* Voice */}
      <section className="flex w-full justify-center bg-white py-20 @xl:py-28">
        <Appear className="flex w-full max-w-5xl flex-col items-center gap-10 px-6 @xl:px-10 @5xl:flex-row @5xl:gap-16">
          <div className="flex w-full flex-col gap-4 @5xl:w-3/5">
            <SectionTitle ja="音声">Reading Japanese is not hearing Japanese</SectionTitle>
            <p className={body}>
              Text alone teaches you to read, so every message from Tomo carries a speaker button that plays the line
              aloud through Gemini&apos;s text-to-speech model. The prompt is deliberately blunt: read this aloud
              exactly as written, no changes and no commentary.
            </p>
            <p className={body}>
              Gemini hands back raw PCM samples rather than a playable file, so the backend assembles a RIFF header by
              hand, reading the sample rate out of the response&apos;s own mime type before wrapping the samples as
              mono 16-bit WAV. The four opening lines never hit that path at all. They are generated once by a small
              command in the repo and shipped as static files, which is also why the Japanese text in the frontend has
              to stay byte-for-byte identical to the text that generated the audio.
            </p>
            <p className={body}>
              Audio is generated once per line and carried through to the end screen, so replaying a finished
              conversation never spends a second request.
            </p>
          </div>
          <FloatingPhone
            src="/projects/tomo/screens/conversation-history.png"
            alt="Reviewing a finished Tomo conversation"
            y={[-5, 5, -5]}
            rotate={[2, 3.5, 2]}
            duration={7}
          />
        </Appear>
      </section>

      {/* Architecture */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 @xl:py-28">
        <Appear className="flex w-full max-w-4xl flex-col gap-8 px-6 @xl:px-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionTitle ja="構成">One Go codebase, two ways to run it</SectionTitle>
            <p className={body}>
              I wanted Go on the backend and Vercel for hosting, which are not obviously compatible. The answer was to
              put every handler in a shared package and give it two thin entry points: a local server for development
              and one serverless function per route in production. The same code serves both, so a bug cannot exist in
              only one of them.
            </p>
            <p className={body}>
              Serverless has no memory between invocations, so the backend keeps no conversation state at all. The
              client sends the full history with every message and the server counts the turns itself, which means the
              five-turn limit is enforced twice: once in the interface and once again in Go, where calling the API
              directly cannot get around it.
            </p>
          </div>

          <div className="grid gap-4 @xl:grid-cols-2">
            {ENDPOINTS.map((row) => (
              <motion.div
                key={row.k}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`${card} ${cardHover} flex flex-col gap-2`}
              >
                <span className="font-mono text-xs font-bold text-tomo-blue">{row.k}</span>
                <p className="text-[13px] leading-relaxed text-tomo-slate">{row.v}</p>
              </motion.div>
            ))}
          </div>

          <p className={`${body} text-sm`}>
            Getting there was less elegant than it sounds. Vercel would not build a Go package directory named
            internal, its framework detection had to be switched off by hand, the function globs needed listing
            explicitly, and the streaming route crashed in production because it assumed the response writer could
            always be flushed. None of that is visible in the finished app, which is rather the point.
          </p>
        </Appear>
      </section>

      {/* Kanji */}
      <section className="flex w-full justify-center bg-white py-20 @xl:py-28">
        <Appear className="flex w-full max-w-5xl flex-col items-center gap-10 px-6 @xl:px-10 @5xl:flex-row-reverse @5xl:gap-16">
          <div className="flex w-full flex-col gap-4 @5xl:w-3/5">
            <SectionTitle ja="漢字">Something to do in two minutes</SectionTitle>
            <p className={body}>
              A five-turn conversation asks for real attention, and there are plenty of moments when you do not have
              any to give. The kanji section exists for those moments. Matching mode deals five kanji against five
              meanings across five rounds, resolving pairs in place so a whole round never leaves the screen.
            </p>
            <p className={body}>
              Levels run from N5 down to N1 in a single column, and the screen states plainly which end is easiest.
              JLPT numbering counts backwards, and a learner meeting it for the first time should not have to guess.
              Flashcard mode shipped alongside it: the card shows a kanji, you say the meaning out loud, and only then
              do you tap to check yourself.
            </p>
          </div>
          <FloatingPhone
            src="/projects/tomo/screens/kanji-matching.png"
            alt="Tomo kanji matching mode"
            y={[4, -6, 4]}
            rotate={[-2.5, -1, -2.5]}
            duration={6.4}
          />
        </Appear>
      </section>

      {/* Closing */}
      <section className="flex w-full justify-center bg-tomo-paper py-20 @xl:py-28">
        <Appear className="flex w-full max-w-3xl flex-col items-center gap-6 px-6 text-center @xl:px-10">
          <SectionTitle ja="これから">What Tomo taught me</SectionTitle>
          <p className={`${body} @xl:text-center`}>
            Most of the engineering in Tomo is not about the AI. It is about what happens when the AI is unavailable,
            when the reply is slow, when the keyboard opens, when the free tier says no. The model call itself is a
            dozen lines. Everything around it is the product.
          </p>
          <p className={`${body} @xl:text-center`}>
            Next is voice input, so a conversation can be spoken rather than typed. I still use it to practise, which
            is the only review I trust.
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {demo && (
              <a href={demo} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                Have a conversation <LuExternalLink aria-hidden />
              </a>
            )}
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                <LuGithub aria-hidden /> Read the source
              </a>
            )}
          </div>

          <span lang="ja" className="mt-2 text-sm text-tomo-slate/70 italic">
            はじめまして。トモです。
          </span>
        </Appear>
      </section>
    </div>
  );
}
