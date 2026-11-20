import type { Metadata } from "next";
import Link from "next/link";

import { StickyHeading } from "@/components/StickyHeading";
import { experiments } from "@/config/experiments";

export const metadata: Metadata = {
  title: "Test",
};

/** Index of the playground: one entry per experiment, with the project it's built on. */
export default function TestPage() {
  return (
    <div className="flex flex-col gap-10">
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">Test</StickyHeading>
      <p className="-mt-7 max-w-prose leading-relaxed text-pretty">
        A playground for trying out other people&apos;s fun projects. Nothing here is finished.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2">
        {experiments.map((e) => (
          <li key={e.slug} className="flex flex-col gap-3 border border-block bg-surface p-4 sm:p-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">
                <Link
                  href={`/test/${e.slug}`}
                  className="rounded-xs underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {e.title}
                </Link>
              </h2>
              <p className="text-sm text-muted">{e.blurb}</p>
            </div>
            <a
              href={e.source}
              target="_blank"
              rel="noreferrer"
              className="mt-auto self-start rounded-xs text-sm font-medium break-all text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {e.source.replace(/^https:\/\//, "").replace(/\/$/, "")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
