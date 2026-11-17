"use client";

import {
  Button,
  ListBox,
  Modal,
  SearchField,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  type Key,
} from "@heroui/react";
import { useMemo, useState, type ReactNode } from "react";
import { FaSliders } from "react-icons/fa6";

import {
  ALL_CATEGORIES,
  categoryOptions,
  emptyFilters,
  filterProjects,
  hasActiveFilters,
  techOptions,
  typeOptions,
  yearOptions,
  type FilterOption,
  type ProjectFilters,
} from "@/lib/project-filters";
import type { Project } from "@/lib/projects";

import { ProjectCard } from "./ProjectCard";

/**
 * Square filter buttons; selected ones are filled with the accent.
 * HeroUI sets its selected colours as variables on each button, so override them here.
 */
const optionButton = [
  "h-9 md:h-9 rounded-none border border-block px-3 text-sm",
  "[--toggle-button-bg:var(--field-background)]",
  "[--toggle-button-bg-hover:var(--default)]",
  "[--toggle-button-bg-pressed:var(--default)]",
  "[--toggle-button-bg-selected:var(--accent)]",
  "[--toggle-button-bg-selected-hover:var(--accent-hover)]",
  "[--toggle-button-bg-selected-pressed:var(--accent-hover)]",
  "[--toggle-button-fg-selected:var(--accent-foreground)]",
].join(" ");

/** How many filters (not counting the search) are switched on, for the Filters button badge. */
function activeFilterCount({ techs, years, types, category }: ProjectFilters): number {
  return techs.length + years.length + types.length + (category === ALL_CATEGORIES ? 0 : 1);
}

/**
 * Search by name and a project count above the list; category, type (any of),
 * year (any of) and tech (any of) live in a Filters modal. Results update live behind the modal.
 */
