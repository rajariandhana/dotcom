import path from "node:path";

import sharp from "sharp";

/**
 * Width and height of an image in `public/`, read from the file itself.
 * Server-only (uses the filesystem); runs at build time for static pages.
 */
export type ImageSize = { width: number; height: number };

const cache = new Map<string, Promise<ImageSize | undefined>>();

export function getImageSize(publicPath: string): Promise<ImageSize | undefined> {
  let size = cache.get(publicPath);
  if (!size) {
    const file = path.join(process.cwd(), "public", publicPath);
    size = sharp(file)
      .metadata()
      .then(({ width, height }) => (width && height ? { width, height } : undefined))
      .catch(() => undefined);
    cache.set(publicPath, size);
  }
  return size;
}
