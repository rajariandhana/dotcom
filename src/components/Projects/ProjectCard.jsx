import { Skeleton } from "@heroui/react";
import { useState } from "react";
import { Link } from "react-router";

export default function ProjectCard() {
  const [loading, setLoading] = useState(true);
  return (
    <Link
      className="flex flex-col gap-2 p-2 bg-white border border-gray-200 w-fit h-fit funny-rotate rounded-xl"
      to="/projects"
    >
      {/* <Skeleton isLoaded={loading} className="rounded-lg"> */}
        <img
          // src={`/src/assets/projects/${project.slug}/1.${project.extension}`}
          // alt={project.name}
          className="object-cover h-64 transition-opacity duration-500 bg-white rounded-md w-96 sm:w-60 sm:h-40"
          src="/src/assets/Cinema.png"
          />
      {/* </Skeleton> */}
      {/* <Skeleton isLoaded={loading} className="rounded-lg"> */}
        <span className="flex items-center justify-center w-full h-6 text-center truncate">
          {/* {project.name} */}
          Absolute Cinema
        </span>
      {/* </Skeleton> */}
    </Link>
  );
}