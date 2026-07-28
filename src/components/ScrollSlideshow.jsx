import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * ScrollSlideshow
 * ----------------
 * A mobile-first, scroll-driven slideshow. Feed it a JSON array of
 * { image, text } objects and each one fades/slides into view as the
 * user scrolls down the page, then quietly settles once fully in view.
 *
 * Usage:
 *   <ScrollSlideshow slides={[
 *     { image: "/images/one.jpg", text: "Paragraph for slide one..." },
 *     { image: "/images/two.jpg", text: "Paragraph for slide two..." },
 *   ]} />
 *
 * Notes:
 * - "image" can be any URL or local path your bundler can resolve
 *   (e.g. imported asset, /public path, or remote URL).
 * - "text" is rendered as a single paragraph; pass plain strings.
 * - No external UI libraries required — just React + CSS (no Tailwind
 *   needed, all styling is scoped inline/in the injected <style> tag).
 */

const DEFAULT_SLIDES = [
  {
    image: "https://picsum.photos/id/1015/900/1200",
    text: "Somewhere between the ridgeline and the river, the trail forgets it was ever mapped.",
  },
  {
    image: "https://picsum.photos/id/1043/900/1200",
    text: "Every valley keeps its own weather. You learn to read the sky before you learn the path.",
  },
  {
    image: "https://picsum.photos/id/1050/900/1200",
    text: "By the third day, the pack feels lighter — not because it is, but because you've stopped noticing it.",
  },
  {
    image: "https://picsum.photos/id/1069/900/1200",
    text: "The summit isn't the point. It's just the one place the whole walk finally makes sense.",
  },
];

function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        // Once revealed, stop watching — this is a one-way reveal,
        // not a toggle that re-hides on scroll-up.
        observer.unobserve(node);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

function Slide({ image, text, index }) {
  const [ref, inView] = useInView({ threshold: 0.35, rootMargin: "0px 0px -10% 0px" });

  return (
    <section
      ref={ref}
      className={`slide ${inView ? "slide--visible" : ""}`}
      aria-label={`Slide ${index + 1}`}
    >
      <div className="slide__image-wrap">
        <img className="slide__image" src={image} alt="" loading="lazy" />
      </div>
      <p className="slide__text">{text}</p>
    </section>
  );
}

export default function ScrollSlideshow({ slides = DEFAULT_SLIDES }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;
    const scrollable = node.scrollHeight - node.clientHeight;
    const ratio = scrollable > 0 ? node.scrollTop / scrollable : 0;
    setProgress(Math.min(1, Math.max(0, ratio)));
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => node.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="scroll-slideshow" ref={containerRef}>
      <style>{`
        .scroll-slideshow {
          height: 100vh;
          height: 100dvh;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-snap-type: y proximity;
          background: #0b0b0c;
          position: relative;
          -webkit-overflow-scrolling: touch;
        }

        .scroll-slideshow::-webkit-scrollbar { width: 0; }

        .progress-track {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: #f4f1ea;
          z-index: 20;
          transition: width 0.1s linear;
        }

        .slide {
          scroll-snap-align: start;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 8vh 6vw 10vh;
          box-sizing: border-box;
          position: relative;
        }

        .slide__image-wrap {
          width: 100%;
          max-width: 480px;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 4px;
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          transition: opacity 0.9s cubic-bezier(0.2, 0.65, 0.3, 0.9),
                      transform 0.9s cubic-bezier(0.2, 0.65, 0.3, 0.9);
        }

        .slide__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .slide__text {
          margin-top: 2.25rem;
          max-width: 34ch;
          text-align: center;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.05rem;
          line-height: 1.65;
          color: #f4f1ea;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s cubic-bezier(0.2, 0.65, 0.3, 0.9) 0.15s,
                      transform 0.9s cubic-bezier(0.2, 0.65, 0.3, 0.9) 0.15s;
        }

        .slide--visible .slide__image-wrap {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .slide--visible .slide__text {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .slide__image-wrap,
          .slide__text {
            transition: opacity 0.4s linear !important;
            transform: none !important;
          }
        }

        @media (min-width: 768px) {
          .slide { padding: 10vh 10vw; }
          .slide__text { font-size: 1.15rem; }
        }
      `}</style>

      <div className="progress-track" style={{ width: `${progress * 100}%` }} />

      {slides.map((slide, i) => (
        <Slide key={i} image={slide.image} text={slide.text} index={i} />
      ))}
    </div>
  );
}
