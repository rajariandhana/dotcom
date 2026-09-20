import { Image, Skeleton } from "@heroui/react";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

export default function ProjectCard({ project, loading }) {
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }
  }, [project?.name]);

  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-2 bg-white border border-gray-200 w-full h-fit rounded-xl">
        <Skeleton className="w-full rounded-md aspect-3/2" />
        <Skeleton className="h-6 w-3/4 mx-auto rounded-md" />
      </div>
    );
  }

  const { slug, name, external } = project;

	// `images` from projects.json is the usual source; `cover` is the fallback
	// for projects without gallery photos.
	const imageUrl = project.images?.[0] ?? project.cover;

  const cardClassName =
    "flex flex-col gap-2 p-2 bg-white border border-gray-200 w-full h-fit funny-rotate rounded-xl";

  const cardBody = (
    <>
      {/* `removeWrapper` drops HeroUI's wrapper div, which carries an inline
          `max-width: fit-content`. An image that hasn't loaded has no intrinsic
          width, so that collapses the box to 0 and the card visibly shrinks
          until the image decodes. */}
      <Image
        removeWrapper
        src={imageUrl}
        alt={name}
        className="object-cover w-full transition-opacity duration-500 rounded-md aspect-3/2 opacity-0"
        onLoad={(e) => e.target.classList.remove("opacity-0")}
      />

      <span
        ref={textRef}
        className={`w-full h-6 truncate ${
          isOverflowing ? "text-left" : "text-center"
        }`}
      >
        {name}
      </span>
    </>
  );

  // Projects that have their own site skip the local detail page and open there
  // in a new tab.
  if (external) {
    return (
      <a
        className={cardClassName}
        href={external}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cardBody}
      </a>
    );
  }

  return (
    <Link className={cardClassName} to={`/projects/${slug}`}>
      {cardBody}
    </Link>
  );
}