export function ProjectExplorer({ projects }: { projects: readonly Project[] }) {
  const [filters, setFilters] = useState<ProjectFilters>(emptyFilters);
  const update = (patch: Partial<ProjectFilters>) => setFilters((f) => ({ ...f, ...patch }));

  const techs = useMemo(() => techOptions(projects), [projects]);
  const techLabels = useMemo(() => new Map(techs.map((t) => [t.key, t.label])), [techs]);
  const years = useMemo(() => yearOptions(projects), [projects]);
  const types = useMemo(() => typeOptions(projects), [projects]);
  const categories = useMemo(() => categoryOptions(projects), [projects]);
  const results = useMemo(() => filterProjects(projects, filters), [projects, filters]);
  const filtering = hasActiveFilters(filters);
  const activeCount = activeFilterCount(filters);

  return (
    <section aria-label="All projects" className="flex flex-col gap-4">
      {/* One row at every width: search, Filters, then the count pushed to the right edge. */}
      <div role="search" className="flex items-center gap-2 sm:gap-3">
        <SearchField
          aria-label="Search projects by name"
          value={filters.query}
          onChange={(query) => update({ query })}
          className="min-w-0 flex-1 sm:max-w-64"
        >
          <SearchField.Group className="h-10 rounded-none">
            <SearchField.SearchIcon />
            {/* min-w-0 lets the input shrink, so the clear button stays inside the field. */}
            <SearchField.Input placeholder="Search" className="min-w-0" />
            <SearchField.ClearButton className="me-2 rounded-none bg-transparent text-muted hover:bg-transparent hover:text-accent data-[hovered=true]:bg-transparent" />
          </SearchField.Group>
        </SearchField>

        <Modal>
          <Button
            variant="secondary"
            aria-label={activeCount > 0 ? `Filters, ${activeCount} on` : "Filters"}
            className="h-10 shrink-0 rounded-none border border-block bg-field px-3 sm:px-3.5"
          >
            <FaSliders aria-hidden className="size-3.5" />
            Filters
            {activeCount > 0 && (
              <span className="min-w-5 bg-accent px-1.5 text-xs leading-5 text-accent-foreground tabular-nums">
                {activeCount}
              </span>
            )}
          </Button>
          <Modal.Backdrop>
            <Modal.Container size="md" scroll="inside">
              <Modal.Dialog className="rounded-none">
                <Modal.CloseTrigger className="rounded-none" />
                <Modal.Header>
                  <Modal.Heading>Filters</Modal.Heading>
                </Modal.Header>
                <Modal.Body className="flex flex-col gap-6">
                  <FilterGroup label="Category">
                    <ToggleButtonGroup
                      aria-label="Category"
                      selectionMode="single"
                      disallowEmptySelection
                      selectedKeys={[filters.category]}
                      onSelectionChange={(keys) => update({ category: String([...keys][0]) })}
                      className="flex w-full flex-wrap justify-start gap-2"
                    >
                      {[{ key: ALL_CATEGORIES, label: "All", count: projects.length }, ...categories].map(
                        (option) => (
                          <Option key={option.key} option={option} />
                        ),
                      )}
                    </ToggleButtonGroup>
                  </FilterGroup>

                  {types.length > 0 && (
                    <FilterGroup label="Type" hint="any of">
                      <ToggleButtonGroup
                        aria-label="Type"
                        selectionMode="multiple"
                        selectedKeys={filters.types}
                        onSelectionChange={(keys) => update({ types: [...keys].map(String) })}
                        className="flex w-full flex-wrap justify-start gap-2"
                      >
                        {types.map((option) => (
                          <Option key={option.key} option={option} />
                        ))}
                      </ToggleButtonGroup>
                    </FilterGroup>
                  )}

                  <FilterGroup label="Year" hint="any of">
                    <ToggleButtonGroup
                      aria-label="Year"
                      selectionMode="multiple"
                      selectedKeys={filters.years}
                      onSelectionChange={(keys) => update({ years: [...keys].map(String) })}
                      className="flex w-full flex-wrap justify-start gap-2"
                    >
                      {years.map((option) => (
                        <Option key={option.key} option={option} />
                      ))}
                    </ToggleButtonGroup>
                  </FilterGroup>

                  <FilterGroup label="Tech" hint="any of">
                    <Select
                      aria-label="Tech"
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
                            if (filters.techs.length > 3) return `${filters.techs.length} techs`;
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
                  </FilterGroup>
                </Modal.Body>
                <Modal.Footer className="flex flex-wrap items-center justify-between gap-3">
                  <Button
                    variant="ghost"
                    isDisabled={activeCount === 0}
                    className="rounded-none text-accent"
                    onPress={() => update({ techs: [], years: [], types: [], category: ALL_CATEGORIES })}
                  >
                    Clear filters
                  </Button>
                  <Button slot="close" className="rounded-none">
                    Show {results.length} {results.length === 1 ? "project" : "projects"}
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>

        <div className="ms-auto flex shrink-0 items-center gap-1 text-sm text-muted">
          <p aria-live="polite" className="whitespace-nowrap tabular-nums">
            {filtering ? (
              <>
                <span className="hidden sm:inline">Showing </span>
                {results.length} of {projects.length}
              </>
            ) : (
              `${projects.length} projects`
            )}
          </p>
          {/* Only while filtering; on phones the modal's "Clear filters" does this instead. */}
          {filtering && (
            <Button
              size="sm"
              variant="ghost"
              className="hidden rounded-none text-accent sm:inline-flex"
              onPress={() => setFilters(emptyFilters)}
            >
              Clear
            </Button>
          )}
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

function FilterGroup({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="text-sm font-semibold text-foreground">
        {label}
        {hint && <span className="ms-1.5 font-normal text-muted">({hint})</span>}
      </h3>
      {children}
    </div>
  );
}

function Option({ option }: { option: FilterOption }) {
  return (
    <ToggleButton id={option.key} className={optionButton}>
      {option.label}
      <span className="text-xs tabular-nums opacity-70">{option.count}</span>
    </ToggleButton>
  );
}
