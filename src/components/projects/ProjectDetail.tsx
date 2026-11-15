import Link from "next/link";
import type { ReactNode } from "react";
import { FaAngleLeft, FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";

import { Gallery } from "@/components/Gallery";
import { StickyHeading } from "@/components/StickyHeading";
import { TechChips } from "@/components/TechChips";
import { projectGallery, type Project } from "@/lib/projects";

/*
 * Building blocks for a project page. The generic page at /projects/[slug]
 * stacks them in order (<ProjectDetail>); a dedicated page such as
 * app/projects/tomo/page.tsx can use the same pieces and put its own
 * interactive sections between them.
 */

/** The default page for a project: everything in projects.json, nothing custom. */
export function ProjectDetail({ project }: { project: Project }) {
  return (
    <ProjectPage project={project}>
      <ProjectGallery project={project} />
      <ProjectDescription project={project} />
    </ProjectPage>
  );
}

/**
 * Page shell: back link, sticky project name, techs and links. Children go
 * below it. The heading stays a direct child of the page column so it sticks.
 */
export function ProjectPage({ project, children }: { project: Project; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-10">
      <Link
        href="/projects"
        className="-mb-6 flex w-fit items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-focus"
      >
        <FaAngleLeft aria-hidden className="size-3" />
        All projects
      </Link>

      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">{project.name}</StickyHeading>

      {/* Pulled up under the title like the other page intros. */}
      <div className="-mt-7 flex flex-col gap-4">
        <TechChips techs={project.techs} />
        <ProjectLinks project={project} />
      </div>

      {children}
    </div>
  );
}

/** "Try it" and "Source code", for whichever of `demo` and `repo` the project has. */
export function ProjectLinks({ project }: { project: Project }) {
  if (!project.demo && !project.repo) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {project.demo && (
        <ExternalButton href={project.demo} primary icon={<FaArrowUpRightFromSquare aria-hidden className="size-3" />}>
          Try it
        </ExternalButton>
      )}
      {project.repo && (
        <ExternalButton href={project.repo} icon={<FaGithub aria-hidden className="size-3.5" />}>
          Source code
        </ExternalButton>
      )}
    </div>
  );
}

export function ProjectGallery({ project }: { project: Project }) {
  const images = projectGallery(project);
  if (images.length === 0) return null;
  return <Gallery images={images} label={`Images of ${project.name}`} fit="contain" priority />;
}

export function ProjectDescription({ project }: { project: Project }) {
  if (!project.description) return null;
  return (
    <p className="border border-block bg-surface p-4 leading-relaxed text-pretty sm:p-5">{project.description}</p>
  );
}

function ExternalButton({
  href,
  primary = false,
  icon,
  children,
}: {
  href: string;
  primary?: boolean;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex h-9 items-center gap-2 border px-3.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
        primary
          ? "border-accent bg-accent text-accent-foreground hover:opacity-90"
          : "border-block bg-surface text-foreground hover:text-accent"
      }`}
    >
      {children}
      {icon}
    </a>
  );
}
