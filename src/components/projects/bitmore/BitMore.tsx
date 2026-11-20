"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { LuExternalLink } from "react-icons/lu";

import { Appear } from "../Appear";

/*
 * The bitmore story page, ported from the previous (React + Vite) site: a fake
 * loading screen, floating app screens, then the hackathon told section by
 * section. It keeps bitmore's own black-and-yellow look in both site themes.
 */

const LOADING_MS = 2500;
const UQIES_EVENT_URL = "https://luma.com/ggqqo3ok?lm_source=embed";
const RAIZ_URL = "https://raizinvest.com.au/";
const UP_URL = "https://up.com.au/";

/** The old site's "hover-border": a thin white frame that brightens and grows on hover. */
const framed = "border-2 border-white/30 transition-all hover:scale-105 hover:border-white";

const accentLink =
  "inline-flex items-center gap-1 font-bold text-bitmore-yellow hover:underline hover:underline-offset-2";

/** Fills 0→100% over LOADING_MS, then reports done. Skipped for reduced motion. */
function useFakeLoading() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    let frame = 0;
    let done: ReturnType<typeof setTimeout> | undefined;
    const tick = (now: number) => {
      const value = Math.min(((now - start) / LOADING_MS) * 100, 100);
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(tick);
      else done = setTimeout(() => setFinished(true), 200);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(done);
    };
  }, [reduce]);

  return { loading: !finished && !reduce, progress };
}

/**
 * Covers the page only, not the site menu: it fills the page box, and its
 * contents stick to the visible part of the screen (below the 64px top bar
 * on phones) so the logo stays centred while the page underneath is long.
 */
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      className="absolute inset-0 z-30 bg-bitmore-black px-8"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sticky top-16 mx-auto flex h-[calc(100dvh-4rem)] w-full max-w-xl flex-col items-center justify-center gap-6 lg:top-0 lg:h-dvh">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <Image
            src="/projects/bitmore/bitmore-logo.png"
            alt="bitmore"
            width={2877}
            height={598}
            priority
            className="h-16 w-auto object-contain @xl:h-20"
          />
          <span className="text-sm font-bold tracking-[0.25em] text-white/50 uppercase">Loading</span>
        </motion.div>

        <div
          role="progressbar"
          aria-label="Loading"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          className="h-3 w-full overflow-hidden rounded-full bg-white/10"
        >
          <div className="h-full rounded-full bg-bitmore-yellow" style={{ width: `${progress}%` }} />
        </div>

        <span className="text-sm text-white/40 tabular-nums">{Math.round(progress)}%</span>
      </div>
    </motion.div>
  );
}

/* Each phone bobs at its own pace. Fixed per phone rather than random, so the
   server and browser render the same thing. */
const PHONE_MOTION = [
  { floatY: 6, floatDuration: 3.4, hoverY: -12, hoverDuration: 0.4, hoverScale: 1.04 },
  { floatY: 8, floatDuration: 4.2, hoverY: -9, hoverDuration: 0.35, hoverScale: 1.03 },
  { floatY: 5, floatDuration: 3.8, hoverY: -15, hoverDuration: 0.5, hoverScale: 1.05 },
  { floatY: 7, floatDuration: 4.6, hoverY: -8, hoverDuration: 0.32, hoverScale: 1.035 },
  { floatY: 4.5, floatDuration: 3.1, hoverY: -13, hoverDuration: 0.45, hoverScale: 1.055 },
];

