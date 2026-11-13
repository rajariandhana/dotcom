import { Chip } from "@heroui/react";
import Image from "next/image";

import { projectImage, type Project } from "@/lib/projects";

import { ProjectLink } from "./ProjectLink";

/** A row in the project list: thumbnail, name, clamped description, tech chips. */
export function ProjectCard({ project }: { project: Project }) {
  const image = projectImage(project);
  return (
    <ProjectLink
      project={project}
      className="group flex gap-3 bg-surface p-2.5 text-foreground border border-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:gap-5 sm:p-3"
    >
      <div className="relative aspect-4/3 w-28 shrink-0 self-start overflow-hidden bg-default sm:w-48">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 640px) 192px, 112px"
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2">
        <h3 className="text-base leading-tight font-semibold group-hover:text-accent sm:text-xl">
          {project.name}
        </h3>
        {/* Cut off with an ellipsis once it runs past the space it has. */}
        <p className="line-clamp-2 text-sm leading-snug text-muted sm:line-clamp-3 sm:text-base">
          {project.description}
        </p>
        {project.techs.length > 0 && (
          <ul aria-label="Technologies" className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {project.techs.map((tech) => (
              <li key={tech}>
                <Chip size="sm" variant="soft" color="accent">
                  {tech}
                </Chip>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProjectLink>
  );
}
