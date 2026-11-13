import Image from "next/image";

import type { TechCategory } from "@/config/tech";
import { layoutTree, treeConfigs, type TreeLayout } from "@/lib/tech-tree";

/**
 * The tech tree, grown three times at different sizes and swapped by the
 * width of its container (not the viewport — the sidebar takes space on
 * desktop). Each drawing is capped at its design width, so leaves only ever
 * shrink a little, never grow.
 *
 * Below it, a legend of the categories. Hovering a category, or any leaf,
 * fades the other categories' leaves — pure CSS (:has), no client script.
 */
export function TechTree({ categories }: { categories: readonly TechCategory[] }) {
  const highlight = categories
    .map(
      (_, i) =>
        `.tech-tree:has([data-cat="${i}"]:hover) [data-leaf]:not([data-cat="${i}"]){opacity:.2}` +
        `.tech-tree:has([data-cat="${i}"]:hover) [data-legend][data-cat="${i}"]{color:var(--accent)}`,
    )
    .join("");

  return (
    <div className="tech-tree flex flex-col gap-8">
      <style>{highlight}</style>

      <div className="@container">
        <div className="block @min-[480px]:hidden">
          <TreeDrawing layout={layoutTree(categories, treeConfigs.small)} />
        </div>
        <div className="hidden @min-[480px]:block @min-[720px]:hidden">
          <TreeDrawing layout={layoutTree(categories, treeConfigs.medium)} />
        </div>
        <div className="hidden @min-[720px]:block">
          <TreeDrawing layout={layoutTree(categories, treeConfigs.large)} />
        </div>
      </div>

      <ul aria-label="Categories" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {categories.map((category, i) => (
          <li
            key={category.name}
            data-legend
            data-cat={i}
            className="cursor-default font-semibold text-muted transition-colors"
          >
            {category.name} <span className="font-normal">{category.techs.length}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TreeDrawing({ layout }: { layout: TreeLayout }) {
  const { config, viewBox, wood, shadow, groundClip, leaves } = layout;
  const [minX, minY, width, height] = viewBox;
  const clipId = `tech-tree-ground-${width}`;
  const pct = (value: number, of: number) => `${(value / of) * 100}%`;

  // One list per category, so screen readers get "Frontend, list, 7 items".
  const groups = new Map<string, typeof leaves>();
  for (const leaf of leaves) groups.set(leaf.category, [...(groups.get(leaf.category) ?? []), leaf]);

  return (
    <div className="relative mx-auto" style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}>
      <svg viewBox={viewBox.join(" ")} aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
        <clipPath id={clipId}>
          <rect x={minX} y={minY} width={width} height={groundClip - minY} />
        </clipPath>
        <ellipse {...shadow} className="fill-bark opacity-15" />
        <g
          className="stroke-bark"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath={`url(#${clipId})`}
        >
          {wood.map(({ width: strokeWidth, d }) => (
            <path key={strokeWidth} d={d} strokeWidth={strokeWidth} />
          ))}
        </g>
      </svg>

      {[...groups].map(([category, items]) => (
        <ul key={category} aria-label={category}>
          {items.map((leaf) => (
            <li
              key={leaf.tech.name}
              data-leaf
              data-cat={leaf.categoryIndex}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
              style={{
                left: pct(leaf.x - minX, width),
                top: pct(leaf.y - minY, height),
                width: pct(config.leaf, width),
              }}
            >
              <Leaf leaf={leaf} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

function Leaf({ leaf: { tech, category, angle, delay } }: { leaf: TreeLayout["leaves"][number] }) {
  return (
    <a
      href={tech.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tech.name}
      className="group/leaf relative block aspect-square hover:z-10 focus-visible:z-10 focus-visible:outline-none"
    >
      <span className="leaf-grow block size-full" style={{ animationDelay: `${delay}ms` }}>
        <span
          className={`flex size-full items-center justify-center border bg-surface transition-transform duration-200 group-hover/leaf:scale-115 group-focus-visible/leaf:scale-115 group-focus-visible/leaf:outline-2 group-focus-visible/leaf:outline-offset-2 group-focus-visible/leaf:outline-focus motion-reduce:transition-none ${tech.core ? "border-accent" : "border-block"}`}
          style={{ borderRadius: "50% 0 50% 50%", rotate: `${angle}deg` }}
        >
          <Image
            src={`/tech/${tech.icon}.svg`}
            alt=""
            width={32}
            height={32}
            unoptimized
            className="size-[56%] object-contain"
            style={{ rotate: `${-angle}deg` }}
          />
        </span>
      </span>
      {/* Name and category, shown on hover / keyboard focus. Not rotated. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-full left-1/2 mt-1.5 flex -translate-x-1/2 flex-col items-center border border-block bg-surface px-2 py-0.5 text-xs whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover/leaf:opacity-100 group-focus-visible/leaf:opacity-100"
      >
        <span className="font-semibold">{tech.name}</span>
        <span className="text-muted">{category}</span>
      </span>
    </a>
  );
}
