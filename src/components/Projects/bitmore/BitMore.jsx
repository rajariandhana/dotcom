import { Image } from "@heroui/react";
import { Progress } from "@heroui/progress";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { LuExternalLink } from "react-icons/lu";
import AppearSection from "../../AppearSection.jsx";

const LOADING_DURATION = 2500;

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
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bitmore-black px-8"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
          <div className="relative flex min-h-screen w-full max-w-8xl flex-col overflow-hidden px-6 pb-24 sm:px-8 lg:flex-row lg:px-0">
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
        <section className="flex w-full justify-center bg-linear-to-b from-bitmore-black to-bitmore-gray py-40">
          <AppearSection className="flex w-full flex-col items-center justify-center gap-20 px-8 lg:max-w-6xl lg:flex-row">
            <div className="transition-all duration-300 ease-in-out hover:rotate-3 hover:scale-105">
              <Link to={UQIES_EVENT_LINK} target="_blank">
                <Image
                  src="/projects/bitmore/wos-2026-poster.png"
                  className="w-72"
                />
              </Link>
            </div>

            <div className="flex flex-col gap-4 lg:w-160">
              <h2 className="text-xl font-black lg:text-3xl">
                It all starts from a{" "}
                <span className="text-bitmore-yellow">Hackathon</span>
              </h2>

              <p>
                In 48 hours me and my friends had to find a problem, create an
                MVP, and pitch our product for a chance to win a <b>$10,000</b>{" "}
                prize pool during the <b>UQIES</b>{" "}
                <Link
                  to={UQIES_EVENT_LINK}
                  target="_blank"
                  className="flex w-fit items-center gap-1 font-bold hover:underline hover:underline-offset-2"
                >
                  "Weekend of Startups 2026"
                  <LuExternalLink />
                </Link>
              </p>

              <p>
                It is their biggest hackathon of the year with this year's theme
                of <b>"The Future of Financial Freedom"</b>. Coming from a
                technical background it was quite nervous to be in a hackathon
                where business ideas being prioritized. I'm still certain that I
                could bring my technical skills to work and even learn a thing
                or two about business and startups.
              </p>
            </div>
          </AppearSection>
        </section>
        <section className="flex w-full justify-center bg-bitmore-gray py-40">
          <AppearSection className="flex flex-col items-center justify-center gap-20 px-8 lg:max-w-6xl">
            <div className="transition-all duration-300 ease-in-out hover:rotate-3 hover:scale-105">
              <Link to={UQIES_EVENT_LINK} target="_blank">
                <Image
                  src="/projects/bitmore/wos-2026-poster.png"
                  className="w-72"
                />
              </Link>
            </div>

            <div className="flex flex-col gap-4 lg:w-160">
              <h2 className="text-xl font-black lg:text-3xl">
                The Problem We Want To{" "}
                <span className="text-bitmore-yellow">Solve</span>
              </h2>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                similique nihil, velit provident officiis, vero architecto quo
                dicta laboriosam voluptates recusandae earum amet quam voluptate
                nam dolorem cupiditate accusantium beatae tempore dolores est
                voluptatem consequuntur. Non totam debitis maiores commodi!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                similique nihil, velit provident officiis, vero architecto quo
                dicta laboriosam voluptates recusandae earum amet quam voluptate
                nam dolorem cupiditate accusantium beatae tempore dolores est
                voluptatem consequuntur. Non totam debitis maiores commodi!
              </p>
            </div>
          </AppearSection>
        </section>
      </motion.div>
    </main>
  );
}
