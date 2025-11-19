import { Button, Chip, Image } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function ProjectDetail() {
  const project_slug = useParams().project_slug;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/projects.json");
      const data = await res.json();

      const filtered = data.filter((p) => p.slug === project_slug);
      const proj = filtered.length > 0 ? filtered[0] : null;
      setProject(proj);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (project) {
      console.log(
        "DETAIL PATH:",
        `/projects/${project?.slug}/1.${project?.extension}`
      );
    }
  }, [project]);

  return (
    <div className="flex flex-col w-96 sm:w-[600px]">
      <Link
        to={`/projects`}
        className="flex items-center w-full gap-2 mb-4 text-left hover:underline"
      >
        <svg
          className="flex w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m17 16-4-4 4-4m-6 8-4-4 4-4"
          />
        </svg>
        <span className="text-sm">Back to Projects</span>
      </Link>
      {project && (
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
          <p className="mb-2 text-lg">{project.description}</p>
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
