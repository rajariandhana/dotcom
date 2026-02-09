import { Link, useParams } from "react-router";
import { slugToTitle } from "../../utils/util";
import supabase from "../../libs/supabase/supabase";
import { useEffect, useState } from "react";
import { Image, Skeleton, Spinner } from "@heroui/react";
import { FaAnglesLeft } from "react-icons/fa6";

export default function GalleryPhotos() {
  const [loading, setLoading] = useState(true);
  const { album } = useParams();
  const [photos, setPhotos] = useState([]);

  async function getPhotos(album) {
    setLoading(true);
    const { data: files } = await supabase.storage.from("albums").list(album);

    const links = files.map((file) => {
      const { data } = supabase.storage
        .from("albums")
        .getPublicUrl(`${album}/${file.name}`);

      return data.publicUrl;
    });
    setPhotos(links);
    setLoading(false);
  }

  useEffect(() => {
    if (!album) return;
    getPhotos(album);
  }, [album]);

  if (!album || !photos) return <Spinner />;

  return (
    <section>
      <Link
        to={`/gallery`}
        className="flex gap-2 items-center text-sm text-primary h-6"
      >
        <FaAnglesLeft />
        <span>Back to Albums</span>
      </Link>
      <h2 className="mb-2 text-xl cursor-pointer">{slugToTitle(album)}</h2>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
        {loading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="rounded-2xl">
                <div className="size-40 bg-black/50" />
              </Skeleton>
            ))}
          </>
        ) : (
          photos.map((photo) => (
            <Image
              isZoomed={true}
              className="z-0 size-40 object-cover"
              src={photo}
            />
          ))
        )}
      </ul>
    </section>
  );
}
