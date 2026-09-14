import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sleep } from "../utils/util";

const categoryMap = {
  "🎮 Game Development": (project) => project.category === "game",
  "🌐 Web Development": (project) => project.category === "web",
  "💡 Other Projects": (project) => !["game", "web"].includes(project.category),
};

const fetchProjectsCategorized = async () => {
	// await sleep(1500);
  const res = await fetch("/projects.json");
  const data = await res.json();

  const categorized = {};

  for (const [label, fn] of Object.entries(categoryMap)) {
    categorized[label] = data.filter(fn).map((project) => ({
      ...project,
      images: project.images ?? [],
    }));
  }

  return categorized;
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
  const res = await fetch("/projects.json");
  const data = await res.json();

  const project = data.find((p) => p.slug === slug);

  if (!project) throw new Error("Project not found");

  return {
    ...project,
    images: project.images ?? [],
  };
};

export function useProject(project_slug) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["project", project_slug],

    initialData: () => {
      const cached = queryClient.getQueryData(["project", project_slug]);
      return cached;
    },

    queryFn: () => fetchProjectBySlug(project_slug),

    enabled: !!project_slug,

    staleTime: 0,

    refetchOnMount: (query) => {
      const data = query.state.data;
      return !data || !data.images;
    },
  });
}
