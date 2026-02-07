import { useEffect, useState } from "react";
import ProjectCard from "../Projects/ProjectCard";

export default function BestProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const slugs = ["boombatag-2024", "box-of-curiosity", "studykanji"];

  const fetchProjects = async () => {
    try {
      const res = await fetch("/projects.json");
      const data = await res.json();

      const filtered = slugs.map(
        (slug) => data.find((p) => p.slug === slug) || {}
      );
      setProjects(filtered);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="w-full">
      <h2 className="mb-2 text-xl cursor-pointer">🚀 Favorite Projects</h2>

      <div className="flex flex-col items-center justify-between w-full gap-2 sm:flex-row">
        {(loading ? Array.from({ length: 3 }) : projects).map(
          (project, index) => (
            <ProjectCard
              key={project?.slug || index}
              project={project}
              loading={loading}
            />
          )
        )}
      </div>
    </section>
  );
}
