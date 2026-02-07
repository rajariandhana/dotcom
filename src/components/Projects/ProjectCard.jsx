import { Image, Skeleton } from "@heroui/react";
import { Link } from "react-router";

export default function ProjectCard({ project, loading }) {
  const slug = project?.slug ?? "";
  const name = project?.name ?? "Loading...";

  return (
    <Link
      className="flex flex-col gap-2 p-2 bg-white border border-gray-200 w-fit h-fit funny-rotate rounded-xl"
      to={loading ? "#" : `/projects/${slug}`}
    >
      <Image
        src={`/projects/${slug}/1.${project?.extension}`}
        alt={name}
        className="object-cover transition-opacity duration-500 rounded-md h-52 w-96 sm:w-60 sm:h-40"
        // loading="lazy"
        // fallback={<Skeleton className="rounded-md h-52 w-96 sm:w-60 sm:h-40" />}
      />

      <span className="flex items-center justify-center w-full h-6 text-center truncate sm:w-60">
        {name}
      </span>
    </Link>
  );
}
