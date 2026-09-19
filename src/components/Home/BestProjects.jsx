import ProjectCard from "../Projects/ProjectCard";
import { useProject } from "../../hooks/projects";
import AppearSection from "../AppearSection";
import { DrawablyUnderline } from "drawably/react";
import H2Drawably from "../H2Drawably";

export default function BestProjects() {
  const { data: project_1, isPending: pending_1 } =
    useProject("tomo");
  const { data: project_2, isPending: pending_2 } =
    useProject("bitmore");
  const { data: project_3, isPending: pending_3 } =
    useProject("ashes-of-alengka");

  return (
    <AppearSection className="w-full">
		{/* <H2Drawably label={"My Proudest Projects"} /> */}
      <h2 className="mb-2 text-xl cursor-pointer">My Proudest Projects</h2>

      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 lg:gap-4">
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
    </AppearSection>
  );
}
