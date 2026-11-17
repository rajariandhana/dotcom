import type { GalleryImage } from "@/components/Gallery";
import { featuredProjectSlugs } from "@/config/projects";

import projectsData from "../../public/projects.json";

/** One entry in public/projects.json. */
export type Project = {
  name: string;
  slug: string;
  description: string;
  techs: string[];
  images: string[];
  cover?: string;
  /** The project has its own site; link there instead of /projects/<slug>. */
  external?: string;
  repo?: string;
  demo?: string;
  size?: string;
  category?: string;
  year: number;
  /** Kind of work, e.g. "personal" or "university project". Free text; the filter lists whatever is used. */
  type?: string;
  /** Set to false to keep a project in projects.json without showing it anywhere. */
  enabled?: boolean;
};

/** All enabled projects, in the order they appear in projects.json (newest year first). */
export const projects: readonly Project[] = (projectsData as Project[]).filter(
  (project) => project.enabled !== false,
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Projects for the featured block. Fails the build if a slug doesn't exist. */
export function getFeaturedProjects(): Project[] {
  return featuredProjectSlugs.map((slug) => {
    const project = getProject(slug);
    if (!project) {
      throw new Error(`Featured project "${slug}" is not in public/projects.json.`);
    }
    return project;
  });
}

/** First gallery image, falling back to `cover` (same rule as the old site). */
export function projectImage(project: Project): string | undefined {
  return project.images[0] ?? project.cover;
}

/** Where a project links: its own site if it has one, else its detail page. */
export function projectHref(project: Project): { href: string; external: boolean } {
  return project.external
    ? { href: project.external, external: true }
    : { href: `/projects/${project.slug}`, external: false };
}

/** Gallery images for the detail page: `images`, or just `cover` when there are none. */
export function projectGallery(project: Project): GalleryImage[] {
  const srcs = project.images.length > 0 ? project.images : project.cover ? [project.cover] : [];
  return srcs.map((src, i) => ({ src, alt: `${project.name}, image ${i + 1} of ${srcs.length}` }));
}

/** Projects that get a page at /projects/<slug> (the rest link to their own site). */
export function projectsWithPages(): Project[] {
  return projects.filter((project) => !project.external);
}
