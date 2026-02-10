import { Link, useParams } from "react-router";
import { slugToTitle } from "../../utils/util";
import { Image } from "@heroui/react";
import { FaAnglesLeft } from "react-icons/fa6";
import { useAlbum } from "../../hooks/album";
import GallerySkeleton from "./GallerySkeleton";

export default function GalleryPhotos() {
  const { album_name } = useParams();

  const { data: album, isPending } = useAlbum(album_name);

  return (
    <>
      <section>
        <Link
          to={`/gallery`}
          className="flex gap-2 items-center text-sm text-primary h-6 w-fit"
        >
          <FaAnglesLeft />
          <span>Back to Albums</span>
        </Link>
        <h2 className="mb-2 text-xl cursor-pointer">
          {slugToTitle(album_name)}
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isPending ? (
            <GallerySkeleton length={4} />
          ) : (
            album.links.map((photo) => (
              <Image
                isZoomed={true}
                className="z-0 size-40 object-cover"
                src={photo}
              />
            ))
          )}
        </ul>
      </section>
    </>
  );
}
