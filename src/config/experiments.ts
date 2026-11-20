/**
 * Experiments in the /test playground. The /test index lists these, and each
 * subpage reads its own entry for its title and source link.
 */

export type Experiment = {
  slug: string;
  title: string;
  /** What the experiment is built on. */
  source: string;
  blurb: string;
};

export const experiments = [
  {
    slug: "shan-shui",
    title: "Shan Shui",
    source: "https://github.com/lingdong-/shan-shui-inf",
    blurb: "An endless, procedurally generated Chinese landscape painting.",
  },
  {
    slug: "fishdraw",
    title: "Fishdraw",
    source: "https://github.com/lingdong-/fishdraw",
    blurb: "Procedurally generated fish, drawn as pen-plotter polylines.",
  },
  {
    slug: "drawably",
    title: "Drawably",
    source: "https://github.com/Danilaa1/drawably",
    blurb: "Hand-drawn UI controls whose pen strokes boil like a doodle.",
  },
  {
    slug: "pokeapi",
    title: "PokéAPI",
    source: "https://pokeapi.co/",
    blurb: "A small Pokédex on top of the free Pokémon REST API.",
  },
] as const satisfies readonly Experiment[];

export type ExperimentSlug = (typeof experiments)[number]["slug"];

export function getExperiment(slug: ExperimentSlug): Experiment {
  return experiments.find((e) => e.slug === slug)!;
}
