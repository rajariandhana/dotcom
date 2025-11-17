import { Skeleton } from "@heroui/react";
import { useState } from "react";
import { Link } from "react-router";

export default function ProjectCard({ project }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      className="flex flex-col gap-2 p-2 bg-white border border-gray-200 w-fit h-fit funny-rotate rounded-xl"
      to={`/projects/${project.slug}`}
    >
      <Skeleton isLoaded={imgLoaded} className="rounded-md">
        <img
          src={`/projects/${project.slug}/1.${project.extension}`}
          alt={project.name}
          className="object-cover transition-opacity duration-500 bg-white rounded-md h-52 w-96 sm:w-60 sm:h-40"
          onLoad={() => setImgLoaded(true)}
        />
      </Skeleton>

      <Skeleton isLoaded={imgLoaded} className="rounded-md">
        <span className="flex items-center justify-center w-full h-6 text-center truncate">
          {project.name}
        </span>
      </Skeleton>
    </Link>
  );
}
