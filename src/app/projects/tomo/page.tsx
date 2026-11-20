import type { Metadata } from "next";

import { BackToProjects } from "@/components/projects/BackToProjects";
import { Tomo } from "@/components/projects/tomo/Tomo";
import { getProject } from "@/lib/projects";

/*
 * Hand-made page for Tomo; replaces the generated /projects/[slug] one. The
 * demo and repo links come from projects.json. data-full-bleed lets it fill
 * the content area edge to edge (see globals.css); @container makes its
 * breakpoints follow that area's width rather than the viewport's.
 */
const project = getProject("tomo")!;

export const metadata: Metadata = {
  title: project.name,
  description: project.description,
};

export default function TomoPage() {
  return (
    <div data-full-bleed className="@container">
      <BackToProjects />
      <Tomo demo={project.demo || undefined} repo={project.repo || undefined} />
    </div>
  );
}
