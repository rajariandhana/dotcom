import { Card, CardHeader, Image, Skeleton } from "@heroui/react";

import supabase from "../../libs/supabase/supabase";

import { useEffect, useState } from "react";

import { slugToTitle } from "../../utils/util";
import { Link } from "react-router";

export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);

  async function getAlbums() {
    setLoading(true);
    const { data: folders } = await supabase.storage.from("albums").list();

    const albumsData = await Promise.all(
      folders.map(async (folder) => {
        const { data: files } = await supabase.storage
          .from("albums")
          .list(folder.name);

        const links = files.map((file) => {
          const { data } = supabase.storage
            .from("albums")
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

    const result = albumsData.filter(Boolean);
    setAlbums(result);
    setLoading(false);
  }

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <>
      <section>
        <h2 className="mb-2 text-xl cursor-pointer bg w-full mt-6">Albums</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {loading ? (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="rounded-2xl">
                  <div className="size-40 bg-black/50" />
                </Skeleton>
              ))}
            </>
          ) : (
            albums.map((a) => (
              <Card key={a.key} as={Link} to={`/gallery/${a.key}`}>
                <CardHeader className="absolute z-10 top-1 flex-col items-start!">
                  <h4 className="text-white font-medium text-large">
                    {a.label}
                  </h4>
                </CardHeader>
                <Image
                  isZoomed={true}
                  className="z-0 size-40 object-cover"
                  src={a.links[0]}
                />
              </Card>
            ))
          )}
        </ul>
      </section>
    </>
  );
}