function PhonePage({ src, alt, index, className = "" }: { src: string; alt: string; index: number; className?: string }) {
  const m = PHONE_MOTION[index % PHONE_MOTION.length];
  return (
    <motion.div
      className={className}
      animate={{ y: [-m.floatY, m.floatY, -m.floatY] }}
      transition={{ y: { duration: m.floatDuration, repeat: Infinity, ease: "easeInOut" } }}
      whileHover={{
        y: m.hoverY,
        scale: m.hoverScale,
        transition: { duration: m.hoverDuration, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{ transformOrigin: "center center" }}
    >
      <Image
        src={src}
        alt={alt}
        width={320}
        height={622}
        sizes="(min-width: 1024px) 288px, 30vw"
        className="w-48 object-contain @xl:w-56 @3xl:w-64 @5xl:w-72"
      />
    </motion.div>
  );
}

/** A picture that drifts and tilts slowly, forever. */
function Drift({
  children,
  y,
  x,
  rotate,
  duration,
  className,
}: {
  children: ReactNode;
  y: number[];
  x: number[];
  rotate: number[];
  duration: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y, x, rotate }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function Video({ src, className }: { src: string; className: string }) {
  return <video controls autoPlay loop muted playsInline preload="metadata" className={className} src={src} />;
}

const heading = "text-xl font-black @5xl:text-3xl";

export function BitMore() {
  const { loading, progress } = useFakeLoading();

  return (
    <div className="relative flex w-full flex-col overflow-clip bg-bitmore-black text-base text-bitmore-white @5xl:text-lg">
      <AnimatePresence>{loading && <LoadingScreen progress={progress} />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="sr-only">bitmore</h1>

        {/* Hero */}
        <section className="flex w-full justify-center overflow-hidden bg-bitmore-black">
          <div className="relative flex min-h-dvh w-full flex-col overflow-hidden px-6 pb-32 @xl:px-8 @5xl:flex-row @5xl:px-0 @5xl:pb-20">

            <div className="relative flex w-full flex-col items-center justify-center pt-24 @5xl:w-2/5 @5xl:pt-0">
              <h2 className="text-3xl leading-none font-black @xl:text-4xl @3xl:text-5xl">save a</h2>
              <Image
                src="/projects/bitmore/bitmore-logo.png"
                alt="bit more"
                width={2877}
                height={598}
                className="my-1 h-12 w-auto object-contain object-left transition-all duration-300 ease-in-out hover:h-14 hover:rotate-3 @xl:h-16 @xl:hover:h-20 @3xl:h-20 @3xl:hover:h-24"
              />
              <h2 className="text-3xl leading-none font-black @xl:text-4xl @3xl:text-5xl">without trying</h2>
              <Image
                src="/projects/bitmore/notification.png"
                alt="A bitmore notification"
                width={472}
                height={75}
                className="mt-4 h-10 w-auto object-contain transition-all duration-300 ease-in-out hover:rotate-2 @xl:h-12 @3xl:h-16"
              />
            </div>

            {/* Phones */}
            <div className="relative mt-12 grid w-full grid-cols-3 gap-2 @xl:gap-4 @3xl:gap-6 @5xl:mt-0 @5xl:w-3/5 @5xl:gap-4">
              <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[220px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#858306] blur-[120px] @xl:h-[280px] @xl:w-[560px] @xl:blur-[160px] @3xl:h-[350px] @3xl:w-[700px] @3xl:blur-[200px] @5xl:h-[400px] @5xl:w-[800px] @5xl:blur-[250px]" />

              <div className="relative flex min-w-0 flex-col gap-8">
                <PhonePage
                  index={0}
                  src="/projects/bitmore/pages/onboarding-1.png"
                  alt="bitmore onboarding"
                  className="-mt-8 @xl:-mt-12 @3xl:-mt-16 @5xl:-mt-20"
                />
                <PhonePage
                  index={1}
                  src="/projects/bitmore/pages/report.png"
                  alt="bitmore savings report"
                  className="mt-2 @xl:mt-3 @5xl:mt-4"
                />
              </div>

              <div className="relative flex min-w-0 flex-col gap-8">
                <PhonePage
                  index={2}
                  src="/projects/bitmore/pages/home-commitment-graph.png"
                  alt="bitmore home screen with the commitment graph"
                  className="mt-16 scale-100 @xl:mt-24 @xl:scale-105 @3xl:mt-32 @3xl:scale-110 @5xl:mt-[200px] @5xl:scale-110"
                />
              </div>

              <div className="relative flex min-w-0 flex-col">
                <PhonePage
                  index={3}
                  src="/projects/bitmore/pages/onboarding-2.png"
                  alt="bitmore onboarding, second step"
                  className="mt-4 @xl:mt-6 @3xl:mt-8 @5xl:mt-10"
                />
                <PhonePage
                  index={4}
                  src="/projects/bitmore/pages/home-activity.png"
                  alt="bitmore home screen with recent activity"
                  className="mt-8 @xl:mt-10 @3xl:mt-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Hackathon */}
        <section className="flex w-full justify-center bg-linear-to-b from-bitmore-black to-bitmore-gray py-20">
          <Appear className="flex w-full flex-col items-center justify-center gap-12 px-8 @5xl:max-w-6xl @5xl:flex-row @5xl:gap-20">
            <a href={UQIES_EVENT_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Drift y={[-4, 4, -4]} x={[-2, 2, -2]} rotate={[-3, -1, -3]} duration={6.5}>
                <Image
                  src="/projects/bitmore/wos-2026-poster.png"
                  alt="UQIES Weekend of Startups 2026 poster"
                  width={560}
                  height={560}
                  className={`w-56 rounded-xl @xl:w-64 @5xl:w-72 ${framed}`}
                />
              </Drift>
            </a>

            <div className="flex flex-col gap-4 @5xl:w-160">
              <h2 className={heading}>
                It all starts from a <span className="text-bitmore-yellow">Hackathon</span>
              </h2>
              <p className="text-justify">
                In 48 hours my friends and I had to find a problem, create an MVP, and pitch our product for a chance
                to win a <b>$10,000</b> prize pool during the{" "}
                <a href={UQIES_EVENT_URL} target="_blank" rel="noopener noreferrer" className={accentLink}>
                  UQIES &ldquo;Weekend of Startups 2026&rdquo;
                  <LuExternalLink aria-hidden className="inline" />
                </a>
              </p>
              <p className="text-justify">
                It was their biggest hackathon of the year with the theme of{" "}
                <b>&ldquo;The Future of Financial Freedom&rdquo;</b>. Coming from a technical background, it was
                nerve-wracking to be in a hackathon where business ideas were prioritized. But I was certain that I
                could put my technical skills to work and even learn a thing or two about business and startups.
              </p>
            </div>
          </Appear>
        </section>

        {/* Problem & competitors */}
        <section className="flex w-full flex-col items-center justify-center gap-24 bg-bitmore-gray py-20 @xl:gap-32 @xl:py-28">
          <Appear className="flex flex-col items-center justify-center gap-12 px-8 @5xl:max-w-6xl @5xl:gap-20">
            <div className="flex flex-col items-center gap-4 @5xl:w-160">
              <h2 className={`${heading} w-full`}>
                Finding a <span className="text-bitmore-yellow">problem</span> we want to solve
              </h2>
              <p className="text-justify">
                Going into the hackathon, we knew we didn&apos;t want to create another finance expense tracker. We
                were also sure that most other teams would just combine theirs with AI for insights. We wanted ours to
                be <span className="font-serif text-2xl font-bold uppercase italic">unique</span>. We wanted to solve
                real problems close to us, something we encounter daily and within reach to be solved. We began by
                asking ourselves and our friends, and finally a friend of ours said:
              </p>

              <motion.blockquote
                className="w-4/5 border-l-2 border-bitmore-yellow py-2 pl-4 text-center text-xl italic"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                &ldquo;I want to save money but it&apos;s scary to put $100 all at once at the start of the
                month.&rdquo;
              </motion.blockquote>

              <p className="text-justify">
                We did our research and found an existing solution from an app called Raiz. Instead of putting a big
                amount of money away at the start of the month, you do something different. Every time users spend
                money, it rounds up their expense and moves the rounded amount to their savings account. It helps
                users save money without them actually realizing it.
              </p>
            </div>
          </Appear>

          <Appear className="flex flex-col items-center justify-center gap-12 px-8 @5xl:max-w-6xl @5xl:gap-20">
            <div className="flex flex-col items-center gap-4 @5xl:w-160">
              <motion.div
                className="flex"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <a href={RAIZ_URL} target="_blank" rel="noopener noreferrer">
                  <Drift y={[-4, 4, -4]} x={[-2, 2, -2]} rotate={[-3, -1, -3]} duration={6.5}>
                    <Image
                      src="/projects/bitmore/competitor-raiz.png"
                      alt="Raiz"
                      width={246}
                      height={246}
                      className={`size-28 rounded-xl @xl:size-36 ${framed}`}
                    />
                  </Drift>
                </a>
                <a href={UP_URL} target="_blank" rel="noopener noreferrer">
                  <Drift y={[4, -5, 4]} x={[2, -2, 2]} rotate={[6, 8, 6]} duration={5.6} className="relative -ml-4">
                    <Image
                      src="/projects/bitmore/competitor-up.png"
                      alt="Up"
                      width={512}
                      height={512}
                      className={`h-auto w-28 rounded-xl @xl:w-36 ${framed}`}
                    />
                  </Drift>
                </a>
              </motion.div>

              <h2 className={heading}>
                <span className="text-bitmore-yellow">Competitors</span> within the market
              </h2>
              <p className="text-justify">
                But of course we couldn&apos;t just copy their existing solution, we needed something that
                differentiates ours from theirs. Both apps use the same approach: they round up purchases to the
                nearest dollar. While Raiz allows users to link existing bank accounts, Up requires users to use an Up
                Bank account for everyday spending.
              </p>
              <p className="text-justify">
                They both cap their rounding amount at $1, so what if ours doesn&apos;t? If you buy something for
                $150, adding another $10 doesn&apos;t seem like a lot. We thought this would be an effective approach
                and our unique selling point. We would create an algorithm that dynamically calculates the extra amount
                based on the expense and the user&apos;s monthly savings goal.
              </p>
            </div>
          </Appear>
        </section>

        {/* Developing */}
        <section className="flex w-full justify-center bg-linear-to-b from-bitmore-gray to-bitmore-black py-20">
          <Appear className="flex flex-col items-center justify-center gap-8 px-8 @xl:flex-row @5xl:max-w-4xl @5xl:gap-16">
            <Image
              src="/projects/bitmore/whiteboard.jpg"
              alt="Features and user flow mapped out on a whiteboard"
              width={2268}
              height={4032}
              sizes="(min-width: 640px) 40vw, 288px"
              className={`w-72 shrink-0 -rotate-3 rounded-xl hover:rotate-3 @xl:w-2/5 ${framed}`}
            />
            <div className="flex flex-col gap-4">
              <h2 className={`${heading} text-bitmore-yellow`}>Developing the MVP</h2>
              <p className="text-justify">
                After locking in the core idea, we mapped out the features and user flow on a whiteboard. Although an
                MVP wasn&apos;t mandatory for the pitch, as the technical lead I wanted a working prototype to
                demonstrate the concept. I built the mobile app with React Native and Expo while my teammates focused
                on the business model and pitch deck.
              </p>
              <p className="text-justify">
                What was most interesting for me was learning about built-in device native functions. Even coding a
                push notification system — something that seems simple — was fascinating since in web-based
                applications I never had to deal with it.
              </p>
            </div>
          </Appear>
        </section>

        {/* Demo: onboarding */}
        <section className="flex w-full justify-center bg-bitmore-black py-20">
          <Appear className="flex flex-col items-center justify-center gap-8 px-8 @xl:flex-row @5xl:max-w-4xl @5xl:gap-16">
            <div className="flex w-full flex-col gap-4 @xl:w-1/2">
              <h2 className={`${heading} text-bitmore-yellow`}>The Product</h2>
              <p className="text-justify">
                After hours of development, we had a fully working MVP. New users go through a quick onboarding
                session so BitMore can understand their goals and create a personalized experience. Users can easily
                see insights on how much they&apos;ve saved, and a commitment graph keeps them engaged and focused on
                their savings goals.
              </p>
            </div>
            <div className="flex w-full items-center justify-center @xl:w-1/2">
              {/* The recording already draws its phone on a #202020 backdrop, with 69px
                  black bands at the top and bottom. The frame takes the picture's own
                  1080×2198 ratio and object-cover crops the bands evenly; its matching
                  #202020 background and a soft yellow glow make the backdrop read as a
                  card rather than a box around a box. */}
              <div className="relative w-full max-w-xs">
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-3/5 w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-bitmore-yellow/15 blur-[80px]" />
                <div className="relative aspect-[1080/2198] overflow-hidden rounded-4xl bg-[#202020] ring-1 ring-white/10">
                  <Video src="/projects/bitmore/demo-onboarding.mp4" className="size-full object-cover" />
                </div>
              </div>
            </div>
          </Appear>
        </section>

        {/* Demo: payment */}
        <section className="flex w-full justify-center bg-bitmore-black py-20">
          <Appear className="flex flex-col items-center justify-center gap-8 px-8 @xl:flex-row @5xl:max-w-4xl @5xl:gap-16">
            <div className="flex w-full flex-col gap-4 @xl:w-1/2">
              <h2 className={`${heading} text-bitmore-yellow`}>Payment System</h2>
              <p className="text-justify">
                We needed a way to detect when a payment occurred and trigger a notification so users could
                immediately set aside a bit of their money into savings.
              </p>
              <p className="text-justify">
                Since building a real payment integration was impossible with our limited resources and legality
                concerns, we got creative. We used iPhone&apos;s automation feature to detect when a user paid with
                Apple Pay, which then triggers an API call to our server.
              </p>
            </div>
            <div className="flex w-full items-center justify-center @xl:w-1/2">
              <Video
                src="/projects/bitmore/demo-payment.mp4"
                className={`h-120 w-full rounded-t-4xl object-cover object-top ${framed}`}
              />
            </div>
          </Appear>
        </section>

        {/* Pitch */}
        <section className="flex w-full justify-center bg-bitmore-black py-20 @xl:py-28">
          <Appear className="flex flex-col items-center justify-center gap-8 px-8 @3xl:max-w-4xl">
            <h2 className={`${heading} text-center text-bitmore-yellow`}>It&apos;s Time to Pitch</h2>
            <Video src="/projects/bitmore/pitch-timelapse.mp4" className={`w-full rounded-4xl @3xl:w-2/3 ${framed}`} />
            <p className="text-justify @5xl:text-center">
              Without enough sleep (I actually got sick when I got home), I trusted my teammates to deliver the pitch,
              and yes they did it better than I ever could. They opened with an engaging case study of a real user
              facing the problem, then did a smooth transition that name-dropped our app through a little skit, which
              became my favorite part of the whole pitch.
            </p>
            <p className="text-justify @5xl:text-center">
              What I think set our team apart was that we provided an estimate of how much it would actually cost to
              run the app in production. We walked the judges through our marketing campaign and even showed realistic
              revenue projections.
            </p>
          </Appear>
        </section>

        {/* Result */}
        <section className="flex w-full justify-center bg-bitmore-black py-20 @xl:py-28">
          <Appear className="flex flex-col items-center justify-center gap-8 px-8 @5xl:max-w-4xl">
            <h2 className={`${heading} text-center text-bitmore-yellow`}>The Result</h2>
            <p className="text-justify @5xl:text-center">
              No, we did not win, but we gained something more valuable than the prize: the experience. It was
              refreshing to join a hackathon that focused on the business side. I learned so many aspects of product
              development that I had never considered before.
            </p>
            <p className="text-justify @5xl:text-center">
              I was genuinely impressed by the other teams&apos; ideas. There was even a team whose solution was
              similar to something already implemented in my home country, Indonesia. When I saw it, our whole team
              said &ldquo;Why didn&apos;t we think of that?&rdquo; During the final round I watched one team&apos;s
              pitch and I knew instantly they were going to win (and yes, they did take 1st place). Their idea was
              truly feasible and could generate money for everyday people, perfectly fitting for this year&apos;s
              theme.
            </p>
          </Appear>
        </section>

        {/* Closing */}
        <section className="flex w-full justify-center bg-bitmore-black pb-20 @xl:pb-28">
          <Appear className="flex flex-col items-center justify-center gap-6 px-8">
            <div className={`w-full max-w-2xl overflow-hidden rounded-2xl ${framed}`}>
              <Image
                src="/projects/bitmore/team-photo.jpg"
                alt="The bitmore team"
                width={960}
                height={1280}
                sizes="(min-width: 672px) 672px, 100vw"
                className="-mt-12 w-full object-cover"
              />
            </div>
            <span className="text-sm text-white/50 italic">
              P.S. No, I did not just join the hackathon for the free food.
            </span>
          </Appear>
        </section>
      </motion.div>
    </div>
  );
}
