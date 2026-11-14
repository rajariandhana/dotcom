import type { Metadata } from "next";
import type { ReactNode } from "react";

import { StickyHeading } from "@/components/StickyHeading";
import { AlbumShelf } from "@/components/hobbies/AlbumShelf";
import { CookingPot } from "@/components/hobbies/CookingPot";
import { Piano } from "@/components/hobbies/Piano";
import { Pokeball } from "@/components/hobbies/Pokeball";
import { Ukulele } from "@/components/hobbies/Ukulele";
import { getAlbums } from "@/lib/hobbies";

export const metadata: Metadata = {
  title: "Hobbies",
};

/*
 * What I do away from the keyboard, and most of it you can play with: photo
 * albums (carried over from the previous site's Gallery), a piano and a
 * ukulele synthesised in the browser, a pot to stir and a Pokéball to throw.
 */
export default async function HobbiesPage() {
  const albums = await getAlbums();

  return (
    <div className="flex flex-col gap-10">
      <StickyHeading className="text-[2rem] leading-none font-bold text-accent">Hobbies</StickyHeading>
      {/* Pulled up under the title like the other page intros; a sibling, so the title keeps sticking. */}
      <p className="-mt-7 max-w-prose leading-relaxed text-pretty">
        What I&apos;m up to when I&apos;m away from the keyboard. Most of it you can play with, so go ahead.
      </p>

      <Section title="Photography" note={`${albums.length} albums, from around Queensland and Japan`}>
        <AlbumShelf albums={albums} />
      </Section>

      <Section title="Music" note="Piano and ukulele. Turn your sound on.">
        <div className="grid gap-4 lg:grid-cols-5">
          <Block title="Piano" className="lg:col-span-3">
            <Piano />
          </Block>
          <Block title="Ukulele" className="lg:col-span-2">
            <Ukulele />
          </Block>
        </div>
      </Section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Block title="Cooking" note="Something I love doing in my free time.">
          <CookingPot />
        </Block>
        <Block title="Pokémon" note="Basically anything about it.">
          <Pokeball />
        </Block>
      </div>
    </div>
  );
}

function Section({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  const id = `hobby-${title.toLowerCase()}`;
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-xl font-bold sm:text-2xl">
          {title}
        </h2>
        <p className="text-sm text-muted">{note}</p>
      </div>
      {children}
    </section>
  );
}

function Block({ title, note, className = "", children }: { title: string; note?: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-4 border border-block bg-surface p-4 sm:p-5 ${className}`}>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-xs font-bold tracking-widest text-accent uppercase">{title}</h3>
        {note && <p className="text-sm text-muted">{note}</p>}
      </div>
      {children}
    </div>
  );
}
