import type { Metadata } from "next";

import { BackToProjects } from "@/components/projects/BackToProjects";
import { BitMore } from "@/components/projects/bitmore/BitMore";
import { getProject } from "@/lib/projects";

/*
 * Hand-made page for bitmore; replaces the generated /projects/[slug] one.
 * data-full-bleed lets it fill the content area edge to edge (see globals.css).
 */
const project = getProject("bitmore")!;

export const metadata: Metadata = {
  title: project.name,
  description: project.description,
};

export default function BitmorePage() {
  return (
    <div data-full-bleed className="@container">
      <BackToProjects />
      <BitMore />
    </div>
  );
}
