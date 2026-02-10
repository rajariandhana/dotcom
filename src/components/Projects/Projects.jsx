import ProjectCard from "../Projects/ProjectCard";
import { useProjectsCategorized } from "../../hooks/projects";
import { Accordion, AccordionItem, Skeleton } from "@heroui/react";

export default function Projects() {
  const { data: projectsByCategory, isPending } = useProjectsCategorized();

  if (isPending || !projectsByCategory) {
    return (
      <section>
        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-7 w-48 mb-4 rounded-md" />
          <Skeleton className="size-6 rounded-full" />
        </div>
        <ul className="grid grid-cols-1 gap-2 w-fit sm:grid-cols-2 md:grid-cols-3 lg:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCard key={i} loading />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <Accordion defaultExpandedKeys={["0", "1", "2"]}>
      {Object.entries(projectsByCategory).map(
        ([category, projectList], index) => (
          <AccordionItem
            key={index}
            title={<h2 className="text-xl cursor-pointer">{category}</h2>}
            aria-label={category}
            className="w-full"
          >
            <ul className="grid grid-cols-1 gap-2 w-fit sm:grid-cols-2 md:grid-cols-3 lg:gap-4 -mt-4">
              {projectList.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </ul>
          </AccordionItem>
        ),
      )}
    </Accordion>
  );
}
