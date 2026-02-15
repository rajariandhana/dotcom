import { useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../libs/supabase/supabase";

const BUCKET_HISTORY = "history";

const fetchHistories = async () => {
  try {
    const publicHistories = await (await fetch("/histories.json")).json();

    const { data: folders, error } = await supabase.storage
      .from(BUCKET_HISTORY)
      .list();

    if (error) throw error;

    const historiesWithImages = await Promise.all(
      folders.map(async (folder) => {
        const { data: files, error } = await supabase.storage
          .from(BUCKET_HISTORY)
          .list(folder.name);

        if (error) throw error;

        const links = files.map((file) => {
          const { data } = supabase.storage
            .from(BUCKET_HISTORY)
            .getPublicUrl(`${folder.name}/${file.name}`);

          return data.publicUrl;
        });

        return {
          key: folder.name,
          number_images: links.length,
          links,
        };
      }),
    );

    const merged = publicHistories.map((item) => {
      const imagesData = historiesWithImages.find(
        (history) => history.key === item.key,
      );

      return {
        ...item,
        number_images: imagesData?.number_images ?? 0,
        links: imagesData?.links ?? [],
      };
    });

    return merged;
  } catch (error) {
    console.error("Error fetching histories:", error);
    return [];
  }
};

export function useHistories() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["histories"],
    queryFn: fetchHistories,
    select: (histories) => {
      histories.forEach((history) =>
        queryClient.setQueryData(["histories", history.label], history),
      );
      return histories;
    },
  });
}
