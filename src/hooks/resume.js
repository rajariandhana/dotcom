import { useQuery } from "@tanstack/react-query";
import supabase from "../libs/supabase/supabase";

const BUCKET = "companies";

const fetchResume = async () => {
  try {
    const publicResume = await (await fetch("/resume.json")).json();

    const { data: files, error } = await supabase.storage.from(BUCKET).list();

    if (error) throw error;

    const imageMap = {};

    files.forEach((file) => {
      const key = file.name.split(".")[0];

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(file.name);

      imageMap[key] = data.publicUrl;
    });

    publicResume.education = publicResume.education.map((edu) => ({
      ...edu,
      image_link: imageMap[edu.key] || null,
    }));

    publicResume.experience = publicResume.experience.map((exp) => ({
      ...exp,
      image_link: imageMap[exp.employer_key] || null,
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
    queryKey: ["albums"],
    queryFn: fetchResume,
  });
}
