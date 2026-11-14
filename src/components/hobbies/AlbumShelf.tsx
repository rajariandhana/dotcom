"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import type { Album } from "@/lib/hobbies";

// How the three photos of a closed album sit in their stack, and how they fan out on hover.
const stack = [
  "-rotate-6 group-hover:-translate-x-[18%] group-hover:-rotate-12",
  "rotate-3 group-hover:rotate-1 group-hover:-translate-y-[6%]",
  "rotate-[9deg] group-hover:translate-x-[18%] group-hover:rotate-[16deg]",
];

/**
 * A shelf of photo albums, each a little fanned stack of prints that spreads
 * out on hover. Picking one opens it in the viewer underneath: the whole photo
 * (never cropped), previous / next, a strip of thumbnails, and arrow keys.
 */
export function AlbumShelf({ albums }: { albums: Album[] }) {
  const [albumIndex, setAlbumIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const album = albums[albumIndex];
  const photo = album?.photos[photoIndex];

  const open = (index: number) => {
    setAlbumIndex(index);
    setPhotoIndex(0);
  };
  const step = (by: number) =>
    setPhotoIndex((i) => (i + by + album.photos.length) % album.photos.length);

  // Arrow keys flip through the open album (unless you're typing somewhere).
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, [contenteditable]")) return;
      if (event.key === "ArrowRight") setPhotoIndex((i) => (i + 1) % album.photos.length);
      if (event.key === "ArrowLeft") setPhotoIndex((i) => (i - 1 + album.photos.length) % album.photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [album]);

  if (!album || !photo) return null;

  return (
    <div className="flex flex-col gap-6">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {albums.map((a, i) => (
          <li key={a.slug}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-pressed={i === albumIndex}
              className="group flex w-full flex-col items-center gap-3 rounded-sm p-2 focus-visible:outline-2 focus-visible:outline-focus"
            >
              <span className="relative block aspect-square w-[78%]">
                {a.photos.slice(0, 3).map((p, layer) => (
                  <span
                    key={p.src}
                    className={`absolute inset-0 border-[5px] border-white bg-white shadow-none ring-1 ring-block transition-transform duration-300 ease-out motion-reduce:transition-none ${stack[layer]}`}
                  >
                    <Image src={p.src} alt="" fill sizes="(min-width: 640px) 200px, 40vw" className="object-cover" />
                  </span>
                ))}
              </span>
              <span className="flex flex-col items-center">
                <span className={`font-semibold ${i === albumIndex ? "text-accent" : "group-hover:text-accent"}`}>{a.label}</span>
                <span className="text-xs text-muted">{a.photos.length} photos</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <figure className="flex flex-col gap-3 border border-block bg-surface p-3 sm:p-4" aria-live="polite">
        <div className="relative aspect-[3/2] w-full bg-default">
          <Image
            key={photo.src}
            src={photo.src}
            alt={`${album.label}, photo ${photoIndex + 1} of ${album.photos.length}`}
            fill
            sizes="(min-width: 1024px) 780px, 100vw"
            className="object-contain"
          />
          <ViewerButton side="left" label="Previous photo" onClick={() => step(-1)} />
          <ViewerButton side="right" label="Next photo" onClick={() => step(1)} />
        </div>
        <figcaption className="flex items-center justify-between gap-4 text-sm">
          <span className="font-semibold">{album.label}</span>
          <span className="text-muted tabular-nums">
            {photoIndex + 1} / {album.photos.length}
          </span>
        </figcaption>
        <ul className="flex gap-2 overflow-x-auto pb-1">
          {album.photos.map((p, i) => (
            <li key={p.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setPhotoIndex(i)}
                aria-label={`Photo ${i + 1}`}
                aria-current={i === photoIndex}
                className={`relative block size-14 overflow-hidden border-2 transition-opacity focus-visible:outline-2 focus-visible:outline-focus ${i === photoIndex ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <Image src={p.src} alt="" fill sizes="56px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}

function ViewerButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  const Icon = side === "left" ? LuChevronLeft : LuChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center border border-block bg-surface/85 text-foreground backdrop-blur-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-focus ${side === "left" ? "left-2" : "right-2"}`}
    >
      <Icon aria-hidden className="size-5" />
    </button>
  );
}
