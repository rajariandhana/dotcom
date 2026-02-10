import { useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../libs/supabase/supabase";
import { slugToTitle } from "../utils/util";

const BUCKET_ALBUM = "albums";

const fetchAlbums = async () => {
  try {
    const { data: folders } = await supabase.storage.from(BUCKET_ALBUM).list();
    const albumsData = await Promise.all(
      folders.map(async (folder) => {
        const { data: files } = await supabase.storage
          .from(BUCKET_ALBUM)
          .list(folder.name);

        const links = files.map((file) => {
          const { data } = supabase.storage
            .from(BUCKET_ALBUM)
            .getPublicUrl(`${folder.name}/${file.name}`);

          return data.publicUrl;
        });

        return {
          key: folder.name,
          label: slugToTitle(folder.name),
          number_images: links.length,
          links,
        };
      }),
    );
    return albumsData.filter(Boolean);
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
};

export function useAlbums() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["albums"],
    queryFn: fetchAlbums,
    select: (albums) => {
      albums.forEach((album) =>
        queryClient.setQueryData(["albums", album.name], album),
      );
      return albums;
    },
  });
}

const fetchAlbum = async (album_name) => {
  if (!album_name) return null;

  try {
    const { data: files, error } = await supabase.storage
      .from(BUCKET_ALBUM)
      .list(album_name);

    if (error) throw error;

    const links = files.map((file) => {
      const { data } = supabase.storage
        .from(BUCKET_ALBUM)
        .getPublicUrl(`${album_name}/${file.name}`);

      return data.publicUrl;
    });

    return {
      key: album_name,
      label: slugToTitle(album_name),
      number_images: links.length,
      links,
    };
  } catch (error) {
    console.error("Error fetching album:", error);
    throw error;
  }
};

export function useAlbum(album_name) {
  return useQuery({
    queryKey: ["albums", album_name],
    queryFn: () => fetchAlbum(album_name),
    enabled: !!album_name,
  });
}
