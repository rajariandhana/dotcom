"use client";

import {
  Button,
  ListBox,
  SearchField,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  type Key,
} from "@heroui/react";
import { useMemo, useState } from "react";

import {
  ALL_CATEGORIES,
  categoryOptions,
  emptyFilters,
  filterProjects,
  hasActiveFilters,
  techOptions,
  type ProjectFilters,
} from "@/lib/project-filters";
import type { Project } from "@/lib/projects";

import { ProjectCard } from "./ProjectCard";

/**
 * Square, 40px category buttons; the active one is filled with the accent.
 * HeroUI sets its selected colours as variables on each button, so override them here.
 */
const categoryButton = [
  "h-10 md:h-10 rounded-none px-3",
  "[--toggle-button-bg:var(--field-background)]",
  "[--toggle-button-bg-hover:var(--default)]",
  "[--toggle-button-bg-pressed:var(--default)]",
  "[--toggle-button-bg-selected:var(--accent)]",
  "[--toggle-button-bg-selected-hover:var(--accent-hover)]",
  "[--toggle-button-bg-selected-pressed:var(--accent-hover)]",
  "[--toggle-button-fg-selected:var(--accent-foreground)]",
].join(" ");

/** Search by name, filter by tech (any of) and category, and the resulting list. */
export function ProjectExplorer({ projects }: { projects: readonly Project[] }) {
  const [filters, setFilters] = useState<ProjectFilters>(emptyFilters);
  const update = (patch: Partial<ProjectFilters>) => setFilters((f) => ({ ...f, ...patch }));

  const techs = useMemo(() => techOptions(projects), [projects]);
  const techLabels = useMemo(() => new Map(techs.map((t) => [t.key, t.label])), [techs]);
  const categories = useMemo(() => categoryOptions(projects), [projects]);
  const results = useMemo(() => filterProjects(projects, filters), [projects, filters]);
  const filtering = hasActiveFilters(filters);

  return (
    <section aria-label="All projects" className="flex flex-col gap-4">
      {/* One 40px row, like the Figma "search, filters," bar; wraps on narrow screens.
          Square corners and the accent for the active category, to match the menu and cards. */}
      <div role="search" className="flex flex-wrap items-center gap-3">
        <SearchField
          aria-label="Search projects by name"
          value={filters.query}
          onChange={(query) => update({ query })}
          className="w-full min-w-0 sm:w-auto sm:max-w-48 sm:flex-1"
        >
          <SearchField.Group className="h-10 rounded-none">
            <SearchField.SearchIcon />
            {/* min-w-0 lets the input shrink, so the clear button stays inside the field. */}
            <SearchField.Input placeholder="Search by name" className="min-w-0" />
            <SearchField.ClearButton className="me-2 rounded-none bg-transparent text-muted hover:bg-transparent hover:text-accent data-[hovered=true]:bg-transparent" />
          </SearchField.Group>
        </SearchField>

        {/* Wrapper keeps Select's hidden native <select> from taking its own gap in the row. */}
        <div className="w-full sm:w-40">
          <Select
            aria-label="Filter by tech"
            placeholder="Any tech"
            selectionMode="multiple"
            value={filters.techs}
            onChange={(keys) => update({ techs: ((keys as Key[] | null) ?? []).map(String) })}
            className="w-full"
          >
            <Select.Trigger className="h-10 items-center rounded-none py-0">
              {/* Names only — the default would also repeat each option's count badge. */}
              <Select.Value className="truncate">
                {({ defaultChildren, isPlaceholder }) => {
                  if (isPlaceholder || filters.techs.length === 0) return defaultChildren;
                  if (filters.techs.length > 2) return `${filters.techs.length} techs`;
                  return filters.techs.map((key) => techLabels.get(key) ?? key).join(", ");
                }}
              </Select.Value>
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="rounded-none">
              <ListBox selectionMode="multiple">
                {techs.map((tech) => (
                  <ListBox.Item
                    key={tech.key}
                    id={tech.key}
                    textValue={tech.label}
                    className="rounded-none"
                  >
                    <span className="flex-1">{tech.label}</span>
                    <span className="text-xs text-muted tabular-nums">{tech.count}</span>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <ToggleButtonGroup
          aria-label="Filter by category"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[filters.category]}
          onSelectionChange={(keys) => update({ category: String([...keys][0]) })}
          className="divide-x divide-block border border-block bg-field"
        >
          {[{ key: ALL_CATEGORIES, label: "All" }, ...categories].map((category) => (
            <ToggleButton key={category.key} id={category.key} className={categoryButton}>
              {category.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Fixed width with Clear's space always reserved, so applying a filter never
            changes the row's width and nothing jumps to a new line. */}
        <div className="flex w-full shrink-0 items-center justify-between gap-3 text-sm text-muted sm:ms-auto sm:w-48 sm:justify-end">
          <p aria-live="polite" className="whitespace-nowrap tabular-nums">
            {filtering ? `Showing ${results.length} of ${projects.length}` : `${projects.length} projects`}
          </p>
          <Button
            size="sm"
            variant="ghost"
            isDisabled={!filtering}
            aria-hidden={!filtering}
            className={`rounded-none text-accent ${filtering ? "" : "invisible"}`}
            onPress={() => setFilters(emptyFilters)}
          >
            Clear
          </Button>
        </div>
      </div>

      {results.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {results.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-3 border border-block bg-surface p-6">
          <p className="font-medium text-foreground">No projects match these filters.</p>
          <Button size="sm" variant="secondary" className="rounded-none" onPress={() => setFilters(emptyFilters)}>
            Clear filters
          </Button>
        </div>
      )}
    </section>
  );
}
