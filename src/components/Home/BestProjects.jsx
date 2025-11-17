import { useEffect, useState } from "react";
import ProjectCard from "../Projects/ProjectCard";
export default function BestProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const slugs = ["boombatag-2024", "box-of-curiosity", "studykanji"];

  const fetchProjects = async () => {
    // const response = await instance.get("/projects");
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((project) => slugs.includes(project.slug));
        setProjects(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        // setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="w-full">
      <h2 className="mb-2 text-xl cursor-pointer">🚀 Favorite Projects</h2>
      <div className="flex flex-col items-center justify-between w-full gap-2 sm:flex-row">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
