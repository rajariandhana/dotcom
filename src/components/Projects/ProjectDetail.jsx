import { Button, Chip, Image } from "@heroui/react";
import { FaAnglesLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import { useProject } from "../../hooks/projects";
import ProjectDetailSkeleton from "./ProjectDetailSkeleton";

export default function ProjectDetail() {
  const { project_slug } = useParams();

  const { data: project, isPending } = useProject(project_slug);

  return (
    <div className="flex flex-col w-96 sm:w-[600px]">
      <Link
        to={`/projects`}
        className="flex gap-2 items-center text-sm h-6 w-fit mb-4 hover:underline"
      >
        <FaAnglesLeft />
        <span>Back to Projects</span>
      </Link>
      {isPending ? (
        <ProjectDetailSkeleton />
      ) : (
        <>
          <h1 className="mb-1 text-2xl">{project?.name}</h1>
          <div className="flex mb-8 gap-x-1">
            {project.techs.map((tech) => (
              <Chip key={tech} variant="flat">
                {tech}
              </Chip>
            ))}
          </div>
          <Image
            isZoomed
            src={`/projects/${project?.slug}/1.${project?.extension}`}
            alt={project?.name}
            className="object-cover h-52 w-96 sm:w-[600px] sm:h-[400px] mb-8"
          />
          <p className="mb-2 text-lg text-justify">{project.description}</p>
          <div className="flex items-center justify-between w-full">
            {project.demo ? (
              <Button
                variant="solid"
                as="a"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Try here
              </Button>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}
