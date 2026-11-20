"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { buttonClass, inputClass } from "./ExperimentHeader";

const API = "https://pokeapi.co/api/v2";
/** National Pokédex size the API currently covers with full data. */
const MAX_ID = 1025;

type Pokemon = {
  id: number;
  name: string;
  height: number; // decimetres
  weight: number; // hectograms
  types: { type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: { front_default: string | null; other?: { "official-artwork"?: { front_default: string | null } } };
  cries?: { latest?: string | null };
  species: { url: string };
};

type Species = {
  genera: { genus: string; language: { name: string } }[];
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
};

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status === 404 ? "No Pokémon by that name." : `PokéAPI error ${res.status}`);
  return res.json() as Promise<T>;
}

const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "Atk",
  defense: "Def",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "Spe",
};

const title = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** Search by name or number, step through the Pokédex, or roll a random one. */
export function Pokedex() {
  const [query, setQuery] = useState("pikachu");
  const [draft, setDraft] = useState("pikachu");
  const audio = useRef<HTMLAudioElement | null>(null);

  const pokemon = useQuery({
    queryKey: ["pokeapi", "pokemon", query],
    queryFn: () => getJson<Pokemon>(`${API}/pokemon/${encodeURIComponent(query)}`),
    staleTime: Infinity,
  });
  const p = pokemon.data;

  const species = useQuery({
    queryKey: ["pokeapi", "species", p?.species.url],
    queryFn: () => getJson<Species>(p!.species.url),
    enabled: !!p,
    staleTime: Infinity,
  });

  const go = (next: string | number) => {
    const q = String(next).trim().toLowerCase();
    if (!q) return;
    setDraft(q);
    setQuery(q);
  };
  const step = (delta: number) => p && go(((p.id - 1 + delta + MAX_ID) % MAX_ID) + 1);

  const flavor = species.data?.flavor_text_entries
    .findLast((f) => f.language.name === "en")
    ?.flavor_text.replace(/[\f\n\r]+/g, " ");
  const genus = species.data?.genera.find((g) => g.language.name === "en")?.genus;
  const art = p?.sprites.other?.["official-artwork"]?.front_default ?? p?.sprites.front_default;

  return (
    <section className="flex flex-col gap-4">
      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          go(draft);
        }}
      >
        <input
          className={`${inputClass} w-48`}
          placeholder="Name or number"
          aria-label="Pokémon name or number"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className={buttonClass}>
          Search
        </button>
        <button type="button" className={buttonClass} onClick={() => go(1 + Math.floor(Math.random() * MAX_ID))}>
          Random
        </button>
        <button type="button" className={buttonClass} onClick={() => step(-1)} disabled={!p} aria-label="Previous Pokémon">
          ←
        </button>
        <button type="button" className={buttonClass} onClick={() => step(1)} disabled={!p} aria-label="Next Pokémon">
          →
        </button>
      </form>

      <div className="border border-block bg-surface p-4 sm:p-6" aria-live="polite">
        {pokemon.isPending ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : pokemon.isError ? (
          <p className="text-sm text-muted">{pokemon.error.message}</p>
        ) : (
          p && (
            <div className="grid gap-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <div className="flex flex-col items-center gap-2">
                {art && (
                  // eslint-disable-next-line @next/next/no-img-element -- remote art from the API, one image per lookup
                  <img src={art} alt={title(p.name)} width={240} height={240} className="aspect-square w-full max-w-60 object-contain" />
                )}
                {p.cries?.latest && (
                  <>
                    <audio ref={audio} src={p.cries.latest} preload="none" />
                    <button type="button" className={buttonClass} onClick={() => audio.current?.play()}>
                      ▶ Cry
                    </button>
                  </>
                )}
              </div>

              <div className="flex min-w-0 flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-muted tabular-nums">#{String(p.id).padStart(4, "0")}</p>
                  <h2 className="text-2xl font-bold">{title(p.name)}</h2>
                  {genus && <p className="text-sm text-muted">{genus}</p>}
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {p.types.map(({ type }) => (
                      <li key={type.name} className="border border-block px-2 py-0.5 text-xs font-bold tracking-wider uppercase">
                        {type.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {flavor && <p className="leading-relaxed text-pretty">{flavor}</p>}

                <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <dt className="text-muted">Height</dt>
                  <dd>{(p.height / 10).toFixed(1)} m</dd>
                  <dt className="text-muted">Weight</dt>
                  <dd>{(p.weight / 10).toFixed(1)} kg</dd>
                  <dt className="text-muted">Abilities</dt>
                  <dd>
                    {p.abilities
                      .map((a) => title(a.ability.name) + (a.is_hidden ? " (hidden)" : ""))
                      .join(", ")}
                  </dd>
                </dl>

                <table className="w-full text-sm">
                  <caption className="sr-only">Base stats</caption>
                  <tbody>
                    {p.stats.map((s) => (
                      <tr key={s.stat.name}>
                        <th scope="row" className="w-12 py-0.5 text-left font-medium text-muted">
                          {statLabels[s.stat.name] ?? s.stat.name}
                        </th>
                        <td className="w-10 py-0.5 text-right tabular-nums">{s.base_stat}</td>
                        <td className="py-0.5 pl-3">
                          {/* Bars scale to 255, the highest a base stat can be. */}
                          <div className="h-2 bg-accent" style={{ width: `${(s.base_stat / 255) * 100}%` }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>
      <p className="text-xs text-muted">Data and art from PokéAPI. Pokémon © Nintendo / Game Freak.</p>
    </section>
  );
}
