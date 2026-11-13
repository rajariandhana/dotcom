import Image from "next/image";
import type { CSSProperties } from "react";

import { getImageSize } from "@/lib/image-size";
import { projectImage, type Project } from "@/lib/projects";

import { ProjectLink } from "./ProjectLink";

/** Used when a project has no image (or its size can't be read). */
const FALLBACK_RATIO = 16 / 9;

type Tile = { project: Project; image?: string; ratio: number };

/**
 * The first project large on the left, the rest stacked on the right. Every
 * tile keeps its image's own aspect ratio, so nothing is cropped.
 *
 * To make both columns end at the same height, the right column's width is
 * solved from the ratios: with r₀ the large ratio, S = Σ 1/rᵢ over the stacked
 * ones, n the number stacked and g the gap,
 *   left height  = (W − g − w) / r₀
 *   right height = w·S + (n − 1)·g
 * which are equal when  w = (W − g·(1 + r₀·(n − 1))) / (1 + r₀·S).
 */
export async function FeaturedProjects({ projects }: { projects: Project[] }) {
  const tiles: Tile[] = await Promise.all(
    projects.map(async (project) => {
      const image = projectImage(project);
      const size = image ? await getImageSize(image) : undefined;
      return { project, image, ratio: size ? size.width / size.height : FALLBACK_RATIO };
    }),
  );
  const [large, ...stacked] = tiles;
  if (!large) return null;

  const r0 = large.ratio;
  const n = stacked.length;
  const sumInverse = stacked.reduce((sum, tile) => sum + 1 / tile.ratio, 0);
  const rightColumn: CSSProperties = {
    width: `calc((100% - var(--featured-gap) * ${1 + r0 * (n - 1)}) / ${1 + r0 * sumInverse})`,
  };

  return (
    <section
      aria-label="Featured projects"
      className="flex items-start gap-(--featured-gap) [--featured-gap:1rem] sm:[--featured-gap:2.5rem]"
    >
      <FeaturedTile tile={large} large className="min-w-0 flex-1" />
      {n > 0 && (
        <div className="flex shrink-0 flex-col gap-(--featured-gap)" style={rightColumn}>
          {stacked.map((tile) => (
            <FeaturedTile key={tile.project.slug} tile={tile} />
          ))}
        </div>
      )}
    </section>
  );
}

function FeaturedTile({
  tile: { project, image, ratio },
  large = false,
  className = "",
}: {
  tile: Tile;
  large?: boolean;
  className?: string;
}) {
  return (
    <ProjectLink
      project={project}
      // Ratio on the whole tile (border included) so the column maths above is exact.
      style={{ aspectRatio: ratio }}
      className={`group relative isolate block overflow-hidden border border-block bg-default focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus ${className}`}
    >
      {image && (
        <Image
          src={image}
          alt=""
          fill
          loading={large ? "eager" : "lazy"}
          sizes={large ? "(min-width: 1024px) 540px, 66vw" : "(min-width: 1024px) 250px, 33vw"}
          className="-z-10 object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
        />
      )}
      <span
        className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent font-bold text-white ${large ? "p-4 text-xl sm:p-6 sm:text-3xl" : "p-2 text-sm sm:p-3 sm:text-lg"}`}
      >
        {project.name}
      </span>
    </ProjectLink>
  );
}
