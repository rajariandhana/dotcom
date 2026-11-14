import { readdir } from "node:fs/promises";
import path from "node:path";

import { cacheLife } from "next/cache";

import { getImageSize } from "./image-size";

export type Photo = { src: string; width: number; height: number };
export type Album = { slug: string; label: string; photos: Photo[] };

const IMAGE = /\.(webp|png|jpe?g|avif)$/i;

/** "brisbane-jacaranda" → "Brisbane Jacaranda" (the previous Gallery's naming). */
const toLabel = (slug: string) => slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Photo albums for /hobbies: one folder per album in public/hobbies/albums/,
 * photos in natural file-name order. Carried over from the previous site's
 * Gallery (its Supabase "albums" bucket). Read once at build time; to add an
 * album, drop a folder of WebP photos in and redeploy.
 */
export async function getAlbums(): Promise<Album[]> {
  "use cache";
  cacheLife("max");
  const root = path.join(process.cwd(), "public", "hobbies", "albums");
  const folders = (await readdir(root, { withFileTypes: true }).catch(() => []))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const albums = await Promise.all(
    folders.map(async (slug) => {
      const files = (await readdir(path.join(root, slug)))
        .filter((name) => IMAGE.test(name))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      const photos = await Promise.all(
        files.map(async (name) => {
          const src = `/hobbies/albums/${slug}/${name}`;
          const size = await getImageSize(src);
          return size ? { src, ...size } : undefined;
        }),
      );
      return { slug, label: toLabel(slug), photos: photos.filter((photo) => photo !== undefined) };
    }),
  );
  return albums.filter((album) => album.photos.length > 0);
}
