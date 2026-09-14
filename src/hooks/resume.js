import { useQuery } from "@tanstack/react-query";

const logoPath = (key) => (key ? `/experience/${key}.webp` : null);

const fetchResume = async () => {
  try {
    const publicResume = await (await fetch("/resume.json")).json();

    publicResume.education = publicResume.education.map((edu) => ({
      ...edu,
      image_link: logoPath(edu.key),
    }));

    publicResume.experience = publicResume.experience.map((exp) => ({
      ...exp,
      image_link: logoPath(exp.company_key),
    }));

    return publicResume;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw error;
  }
};

export function useResume() {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["resume"],
    queryFn: fetchResume,
  });
}
