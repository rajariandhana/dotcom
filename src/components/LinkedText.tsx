import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Markdown-style links in plain text: "[label](url)" becomes a link and the rest
 * stays text. Used where content lives in JSON or config (website history, FAQ).
 *
 * - "/path" links stay on the site (client-side navigation).
 * - "https://…" links open in a new tab.
 * - "mailto:…" links open the mail app.
 */
const LINK = /\[([^\]]+)\]\(((?:https?:\/\/|mailto:|\/)[^)\s]*)\)/g;

const linkClass =
  "text-accent underline underline-offset-2 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-focus";

export function LinkedText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    parts.push(text.slice(last, match.index));
    parts.push(
      href.startsWith("/") ? (
        <Link key={match.index} href={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a
          key={match.index}
          href={href}
          className={linkClass}
          {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {label}
        </a>
      ),
    );
    last = match.index + whole.length;
  }
  parts.push(text.slice(last));
  return parts;
}
