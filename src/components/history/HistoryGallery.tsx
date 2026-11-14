"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import type { HistoryShot } from "@/lib/history";

/**
 * Screenshots of one version of the site, one at a time in a 16:10 frame: a native scroll-snap
 * strip (swipe on touch, shift-scroll or arrow keys once focused) plus
 * previous / next buttons and a counter. No carousel library, so it
 * prerenders as plain HTML.
 */
export function HistoryGallery({ shots, label }: { shots: HistoryShot[]; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const many = shots.length > 1;

  const go = (to: number) => {
    const el = track.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(shots.length - 1, to));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label={`Screenshots of the ${label} site`}
        tabIndex={many ? 0 : undefined}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain border border-block bg-default [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((shot, i) => (
          // Every slide gets the same 16:10 frame, showing the top of the page,
          // so the strip doesn't jump to the tallest screenshot's height.
          <div key={shot.src} className="relative aspect-16/10 w-full shrink-0 snap-start">
            <Image
              src={shot.src}
              alt={`${label}, screenshot ${i + 1} of ${shots.length}`}
              fill
              sizes="(min-width: 1024px) 760px, 100vw"
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>

      {many && (
        <div className="flex items-center justify-between text-sm text-muted">
          <span aria-live="polite">
            {index + 1} / {shots.length}
          </span>
          <div className="flex divide-x divide-block border border-block bg-surface">
            <GalleryButton label="Previous screenshot" disabled={index === 0} onClick={() => go(index - 1)}>
              <FaAngleLeft aria-hidden />
            </GalleryButton>
            <GalleryButton label="Next screenshot" disabled={index === shots.length - 1} onClick={() => go(index + 1)}>
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
