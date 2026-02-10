import { Image, Skeleton } from "@heroui/react";
import { Link } from "react-router";

export default function ProjectCard({ project, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-2 bg-white border border-gray-200 w-fit h-fit rounded-xl">
        <Skeleton className="rounded-md h-52 w-96 sm:w-60 sm:h-40" />
        <Skeleton className="h-6 w-3/4 mx-auto rounded-md" />
      </div>
    );
  }

  const { slug, name, extension } = project;

  return (
    <Link
      className="flex flex-col gap-2 p-2 bg-white border border-gray-200 w-fit h-fit funny-rotate rounded-xl"
      to={`/projects/${slug}`}
    >
      <Image
        src={`/projects/${slug}/1.${extension}`}
        alt={name}
        className="object-cover transition-opacity duration-500 rounded-md h-52 w-96 sm:w-60 sm:h-40 animate-fade-in opacity-0"
        onLoad={(e) => e.target.classList.remove("opacity-0")}
      />

      <span className="flex items-center justify-center w-full h-6 text-center truncate sm:w-60">
        {name}
      </span>
    </Link>
  );
}
