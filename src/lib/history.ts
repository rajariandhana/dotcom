import { readdir } from "node:fs/promises";
import path from "node:path";

import { cacheLife } from "next/cache";

import { techCategories, type Tech } from "@/config/tech";

import historiesData from "../../public/histories.json";
import { getImageSize } from "./image-size";

/** One version of this website, from public/histories.json (oldest first). `text` may hold Markdown-style [label](url) links. */
export type HistoryEntry = {
  key: string;
  label: string;
  techs: string[];
  text: string;
};

export const histories: readonly HistoryEntry[] = historiesData;

export type HistoryShot = { src: string; width: number; height: number };

const IMAGE = /\.(webp|png|jpe?g|avif)$/i;

/**
 * Screenshots of a version: every image in public/history/<key>/, in natural
 * file-name order (so 2.webp comes before 10.webp). Read once at build time
 * (cached), so adding screenshots is just dropping files in the folder and
 * redeploying. None yet is fine.
 */
export async function getHistoryShots(key: string): Promise<HistoryShot[]> {
  "use cache";
  // The folder only changes with a new deploy, so cache for as long as allowed.
  cacheLife("max");
  const dir = path.join(process.cwd(), "public", "history", key);
  const files = await readdir(dir).catch(() => [] as string[]);
  const names = files
    .filter((name) => IMAGE.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const shots = await Promise.all(
    names.map(async (name) => {
      const src = `/history/${key}/${name}`;
      const size = await getImageSize(src);
      return size ? { src, ...size } : undefined;
    }),
  );
  return shots.filter((shot) => shot !== undefined);
}

// "Tailwindcss", "React.js" and "Tailwind CSS", "React" should all match.
const normalise = (name: string) => name.toLowerCase().replace(/\.?js$/, "").replace(/[^a-z0-9+#]/g, "");
const techsByName = new Map(techCategories.flatMap((c) => c.techs).map((tech) => [normalise(tech.name), tech]));

// Techs an old version used that aren't on the Tech Tree, but still get an icon here.
const historyOnly: readonly Tech[] = [
  { name: "Vite", icon: "vite", url: "https://vite.dev/" },
  { name: "HeroUI", icon: "heroui", url: "https://heroui.com/" },
];
for (const tech of historyOnly) techsByName.set(normalise(tech.name), tech);

/** The Tech Tree entry for a tech name (or a history-only one), for its icon and link, if there is one. */
export function findTech(name: string): Tech | undefined {
  return techsByName.get(normalise(name));
}
