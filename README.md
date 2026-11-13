# dotcom

Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · HeroUI v3. Use `bun`, not npm.

```sh
cp .env.example .env.local
# fill .env.local with secrets (NEXT_PUBLIC_* names)

bun install
bun run dev
# open http://localhost:3000/
```

- Navigation (sidebar + mobile drawer): `src/config/navigation.ts`
- Font stylistic set and grid background defaults: `src/config/display.ts`
- Brand colors (HeroUI theme overrides): `src/app/globals.css`

Todos:

lazy load images
skeletons
tanstack

Explore More:
> history of this website

## Gallery

divided by Albums?

use tanstack

find out if can transfer owned domain to vercel

back up supabase photos, what happens if photos in supabase gone?

add logo in sidebar, Home w/ house icon, Experience w/ skills icon, etc

add experience skeleton

home -> favorite projects -> swiperjs card swipe

## BUG
open website path using URL will result in 404 not found

## TODO
- gallery -> sort pictures, give id in supabase folder, parse the id to be removed in FE
- seacat mongo db is gone, seacat link in FE
- use more elegant font? serif fonts?
- project tags: FREELANCE, PERSONAL, SCHOOL PROJECT
- medium blog posts
- change heroui's primary color into MY OWN SIGNATURE COLOR
- let's use boxy instead of circular
- know about me personally
- say where I'm based at
- work eligibility
- 3d.ralfazza.com, made in Godot, BaseGame github releases
- Languages (not programming) I'm using: Indonesia, IELTS 8.0, Duolingo Japanese
- move photos into the repo instead of fetching from supabase
- create `/contact`: shows literally ALL my links from professional accounts to game accounts?:
	- email, github, linkedin, 
	- social media: instagram, spotify (private THAT playlist first), threads, facebook, discord
	- games: PUB Mobile, Mobile Legends,
	- duolingo, strava

Card Language

player will be given cards
cards:
- english, japanese
- meaning, anonym
- 

# Convertor
input: youtube video link
output: mp3, mp4

jpg/png/webp/svg converter
change file name, directory

## Tomo notes
future features:
- plus:
	- speech to text, real time talking
	- voice customization

### Tomo Copywriting


## Random
- is it possible for Claude to crawl through Threads Posts, then create a post that would have lots of engagement.
- Develop a RAG system where the document comes from JSON. Use Python, Google Gemini API, and FastAPI for the server. Make it so if I call an HTTP request it could answer a question I provide.

## Ideas
- remove Gallery route, move it under hobbies
Hobbies:
/music
/photography
/baking
- group Projects, Experience, Tech Tree -> more cohesive SWEN group
- actually yes let's add dark mode
