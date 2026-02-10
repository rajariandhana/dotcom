import { Card, CardHeader, Image } from "@heroui/react";

import { Link } from "react-router";
import { useAlbums } from "../../hooks/album";
import GallerySkeleton from "./GallerySkeleton";

export default function Gallery() {
  const { data: albums, isPending } = useAlbums();

  return (
    <>
      <section>
        <h2 className="mb-2 text-xl cursor-pointer bg w-full mt-6">Albums</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isPending ? (
            <GallerySkeleton length={8}/>
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
