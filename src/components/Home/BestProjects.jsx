import ProjectCard from "../Projects/ProjectCard";
import { useProject } from "../../hooks/projects";

export default function BestProjects() {
  const { data: project_1, isPending: pending_1 } =
    useProject("boombatag-2024");
  const { data: project_2, isPending: pending_2 } =
    useProject("box-of-curiosity");
  const { data: project_3, isPending: pending_3 } = useProject("qq-joker");

  return (
    <section className="w-full">
      <h2 className="mb-2 text-xl cursor-pointer">🚀 Favorite Projects</h2>

      <div className="flex flex-col items-center justify-between w-full gap-2 lg:gap-4 sm:flex-row">
        {pending_1 || pending_2 || pending_3 ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCard key={i} loading />
            ))}
          </>
        ) : (
          <>
            <ProjectCard project={project_1} />
            <ProjectCard project={project_2} />
            <ProjectCard project={project_3} />
          </>
        )}
      </div>
    </section>
  );
}
