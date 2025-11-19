import { useEffect, useState } from "react";
import ProjectCard from "../Projects/ProjectCard";

export default function BestProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const slugs = ["boombatag-2024", "box-of-curiosity", "studykanji"];

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const fetchProjects = async () => {
    setLoading(true);

    // await delay(1500);

    try {
      const res = await fetch("/projects.json");
      const data = await res.json();

      const filtered = data.filter((project) => slugs.includes(project.slug));
      setProjects(filtered);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="w-full">
      <h2 className="mb-2 text-xl cursor-pointer">🚀 Favorite Projects</h2>

      <div className="flex flex-col items-center justify-between w-full gap-2 sm:flex-row">
        {(loading ? Array(3).fill({}) : projects).map((project, index) => (
          <ProjectCard
            key={project.id || index}
            project={project}
            loading={loading}
          />
        ))}
      </div>
    </section>
  );
}
