import ProjectCard from "../Projects/ProjectCard";
export default function BestProjects() {
  return (
    <section className="w-full">
      <h2 className="mb-2 text-xl cursor-pointer">🚀 Favorite Projects</h2>
        <div className="flex flex-col items-center justify-between w-full gap-2 sm:flex-row">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>
    </section>
  );
}