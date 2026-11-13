import type { Project } from "./projects";

/** Current search/filter state for the project list. */
export type ProjectFilters = {
  /** Matched case-insensitively anywhere in the project name. */
  query: string;
  /** Tech keys (lower-cased). A project matches if it uses ANY of them. Empty = no tech filter. */
  techs: string[];
  /** A category, or "all". */
  category: string;
};

export const ALL_CATEGORIES = "all";

export const emptyFilters: ProjectFilters = { query: "", techs: [], category: ALL_CATEGORIES };

/** Techs are compared lower-cased, so "Go" and "GO" in projects.json count as one. */
export const techKey = (tech: string) => tech.trim().toLowerCase();

export function hasActiveFilters(filters: ProjectFilters): boolean {
  return (
    filters.query.trim() !== "" || filters.techs.length > 0 || filters.category !== ALL_CATEGORIES
  );
}

export function filterProjects(
  projects: readonly Project[],
  { query, techs, category }: ProjectFilters,
): Project[] {
  const needle = query.trim().toLowerCase();
  const wanted = new Set(techs);
  return projects.filter((project) => {
    if (needle && !project.name.toLowerCase().includes(needle)) return false;
    if (category !== ALL_CATEGORIES && project.category !== category) return false;
    if (wanted.size > 0 && !project.techs.some((tech) => wanted.has(techKey(tech)))) return false;
    return true;
  });
}

export type FilterOption = { key: string; label: string; count: number };

/**
 * Every tech used by at least one project, A–Z. Spellings that differ only in
 * case are merged under the most common spelling.
 */
export function techOptions(projects: readonly Project[]): FilterOption[] {
  const byKey = new Map<string, { count: number; spellings: Map<string, number> }>();
  for (const project of projects) {
    for (const tech of new Set(project.techs)) {
      const key = techKey(tech);
      const entry = byKey.get(key) ?? { count: 0, spellings: new Map() };
      entry.count += 1;
      entry.spellings.set(tech, (entry.spellings.get(tech) ?? 0) + 1);
      byKey.set(key, entry);
    }
  }
  return [...byKey]
    .map(([key, { count, spellings }]) => ({
      key,
      label: [...spellings].sort((a, b) => b[1] - a[1])[0][0],
      count,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" }));
}

/** Categories in the order they first appear in projects.json, e.g. web, game, other. */
export function categoryOptions(projects: readonly Project[]): FilterOption[] {
  const counts = new Map<string, number>();
  for (const { category } of projects) {
    if (category) counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  return [...counts].map(([key, count]) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    count,
  }));
}
