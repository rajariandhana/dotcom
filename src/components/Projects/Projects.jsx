import { useEffect, useState } from "react";
import ProjectCard from "../Projects/ProjectCard";

const categoryMap = {
  "🎮 Game Development": (project) => project.category === "game",
  "🌐 Web Development": (project) => project.category === "web",
  "💡 Other Projects": (project) => !["game", "web"].includes(project.category),
};

export default function Projects() {
  const [projectsByCategory, setProjectsByCategory] = useState({
    "🎮 Game Development": [],
    "🌐 Web Development": [],
    "💡 Other Projects": [],
  });
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/projects.json");
      const data = await res.json();

      const categorized = {};
      for (const [label, fn] of Object.entries(categoryMap)) {
        categorized[label] = data.filter(fn);
      }

      setProjectsByCategory(categorized);
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
    <>
      {Object.entries(projectsByCategory).map(([category, projectList]) => (
        <section key={category}>
          <h2 className="mb-2 text-xl cursor-pointer">{category}</h2>
          <ul className="grid grid-cols-1 gap-2 w-fit sm:grid-cols-2 md:grid-cols-3 md:gap-4">
            {(loading ? Array.from({ length: 3 }) : projectList).map(
              (project, index) => (
                <ProjectCard
                  key={project?.slug || index}
                  project={project || {}}
                  loading={loading}
                />
              )
            )}
          </ul>
        </section>
      ))}
    </>
  );
}
