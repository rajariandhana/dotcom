import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";

/**
 * "Back to Projects" for the hand-made project pages, pinned to the top-left
 * of the page while it scrolls: under the 64px top bar on phones, at the very
 * top beside the sidebar on desktop.
 *
 * Styled as the site, not the project: square, 1px block border, surface
 * background and accent text, like the buttons on the generated project pages,
 * so it follows the site's light/dark theme and reads as site navigation over
 * any brand colours underneath.
 *
 * Put it as the first child of the page root. The sticky wrapper is 0px tall,
 * so it takes no room from the page's first section.
 */
export function BackToProjects() {
  return (
    <div className="sticky top-16 z-[35] h-0 lg:top-0">
      <Link
        href="/projects"
        className="mt-4 ml-4 inline-flex h-9 items-center gap-1.5 border border-block bg-surface px-3.5 text-sm font-semibold text-accent transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:mt-5 sm:ml-6"
      >
        <FaAngleLeft aria-hidden className="size-3" />
        Back to Projects
      </Link>
    </div>
  );
}
