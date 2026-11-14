"use client";

import { ToggleButton, ToggleButtonGroup } from "@heroui/react";
import { useState, type ReactNode } from "react";

import {
  display,
  fontSets,
  gridStyles,
  taglineStyles,
  type FontSet,
  type GridStyle,
  type TaglineStyle,
} from "@/config/display";

/**
 * Development-only "debugbar" for trying font sets, grid styles and the tagline live.
 * It edits the <html> data attributes directly; to change what ships,
 * edit the defaults in src/config/display.ts.
 */
export function DebugBar() {
  const [fontSet, setFontSet] = useState<FontSet>(display.fontSet);
  const [grid, setGrid] = useState<GridStyle>(display.grid);
  const [tagline, setTagline] = useState<TaglineStyle>(display.tagline);

  const pick = (keys: Iterable<unknown>) => String([...keys][0]);

  return (
    <details className="fixed end-4 bottom-4 z-50 rounded-xl bg-overlay p-3 text-xs text-foreground shadow-overlay">
      <summary className="cursor-pointer font-semibold select-none">debugbar</summary>
      <div className="mt-3 flex flex-col gap-3">
        <Field label="Font set">
          <ToggleButtonGroup
            size="sm"
            selectionMode="single"
            disallowEmptySelection
            aria-label="Font set"
            selectedKeys={[fontSet]}
            onSelectionChange={(keys) => {
              const value = pick(keys) as FontSet;
              setFontSet(value);
              document.documentElement.dataset.fontSet = value;
            }}
          >
            {Object.entries(fontSets).map(([id, { label, feature }]) => (
              <ToggleButton
                key={id}
                id={id}
                style={{ fontFeatureSettings: feature ? `"${feature}"` : "normal" }}
              >
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Field>

        <Field label="Grid">
          <ToggleButtonGroup
            size="sm"
            selectionMode="single"
            disallowEmptySelection
            aria-label="Grid background"
            selectedKeys={[grid]}
            onSelectionChange={(keys) => {
              const value = pick(keys) as GridStyle;
              setGrid(value);
              document.documentElement.dataset.grid = value;
            }}
          >
            {Object.entries(gridStyles).map(([id, { label }]) => (
              <ToggleButton key={id} id={id}>
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Field>

        <Field label="Tagline">
          <ToggleButtonGroup
            size="sm"
            selectionMode="single"
            disallowEmptySelection
            aria-label="Tagline font"
            selectedKeys={[tagline]}
            onSelectionChange={(keys) => {
              const value = pick(keys) as TaglineStyle;
              setTagline(value);
              document.documentElement.dataset.tagline = value;
            }}
          >
            {Object.entries(taglineStyles).map(([id, style]) => (
              <ToggleButton
                key={id}
                id={id}
                // Like the font set buttons, each set's label is drawn in that set.
                style={
                  "feature" in style
                    ? { fontFeatureSettings: style.feature ? `"${style.feature}"` : "normal" }
                    : undefined
                }
              >
                {style.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Field>
      </div>
    </details>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-muted">{label}</span>
      {children}
    </div>
  );
}
