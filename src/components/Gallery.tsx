"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export type GalleryImage = { src: string; alt: string };

/**
 * Images one at a time in a 16:10 frame: a native scroll-snap strip (swipe on
 * touch, shift-scroll or arrow keys once focused) plus previous / next buttons
 * and a counter. No carousel library, so it prerenders as plain HTML.
 *
 * Every slide gets the same frame so the strip doesn't jump to the tallest
 * image's height. `fit="top"` crops to the top of the image (full-page
 * screenshots); `fit="contain"` letterboxes it, for mixed phone and desktop shots.
 */
export function Gallery({
  images,
  label,
  fit = "top",
  priority = false,
}: {
  images: GalleryImage[];
  /** Names the carousel for screen readers, e.g. "Screenshots of Tomo". */
  label: string;
  fit?: "top" | "contain";
  /** Load the first image eagerly, when the gallery is above the fold. */
  priority?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const many = images.length > 1;

  const go = (to: number) => {
    const el = track.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(images.length - 1, to));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={many ? 0 : undefined}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain border border-block bg-default [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, i) => (
          <div key={image.src} className="relative aspect-16/10 w-full shrink-0 snap-start">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority && i === 0}
              sizes="(min-width: 1024px) 760px, 100vw"
              className={fit === "top" ? "object-cover object-top" : "object-contain"}
            />
          </div>
        ))}
      </div>

      {many && (
        <div className="flex items-center justify-between text-sm text-muted">
          <span aria-live="polite">
            {index + 1} / {images.length}
          </span>
          <div className="flex divide-x divide-block border border-block bg-surface">
            <GalleryButton label="Previous image" disabled={index === 0} onClick={() => go(index - 1)}>
              <FaAngleLeft aria-hidden />
            </GalleryButton>
            <GalleryButton label="Next image" disabled={index === images.length - 1} onClick={() => go(index + 1)}>
              <FaAngleRight aria-hidden />
            </GalleryButton>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-9 items-center justify-center text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
