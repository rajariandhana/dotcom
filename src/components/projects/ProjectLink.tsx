import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { projectHref, type Project } from "@/lib/projects";

/** Links to the project's own site in a new tab, or to its page on this site. */
export function ProjectLink({
  project,
  className,
  style,
  children,
}: {
  project: Project;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const { href, external } = projectHref(project);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}
