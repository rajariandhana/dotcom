import { useQuery, useQueryClient } from "@tanstack/react-query";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const categoryMap = {
  "🎮 Game Development": (project) => project.category === "game",
  "🌐 Web Development": (project) => project.category === "web",
  "💡 Other Projects": (project) => !["game", "web"].includes(project.category),
};

const fetchProjectsCategorized = async () => {
  try {
    // await sleep(1500);
    const res = await fetch("/projects.json");
    const data = await res.json();
    const categorized = {};
    for (const [label, fn] of Object.entries(categoryMap)) {
      categorized[label] = data.filter(fn);
    }
    return categorized;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export function useProjectsCategorized() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["projectsByCategory"],
    queryFn: fetchProjectsCategorized,
    select: (projectsByCategory) => {
      Object.values(projectsByCategory).forEach((projectList) => {
        projectList.forEach((project) => {
          queryClient.setQueryData(["project", project.slug], project);
        });
      });
      return projectsByCategory;
    },
  });
}

const fetchProjectBySlug = async (slug) => {
  // await sleep(1500);
  const res = await fetch("/projects.json");
  const data = await res.json();

  const project = data.find((p) => p.slug === slug);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

export function useProject(project_slug) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["project", project_slug],

    initialData: () => {
      const cached = queryClient.getQueryData(["project", project_slug]);
      if (cached) return cached;

      const categorized = queryClient.getQueryData(["projectsByCategory"]);

      if (!categorized) return undefined;

      for (const projectList of Object.values(categorized)) {
        const found = projectList.find((p) => p.slug === project_slug);
        if (found) return found;
      }

      return undefined;
    },

    queryFn: () => fetchProjectBySlug(project_slug),

    enabled: !!project_slug,
  });
}
