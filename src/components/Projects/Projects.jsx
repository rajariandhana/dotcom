import ProjectCard from "../Projects/ProjectCard";
import { useProjectsCategorized } from "../../hooks/projects";
import { Skeleton } from "@heroui/react";

export default function Projects() {
  const { data: projectsByCategory, isPending } = useProjectsCategorized();

  if (isPending || !projectsByCategory) {
    return (
      <section>
        <Skeleton className="h-7 w-48 mb-4 rounded-md" />
        <ul className="grid grid-cols-1 gap-2 w-fit sm:grid-cols-2 md:grid-cols-3 md:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCard key={i} loading />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <>
      {Object.entries(projectsByCategory).map(([category, projectList]) => (
        <section key={category}>
          <h2 className="mb-2 text-xl cursor-pointer">{category}</h2>
          <ul className="grid grid-cols-1 gap-2 w-fit sm:grid-cols-2 md:grid-cols-3 md:gap-4">
            {projectList.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
