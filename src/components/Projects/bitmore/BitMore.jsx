import { Image } from "@heroui/react";
import { Chip } from "@heroui/react";
import { Progress } from "@heroui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { LuExternalLink } from "react-icons/lu";
import { FaAnglesLeft } from "react-icons/fa6";
import AppearSection from "../../AppearSection.jsx";

const LOADING_DURATION = 2500;

const TECH_STACK = ["React Native", "Expo", "TypeScript", "Firebase"];

function PhonePage({ img_src, className = "" }) {
  const animation = useMemo(
    () => ({
      floatY: 4 + Math.random() * 5,
      floatDuration: 3 + Math.random() * 2,
      hoverY: -6 - Math.random() * 12,
      hoverDuration: 0.3 + Math.random() * 0.25,
      hoverScale: 1.025 + Math.random() * 0.035,
    }),
    [],
  );

  return (
    <motion.div
      className={className}
      animate={{
        y: [-animation.floatY, animation.floatY, -animation.floatY],
      }}
      transition={{
        y: {
          duration: animation.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        y: animation.hoverY,
        scale: animation.hoverScale,
        transition: {
          duration: animation.hoverDuration,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      style={{ transformOrigin: "center center" }}
    >
      <Image
        src={img_src}
        radius="none"
        className="w-48 object-contain sm:w-56 md:w-64 lg:w-72"
      />
    </motion.div>
  );
}

export default function BitMore() {
  const UQIES_EVENT_LINK = "https://luma.com/ggqqo3ok?lm_source=embed";

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();

    let frame;

    const updateProgress = (now) => {
      const elapsed = now - start;
      const value = Math.min((elapsed / LOADING_DURATION) * 100, 100);

      setProgress(value);

      if (value < 100) {
        frame = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    };

    frame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="flex w-full flex-col text-bitmore-white font-jakarta text-md lg:text-lg">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-bitmore-black px-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex w-full max-w-xl flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-4"
              >
                <Image
                  src="/projects/bitmore/bitmore-logo.png"
                  radius="none"
                  className="h-16 w-auto object-contain sm:h-20"
                />

                <span className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
                  Loading
                </span>
              </motion.div>

              <Progress
                aria-label="Loading"
                value={progress}
                className="w-full"
                size="lg"
                color="warning"
                showValueLabel={false}
              />

              <span className="text-sm tabular-nums text-white/40">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: loading ? 0 : 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {/* Hero */}
        <section className="flex w-full justify-center overflow-hidden bg-bitmore-black">
          <div className="relative flex min-h-screen w-full max-w-8xl flex-col overflow-hidden px-6 pb-32 sm:px-8 lg:flex-row lg:px-0 lg:pb-20">
            {/* Back Navigation */}
            <Link
              to="/projects"
              className="absolute left-6 top-6 z-10 flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white sm:left-8 lg:left-8"
            >
              <FaAnglesLeft className="text-xs" />
              <span>Back to Projects</span>
            </Link>

            <div className="relative flex w-full flex-col items-center justify-center pt-24 lg:w-2/5 lg:items-center lg:justify-center lg:pt-0">
              <h2 className="text-3xl font-black leading-none sm:text-4xl md:text-5xl">
                save a
              </h2>

              <Image
                src="/projects/bitmore/bitmore-logo.png"
                radius="none"
                className="my-1 h-12 w-auto object-contain object-left transition-all duration-300 ease-in-out hover:h-14 hover:rotate-3 sm:h-16 sm:hover:h-20 md:h-20 md:hover:h-24"
              />

              <h2 className="text-3xl font-black leading-none sm:text-4xl md:text-5xl">
                without trying
              </h2>

              <Image
                src="/projects/bitmore/notification.png"
                radius="none"
                className="mt-4 h-10 w-auto object-contain transition-all duration-300 ease-in-out hover:rotate-2 sm:h-12 md:h-16"
              />

              {/* <div className="mt-6 flex flex-wrap justify-center gap-2">
                {TECH_STACK.map((tech) => (
                  <Chip
                    key={tech}
                    variant="bordered"
                    classNames={{
                      base: "border-white/20",
                      content: "text-white/60 text-xs",
                    }}
                    size="sm"
                  >
                    {tech}
                  </Chip>
                ))}
              </div> */}
            </div>

            {/* Phones */}
            <div className="relative mt-12 grid w-full grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:mt-0 lg:w-3/5 lg:gap-4">
              {/* Glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[220px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#858306] blur-[120px] sm:h-[280px] sm:w-[560px] sm:blur-[160px] md:h-[350px] md:w-[700px] md:blur-[200px] lg:h-[400px] lg:w-[800px] lg:blur-[250px]" />

              {/* Column 1 */}
              <div className="relative flex min-w-0 flex-col gap-8">
                <PhonePage
                  img_src="/projects/bitmore/pages/onboarding-1.png"
                  className="-mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20"
                />

                <PhonePage
                  img_src="/projects/bitmore/pages/report.png"
                  className="mt-2 sm:mt-3 lg:mt-4"
                />
              </div>

              {/* Column 2 */}
              <div className="relative flex min-w-0 flex-col gap-8">
                <PhonePage
                  img_src="/projects/bitmore/pages/home-commitment-graph.png"
                  className="mt-16 scale-100 sm:mt-24 sm:scale-105 md:mt-32 md:scale-110 lg:mt-[200px] lg:scale-110"
                />
              </div>

              {/* Column 3 */}
              <div className="relative flex min-w-0 flex-col">
                <PhonePage
                  img_src="/projects/bitmore/pages/onboarding-2.png"
                  className="mt-4 sm:mt-6 md:mt-8 lg:mt-10"
                />

                <PhonePage
                  img_src="/projects/bitmore/pages/home-activity.png"
                  className="mt-8 sm:mt-10 md:mt-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Hackathon */}
        <section className="flex w-full justify-center bg-linear-to-b from-bitmore-black to-bitmore-gray py-20">
          <AppearSection className="flex w-full flex-col items-center justify-center gap-12 px-8 lg:max-w-6xl lg:flex-row lg:gap-20">
            <Link to={UQIES_EVENT_LINK} target="_blank">
              <motion.div
                animate={{
                  y: [-4, 4, -4],
                  x: [-2, 2, -2],
                  rotate: [-3, -1, -3],
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/projects/bitmore/wos-2026-poster.png"
                  className="w-56 sm:w-64 lg:w-72 hover-border"
                />
              </motion.div>
            </Link>

            <div className="flex flex-col gap-4 lg:w-160">
              <h2 className="text-xl font-black lg:text-3xl">
                It all starts from a{" "}
                <span className="text-bitmore-yellow">Hackathon</span>
              </h2>

              <p className="text-justify">
                In 48 hours my friends and I had to find a problem, create an
                MVP, and pitch our product for a chance to win a <b>$10,000</b>{" "}
                prize pool during the{" "}
                <Link
                  to={UQIES_EVENT_LINK}
                  target="_blank"
                  className="inline-flex items-center gap-1 font-bold text-bitmore-yellow hover:underline hover:underline-offset-2"
                >
                  UQIES "Weekend of Startups 2026"
                  <LuExternalLink className="inline" />
                </Link>
              </p>

              <p className="text-justify">
                It was their biggest hackathon of the year with the theme of{" "}
                <b>"The Future of Financial Freedom"</b>. Coming from a
                technical background, it was nerve-wracking to be in a hackathon
                where business ideas were prioritized. But I was certain that I
                could put my technical skills to work and even learn a thing or
                two about business and startups.
              </p>
            </div>
          </AppearSection>
        </section>

        {/* Problem & Competitors */}
        <section className="flex w-full flex-col items-center justify-center bg-bitmore-gray py-20 gap-24 sm:py-28 sm:gap-32">
          <AppearSection className="flex flex-col items-center justify-center gap-12 px-8 lg:max-w-6xl lg:gap-20">
            <div className="flex flex-col gap-4 lg:w-160 items-center">
              <h2 className="text-xl font-black lg:text-3xl w-full">
                Finding a <span className="text-bitmore-yellow">problem</span>{" "}
                we want to solve
              </h2>
              <p className="text-justify">
                Going into the hackathon, we knew we didn't want to create
                another finance expense tracker. We were also sure that most
                other teams would just combine theirs with AI for insights. We
                wanted ours to be{" "}
                <span className="font-garamond! uppercase italic font-bold text-2xl">
                  unique
                </span>
                . We wanted to solve real problems close to us, something we
                encounter daily and within reach to be solved. We began by
                asking ourselves and our friends, and finally a friend of ours
                said:
              </p>

              <motion.h4
                className="text-center italic w-4/5 text-xl border-l-2 border-bitmore-yellow pl-4 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                "I want to save money but it's scary to put $100 all at once at
                the start of the month."
              </motion.h4>

              <p className="text-justify">
                We did our research and found an existing solution from an app
                called Raiz. Instead of putting a big amount of money away at
                the start of the month, you do something different. Every time
                users spend money, it rounds up their expense and moves the
                rounded amount to their savings account. It helps users save
                money without them actually realizing it.
              </p>
            </div>
          </AppearSection>

          <AppearSection className="flex flex-col items-center justify-center gap-12 px-8 lg:max-w-6xl lg:gap-20">
            <div className="flex flex-col gap-4 lg:w-160 items-center">
              <motion.div
                className="flex"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="https://raizinvest.com.au/" target="_blank">
                  <motion.div
                    animate={{
                      y: [-4, 4, -4],
                      x: [-2, 2, -2],
                      rotate: [-3, -1, -3],
                    }}
                    transition={{
                      duration: 6.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src="/projects/bitmore/competitor-raiz.png"
                      className="size-28 hover-border sm:size-36"
                    />
                  </motion.div>
                </Link>

                <Link to="https://up.com.au/" target="_blank">
                  <motion.div
                    className="relative -ml-4"
                    animate={{
                      y: [4, -5, 4],
                      x: [2, -2, 2],
                      rotate: [6, 8, 6],
                    }}
                    transition={{
                      duration: 5.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src="/projects/bitmore/competitor-up.png"
                      className="h-auto w-28 hover-border sm:w-36"
                    />
                  </motion.div>
                </Link>
              </motion.div>

              <h2 className="text-xl font-black lg:text-3xl">
                <span className="text-bitmore-yellow">Competitors</span> within
                the market
              </h2>
              <p className="text-justify">
                But of course we couldn't just copy their existing solution, we
                needed something that differentiates ours from theirs. Both apps
                use the same approach: they round up purchases to the nearest
                dollar. While Raiz allows users to link existing bank accounts,
                Up requires users to use an Up Bank account for everyday
                spending.
              </p>
              <p className="text-justify">
                They both cap their rounding amount at $1, so what if ours
                doesn't? If you buy something for $150, adding another $10
                doesn't seem like a lot. We thought this would be an effective
                approach and our unique selling point. We would create an
                algorithm that dynamically calculates the extra amount based on
                the expense and the user's monthly savings goal.
              </p>
            </div>
          </AppearSection>
        </section>

        {/* Developing */}
        <section className="flex w-full justify-center bg-linear-to-b from-bitmore-gray to-bitmore-black py-20">
          <AppearSection className="flex flex-col items-center justify-center gap-8 px-8 sm:flex-row lg:max-w-4xl lg:gap-16">
            <Image
              src="/projects/bitmore/whiteboard.jpg"
              className="w-72 sm:w-full shrink-0 -rotate-3 hover:rotate-3 hover-border"
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-black lg:text-3xl text-bitmore-yellow">
                Developing the MVP
              </h2>
              <p className="text-justify">
                After locking in the core idea, we mapped out the features and
                user flow on a whiteboard. Although an MVP wasn't mandatory for
                the pitch, as the technical lead I wanted a working prototype to
                demonstrate the concept. I built the mobile app with React
                Native and Expo while my teammates focused on the business model
                and pitch deck.
              </p>
              <p className="text-justify">
                What was most interesting for me was learning about built-in
                device native functions. Even coding a push notification system
                — something that seems simple — was fascinating since in
                web-based applications I never had to deal with it.
              </p>
            </div>
          </AppearSection>
        </section>

        {/* Demo Onboarding */}
        <section className="flex w-full justify-center bg-bitmore-black py-20">
          <AppearSection className="flex flex-col items-center justify-center gap-8 px-8 sm:flex-row lg:max-w-4xl lg:gap-16">
            <div className="flex flex-col gap-4 w-full sm:w-1/2">
              <h2 className="text-xl font-black lg:text-3xl text-bitmore-yellow">
                The Product
              </h2>
              <p className="text-justify">
                After hours of development, we had a fully working MVP. New
                users go through a quick onboarding session so BitMore can
                understand their goals and create a personalized experience.
                Users can easily see insights on how much they've saved, and a
                commitment graph keeps them engaged and focused on their savings
                goals.
              </p>
            </div>
            <div className="flex items-center justify-center w-full sm:w-1/2">
              <video
                controls
                autoPlay={true}
                loop={true}
                muted
                playsInline
                className="w-full max-h-[70vh] rounded-4xl hover-border"
                src="/projects/bitmore/demo-onboarding.mp4"
              />
            </div>
          </AppearSection>
        </section>

        {/* Demo Payment */}
        <section className="flex w-full justify-center bg-bitmore-black py-20">
          <AppearSection className="flex flex-col items-center justify-center gap-8 px-8 sm:flex-row lg:max-w-4xl lg:gap-16">
            <div className="flex flex-col gap-4 w-full sm:w-1/2">
              <h2 className="text-xl font-black lg:text-3xl text-bitmore-yellow">
                Payment System
              </h2>
              <p className="text-justify">
                We needed a way to detect when a payment occurred and trigger a
                notification so users could immediately set aside a bit of their
                money into savings.
              </p>
              <p className="text-justify">
                Since building a real payment integration was impossible with
                our limited resources and legality concerns, we got creative. We
                used iPhone's automation feature to detect when a user paid with
                Apple Pay, which then triggers an API call to our server.
              </p>
            </div>
            <div className="flex w-full items-center justify-center sm:w-1/2">
              <video
                controls
                autoPlay={true}
                loop={true}
                muted
                playsInline
                className="w-full h-120 rounded-t-4xl hover-border object-cover object-top"
                src="/projects/bitmore/demo-payment.mp4"
              />
            </div>
          </AppearSection>
        </section>

        {/* Pitch */}
        <section className="flex w-full justify-center bg-bitmore-black py-20 sm:py-28">
          <AppearSection className="flex flex-col items-center justify-center gap-8 px-8 md:max-w-4xl">
            <h2 className="text-xl font-black lg:text-3xl text-center">
              <span className="text-bitmore-yellow">It's Time to Pitch</span>
            </h2>
            <video
              controls
              autoPlay={true}
              loop={true}
              muted
              playsInline
              className="w-full md:w-2/3 rounded-4xl hover-border"
              src="/projects/bitmore/pitch-timelapse.mp4"
            />
            <p className="text-justify lg:text-center">
              Without enough sleep (I actually got sick when I got home), I
              trusted my teammates to deliver the pitch, and yes they did it
              better than I ever could. They opened with an engaging case study
              of a real user facing the problem, then did a smooth transition
              that name-dropped our app through a little skit, which became my
              favorite part of the whole pitch.
            </p>
            <p className="text-justify lg:text-center">
              What I think set our team apart was that we provided an estimate
              of how much it would actually cost to run the app in production.
              We walked the judges through our marketing campaign and even
              showed realistic revenue projections.
            </p>
          </AppearSection>
        </section>

        {/* Result */}
        <section className="flex w-full justify-center bg-bitmore-black py-20 sm:py-28">
          <AppearSection className="flex flex-col items-center justify-center gap-8 px-8 lg:max-w-4xl">
            <h2 className="text-xl font-black lg:text-3xl text-center">
              <span className="text-bitmore-yellow">The Result</span>
            </h2>
            <p className="text-justify lg:text-center">
              No, we did not win, but we gained something more valuable than the
              prize: the experience. It was refreshing to join a hackathon that
              focused on the business side. I learned so many aspects of product
              development that I had never considered before.
            </p>
            <p className="text-justify lg:text-center">
              I was genuinely impressed by the other teams' ideas. There was
              even a team whose solution was similar to something already
              implemented in my home country, Indonesia. When I saw it, our
              whole team said "Why didn't we think of that?" During the final
              round I watched one team's pitch and I knew instantly they were
              going to win (and yes, they did take 1st place). Their idea was
              truly feasible and could generate money for everyday people,
              perfectly fitting for this year's theme.
            </p>
          </AppearSection>
        </section>

        {/* Closing */}
        <section className="flex w-full justify-center bg-bitmore-black pb-20 sm:pb-28">
          <AppearSection className="flex flex-col items-center justify-center gap-6 px-8">
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl hover-border">
              <img
                src="/projects/bitmore/team-photo.jpg"
                className="w-full -mt-12 object-cover"
              />
            </div>
            <span className="text-sm italic text-white/50">
              P.S. No, I did not just join the hackathon for the free food.
            </span>
            <Link
              to="/projects"
              className="mt-4 flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
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
