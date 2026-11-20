import Link from "next/link";

import { StickyHeading } from "@/components/StickyHeading";
import { getExperiment, type ExperimentSlug } from "@/config/experiments";

const linkClass =
  "rounded-xs font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

/** Title, blurb, a way back to /test and a link to the project the experiment is built on. */
export function ExperimentHeader({ slug }: { slug: ExperimentSlug }) {
  const e = getExperiment(slug);
  return (
    <>
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">{e.title}</StickyHeading>
      <div className="-mt-7 flex flex-col gap-2">
        <p className="max-w-prose leading-relaxed text-pretty">{e.blurb}</p>
        <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link href="/test" className={linkClass}>
            ← All experiments
          </Link>
          <a href={e.source} target="_blank" rel="noreferrer" className={linkClass}>
            Source
          </a>
        </p>
      </div>
    </>
  );
}

/** A plain button in the site's bordered-block style, for experiment controls. */
export const buttonClass =
  "border border-block bg-surface px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50";

export const inputClass =
  "min-w-0 border border-block bg-surface px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";
