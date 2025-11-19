import { Skeleton } from "@heroui/react";
import { Link } from "react-router";

export default function ProjectCard({ project, loading }) {
  const fakeImg = "/placeholder.png"; // optional

  const slug = project?.slug ?? "";
  const name = project?.name ?? "Loading...";

  return (
    <Link
      className="flex flex-col gap-2 p-2 bg-white border border-gray-200 w-fit h-fit funny-rotate rounded-xl"
      to={loading ? "#" : `/projects/${slug}`}
    >
      {loading ? (
        <>
          <Skeleton isLoaded={!loading} className="rounded-md">
            <img
              src={
                loading ? fakeImg : `/projects/${slug}/1.${project.extension}`
              }
              alt={name}
              className="object-cover transition-opacity duration-500 bg-white rounded-md h-52 w-96 sm:w-60 sm:h-40"
            />
          </Skeleton>

          <Skeleton isLoaded={!loading} className="rounded-md">
            <span className="flex items-center justify-center w-full h-6 text-center truncate">
              {name}
            </span>
          </Skeleton>
        </>
      ) : (
        <>
          <img
            src={loading ? fakeImg : `/projects/${slug}/1.${project.extension}`}
            alt={name}
            className="object-cover transition-opacity duration-500 bg-white rounded-md h-52 w-96 sm:w-60 sm:h-40"
          />

          <span className="flex items-center justify-center w-full h-6 text-center truncate">
            {name}
          </span>
        </>
      )}
    </Link>
  );
}
