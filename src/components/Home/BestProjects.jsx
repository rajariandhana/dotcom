import { useEffect, useState, useCallback } from "react";
import ProjectCard from "../Projects/ProjectCard";

export default function BestProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const slugs = ["boombatag-2024", "box-of-curiosity", "studykanji"];

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/projects.json");

      if (!res.ok) throw new Error("Failed to load /projects.json");

      const data = await res.json();

      const filtered = slugs
        .map((slug) => data.find((p) => p.slug === slug))
        .filter(Boolean);

      setProjects(filtered);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Could not load projects.");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    fetchProjects();

    return () => {
      active = false;
    };
  }, [fetchProjects]);

  return (
    <section className="w-full">
      <h2 className="mb-2 text-xl cursor-pointer">🚀 Favorite Projects</h2>

      {error && <p className="text-red-500">{error}</p>}

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
