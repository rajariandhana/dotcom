import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";

import { StickyHeading } from "@/components/StickyHeading";
import { education, formatRange, logoPath, work, type Education, type Work } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Experience",
};

/*
 * Education and work history from public/resume.json, with organisation logos
 * from public/experience/. Same content and order as the previous site.
 */
export default function ExperiencePage() {
  return (
    <div className="flex flex-col gap-10">
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">Experience</StickyHeading>

      <Section title="Education">
        {education.map((item) => (
          <EducationCard key={item.key} item={item} />
        ))}
      </Section>

      <Section title="Work">
        {work.map((item) => (
          <WorkCard key={`${item.company_key}-${item.position}`} item={item} />
        ))}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const id = `experience-${title.toLowerCase()}`;
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id} className="text-xl font-bold sm:text-2xl">
        {title}
      </h2>
      <ol className="flex flex-col gap-4">{children}</ol>
    </section>
  );
}

/**
 * Shared card frame: logo, a title and subtitle, and the dates and place —
 * beside the title on wider screens, under it on phones.
 */
function Card({
  logo,
  title,
  subtitle,
  href,
  date,
  location,
  children,
}: {
  logo: string;
  title: string;
  subtitle: string;
  href: string;
  date: string;
  location: string;
  children: ReactNode;
}) {
  return (
    <li className="flex flex-col gap-4 border border-block bg-surface p-4 sm:p-5">
      <div className="flex gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center border border-block bg-white p-1 sm:size-14">
          <Image src={logo} alt="" width={56} height={56} className="size-full object-contain" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6">
          <div className="flex min-w-0 flex-col">
            <h3 className="text-base leading-snug font-semibold sm:text-lg">{title}</h3>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-focus"
            >
              {subtitle}
            </a>
          </div>
          <div className="flex shrink-0 flex-col text-sm text-muted sm:items-end sm:text-right">
            <span className="whitespace-nowrap">{formatRange(date)}</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
      {children}
    </li>
  );
}

function EducationCard({ item }: { item: Education }) {
  return (
    <Card
      logo={logoPath(item.key)}
      title={item.degree}
      subtitle={item.university}
      href={item.link}
      date={item.date}
      location={item.location}
    >
      <dl className="flex flex-col gap-3 text-sm">
        <div className="flex gap-2">
          <dt className="font-semibold">GPA</dt>
          <dd>{item.gpa}</dd>
        </div>
        <div className="flex flex-col gap-1.5">
          <dt className="font-semibold">Notable coursework</dt>
          <dd>
            <ul className="list-disc gap-x-8 ps-5 leading-relaxed marker:text-accent sm:columns-2">
              {item.coursework.map((course) => (
                <li key={course} className="break-inside-avoid">
                  {course}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </Card>
  );
}

function WorkCard({ item }: { item: Work }) {
  return (
    <Card
      logo={logoPath(item.company_key)}
      title={item.position}
      subtitle={item.company}
      href={item.company_site}
      date={item.date}
      location={item.location}
    >
      <ul className="flex list-disc flex-col gap-1.5 ps-5 text-sm leading-relaxed text-pretty marker:text-accent sm:text-base">
        {item.description.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </Card>
  );
}
