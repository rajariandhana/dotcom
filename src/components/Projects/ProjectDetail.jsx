import { Button, Chip, Image } from "@heroui/react";
import { Link, useParams } from "react-router";
import { useProject } from "../../hooks/projects";
import ProjectDetailSkeleton from "./ProjectDetailSkeleton";
import { LuExternalLink } from "react-icons/lu";

import { FaAngleLeft, FaAngleRight, FaAnglesLeft } from "react-icons/fa6";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useRef } from "react";

export default function ProjectDetail() {
  const { project_slug } = useParams();

  const { data: project, isPending } = useProject(project_slug);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="flex flex-col w-96 sm:w-[600px]">
      <Link
        to={`/projects`}
        className="flex gap-2 items-center text-sm h-6 w-fit mb-4 hover:underline text-primary"
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
              <Chip key={tech} variant="flat" color="primary">
                {tech}
              </Chip>
            ))}
          </div>
          <div className="relative w-full mb-6">
            <Button
              ref={prevRef}
              className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-50"
              isIconOnly
              radius="full"
            >
              <FaAngleLeft />
            </Button>

            <Button
              ref={nextRef}
              className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-50"
              isIconOnly
              radius="full"
            >
              <FaAngleRight />
            </Button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50">
              <div class="custom-pagination bg-white/50 text-sm rounded-full px-2 py-1 backdrop-blur-md"></div>
            </div>
            <Swiper
              pagination={{
                type: "fraction",
                el: ".custom-pagination",
              }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Pagination, Navigation]}
              className="h-full w-full"
              loop
            >
              {project.images.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center h-full">
                    <Image
                      // loading="lazy"
                      src={url}
                      alt={url}
                      className="object-cover h-52 w-96 sm:w-[600px] sm:h-[400px]"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <p className="mb-2 text-lg text-justify">{project.description}</p>
          <div className="flex items-center gap-2 w-full">
            {project.demo ? (
              <Button
                variant="solid"
                as="a"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                endContent={<LuExternalLink />}
              >
                Try here
              </Button>
            ) : (
              <></>
            )}
            {project.repo ? (
              <Button
                variant="ghost"
                as="a"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                endContent={<LuExternalLink />}
              >
                Repository
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
