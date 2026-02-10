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
    console.log(categorized);
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
