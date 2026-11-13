import type { Metadata } from "next";

import { StickyHeading } from "@/components/StickyHeading";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { getFeaturedProjects, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
};

/*
 * Layout from Figma (Personal › ralfazza.com › "Content"). Projects come from
 * public/projects.json; the featured ones are listed in src/config/projects.ts.
 */
export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-10">
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">Projects</StickyHeading>

      <FeaturedProjects projects={getFeaturedProjects()} />

      <ProjectExplorer projects={projects} />
    </div>
  );
}
