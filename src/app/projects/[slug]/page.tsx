import { existsSync } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getProject, projectsWithPages } from "@/lib/projects";

/*
 * One page per project in public/projects.json, generated from its entry:
 * add a project to the JSON (and its images to public/projects/<slug>/) and
 * it gets a page here on the next build, with no file to write.
 *
 * To give a project a hand-made page instead, create
 * app/projects/<slug>/page.tsx. A folder with a fixed name always wins over
 * this [slug] route, so that page replaces this one for that project only.
 * It can reuse the pieces in components/projects/ProjectDetail.tsx and read
 * its entry with getProject("<slug>"), so the JSON stays the one source for
 * name, techs, links and images.
 */

export function generateStaticParams() {
  return projectsWithPages()
    // Skip projects with their own page folder; that page is the one served.
    .filter((project) => !existsSync(path.join(process.cwd(), "src/app/projects", project.slug, "page.tsx")))
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project && !project.external ? { title: project.name, description: project.description } : {};
}

// The slug is URL data, so it's read inside Suspense rather than in the shared
// shell (see the Partial Prefetching guide). Project links prefetch the page,
// so in production the content is usually there before the click.
export default function ProjectRoute({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense>
      <Project params={params} />
    </Suspense>
  );
}

async function Project({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const project = getProject((await params).slug);
  // Unknown slug, or one that lives on its own site.
  if (!project || project.external) notFound();
  return <ProjectDetail project={project} />;
}
