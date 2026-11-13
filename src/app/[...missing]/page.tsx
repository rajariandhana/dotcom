import { notFound } from "next/navigation";

/**
 * Catch-all for any path no other route matches.
 *
 * Without it, an unknown URL has no route, so the client router can't render
 * it and falls back to a full page reload. Matching it here and calling
 * notFound() lets navigation stay client-side while still rendering
 * src/app/not-found.tsx at the requested URL with a 404 status.
 *
 * Real routes (e.g. app/projects/page.tsx) always win over this one.
 */
export default function MissingPage() {
  notFound();
}
