import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LuArrowUpRight } from "react-icons/lu";

import { RemixName } from "@/components/home/RemixName";
import { TileField } from "@/components/home/TileField";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { site } from "@/config/site";
import { techCategories } from "@/config/tech";
import { getFeaturedProjects, projects } from "@/lib/projects";
import { articles, isComingSoon } from "@/lib/writing";

const allTechs = techCategories.flatMap((category) => category.techs);
const dailyStack = allTechs.filter((tech) => tech.core);
const published = articles.filter((article) => !isComingSoon(article));
const latestArticle = published[0];

/*
 * Home. A playful hero (a grid you can light up, a name you can remix), then
 * a bento of cards that each open a corner of the site.
 * Every number and list here is read from the same data as the other pages.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <TileField className="min-h-[22rem] sm:min-h-[26rem]">
        <div className="pointer-events-none flex min-h-[22rem] flex-col justify-end p-5 sm:min-h-[26rem] sm:p-8">
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium text-muted sm:text-xl">Hello, I&apos;m</p>
            <h1 className="pointer-events-auto -ms-1 w-fit text-[clamp(3.5rem,14vw,7.5rem)] leading-[0.85] font-extrabold tracking-tight">
              <RemixName text="Ralfazza" label={site.name} />
              <span aria-hidden className="text-accent">
                .
              </span>
            </h1>
            <p className=" text-base leading-relaxed text-pretty sm:text-lg">
              Software engineer from Indonesia, based in Brisbane, Australia.
							<br className="hidden md:block"/> I love building, breaking, and fixing apps endlessly.
            </p>
          </div>
        </div>
      </TileField>

      <Card>
        <Label>About</Label>
        <p className="leading-relaxed text-pretty">
          I mainly do fullstack web development using modern JavaScript frameworks and creating games on the side. On my free time I have an
          interest in cooking, playing music (piano, ukulele), and basically anything about Pokémon.
        </p>
      </Card>

      <section aria-labelledby="home-projects" className="flex flex-col gap-3 pt-6">
        <div className="flex items-baseline justify-between">
          <h2 id="home-projects" className="text-xl font-bold sm:text-2xl">
            Things I&apos;ve built
          </h2>
          <MoreLink href="/projects">All {projects.length} projects</MoreLink>
        </div>
        <FeaturedProjects projects={getFeaturedProjects()} />
      </section>

      <div className="grid gap-4 pt-2 sm:grid-cols-2">
        <LinkCard href="/tech-tree" label="Daily stack" title="My go to arsenal">
          <ul className="flex flex-wrap gap-2">
            {dailyStack.map((tech) => (
              <li key={tech.name} title={tech.name} className="grid size-10 place-items-center border border-block bg-background">
                <Image src={`/tech/${tech.icon}.svg`} alt={tech.name} width={22} height={22} unoptimized className="size-5.5" />
              </li>
            ))}
          </ul>
        </LinkCard>

        {latestArticle && (
          <LinkCard href={latestArticle.url} external label={`Latest writing · ${latestArticle.published_date}`} title={latestArticle.title}>
            <p className="line-clamp-3 leading-relaxed text-pretty text-muted">{latestArticle.paragraph}</p>
            <span className="text-sm text-muted">Read on Medium ↗</span>
          </LinkCard>
        )}
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-col gap-3 border border-block bg-surface p-5 ${className}`}>{children}</div>;
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-xs font-bold tracking-widest text-accent uppercase">{children}</p>;
}

function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
      {children}
      <LuArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

/** A card that is one big link (the title's link stretches over the whole card). */
function LinkCard({
  href,
  external = false,
  label,
  title,
  children,
}: {
  href: string;
  external?: boolean;
  label: string;
  title: string;
  children: ReactNode;
}) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const Anchor = external ? "a" : Link;
  return (
    <div className="group relative flex flex-col gap-3 border border-block bg-surface p-5 transition-colors hover:border-accent/50">
      <Label>{label}</Label>
      <h3 className="text-lg leading-snug font-semibold text-pretty group-hover:text-accent">
        <Anchor href={href} {...linkProps} className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:outline-focus">
          {title}
        </Anchor>
      </h3>
      {children}
    </div>
  );
}
