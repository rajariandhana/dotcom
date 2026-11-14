import { Chip } from "@heroui/react";
import type { Metadata } from "next";
import { FaArrowUpRightFromSquare, FaMedium } from "react-icons/fa6";

import { StickyHeading } from "@/components/StickyHeading";
import { articles, isComingSoon, mediumProfile, type Article } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/*
 * My Medium articles from public/medium.json, carried over from the previous
 * site's "I have a blog on Medium" section. Published ones link to the
 * article; upcoming ones are listed with a "Coming soon" chip.
 */
export default function WritingPage() {
  const published = articles.filter((article) => !isComingSoon(article));
  const upcoming = articles.filter(isComingSoon);

  return (
    <div className="flex flex-col gap-10">
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">Writing</StickyHeading>
      {/* Pulled up under the title like the other page intros; kept a sibling so the title still sticks. */}
      <p className="-mt-7 leading-relaxed text-pretty">
        I write on{" "}
        <a
          href={mediumProfile}
          {...external}
          className="inline-flex items-center gap-1 text-accent underline underline-offset-2 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-focus"
        >
          <FaMedium aria-hidden className="size-4" />
          Medium
        </a>{" "}
        about programming, games and the things I build along the way.
      </p>

      <ol className="flex flex-col gap-4">
        {published.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </ol>

      {upcoming.length > 0 && (
        <section aria-labelledby="writing-upcoming" className="flex flex-col gap-4">
          <h2 id="writing-upcoming" className="text-xl font-bold sm:text-2xl">
            In the works
          </h2>
          <ul className="flex flex-col divide-y divide-block border border-block bg-surface">
            {upcoming.map((article) => (
              <li key={article.title} className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
                <span className="font-medium">{article.title}</span>
                <Chip size="sm" variant="soft" color="accent" className="shrink-0">
                  Coming soon
                </Chip>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

/** A published article: title, date and the opening paragraph, linking to it on Medium. */
function ArticleCard({ article }: { article: Article }) {
  return (
    <li className="group relative flex flex-col gap-2 border border-block bg-surface p-4 transition-colors hover:border-accent/50 sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h2 className="text-lg leading-snug font-semibold text-pretty group-hover:text-accent">
          {/* The link covers the whole card, so anywhere on it opens the article. */}
          <a
            href={article.url}
            {...external}
            className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:outline-focus"
          >
            {article.title}
          </a>
        </h2>
        <time className="shrink-0 text-sm whitespace-nowrap text-muted">{article.published_date}</time>
      </div>
      <p className="line-clamp-3 leading-relaxed text-pretty text-muted">{article.paragraph}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        Read on Medium
        <FaArrowUpRightFromSquare aria-hidden className="size-3" />
        <span className="sr-only">(opens in a new tab)</span>
      </span>
    </li>
  );
}
