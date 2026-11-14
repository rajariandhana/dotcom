import { Chip } from "@heroui/react";
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";

import { StickyHeading } from "@/components/StickyHeading";
import { HistoryGallery } from "@/components/history/HistoryGallery";
import {
  findTech,
  getHistoryShots,
  histories,
  type HistoryEntry,
} from "@/lib/history";

export const metadata: Metadata = {
  title: "Website History",
};

/*
 * Every version of this website, oldest first, as a timeline. Text and techs
 * come from public/histories.json; screenshots from public/history/<key>/.
 */
export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* The heading must be a direct child of the page column: a sticky element only sticks
          within its parent, so a wrapper around it and the quote would let it scroll away. */}
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">
        Website History
      </StickyHeading>
      <div className="-mt-7 flex flex-col gap-2">
        <p className="text-muted italic">&ldquo;Little trip down memory lane&rdquo;</p>
        <p className="leading-relaxed text-pretty">
          From learning the fundamentals to picking up new frameworks, and from copy-pasting files onto a server to
          shipping through automatic CI/CD, this website has changed a lot over the years. Every version taught me
          something new, and each one shows how I&rsquo;ve grown as a developer.
        </p>
      </div>

      <ol className="flex flex-col">
        {histories.map((entry, i) => (
          <HistoryItem
            key={entry.key}
            entry={entry}
            last={i === histories.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}

async function HistoryItem({
  entry,
  last,
}: {
  entry: HistoryEntry;
  last: boolean;
}) {
  const shots = await getHistoryShots(entry.key);
  const id = `history-${entry.key}`;

  return (
    <li
      aria-labelledby={id}
      className="grid grid-cols-[1.25rem_1fr] gap-x-4 sm:grid-cols-[1.5rem_1fr] sm:gap-x-6"
    >
      {/* Timeline rail: a dot per version, joined by a line down to the next. */}
      <div aria-hidden="true" className="flex flex-col items-center">
        <span
          className={`mt-2 size-3 shrink-0 border-2 ${last ? "border-accent bg-accent" : "border-accent bg-background"}`}
        />
        {!last && <span className="mt-2 w-px flex-1 bg-accent/40" />}
      </div>

      <article className={`flex min-w-0 flex-col gap-4 ${last ? "" : "pb-12"}`}>
        <div className="flex flex-col gap-2">
          <h2 id={id} className="text-xl font-bold sm:text-2xl">
            {entry.label}
          </h2>
          <ul
            aria-label="Technologies"
            className="flex flex-wrap items-center gap-1.5"
          >
            {entry.techs.map((name) => {
              const tech = findTech(name);
              return (
                <li key={name}>
                  <Chip
                    size="sm"
                    variant="soft"
                    color="accent"
                    className="gap-1.5"
                  >
                    {tech && (
                      <Image
                        src={`/tech/${tech.icon}.svg`}
                        alt=""
                        width={14}
                        height={14}
                        unoptimized
                        className="size-3.5"
                      />
                    )}
                    {tech?.name ?? name}
                  </Chip>
                </li>
              );
            })}
          </ul>
        </div>

        {shots.length > 0 && (
          <HistoryGallery shots={shots} label={entry.label} />
        )}

        <p className="border border-block bg-surface p-4 leading-relaxed text-pretty sm:p-5">
          <LinkedText text={entry.text} />
        </p>
      </article>
    </li>
  );
}

// "[label](https://…)" in a history text becomes a link; everything else stays plain text.
const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function LinkedText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    parts.push(text.slice(last, match.index));
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-focus"
      >
        {match[1]}
      </a>,
    );
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}
