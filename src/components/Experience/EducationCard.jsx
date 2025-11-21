import { Image, Link, Skeleton } from "@heroui/react";

export default function EducationCard({ edu, loading }) {
  return (
    <>
      <div className="hidden w-full gap-4 p-4 bg-white border border-gray-200 rounded-md sm:flex">
        <div className="w-40">
          <Image
            src={`/logo/${edu.slug}.png`}
            alt={edu.name}
            className="object-cover"
          />
        </div>
        <div className="text-sm w-fit">
          <div className="flex items-center justify-between w-full">
            <Link
              underline="hover"
              color="foreground"
              className="text-lg font-semibold "
              as="a"
              href={edu.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {edu.name}
            </Link>
            <span>{edu.location}</span>
          </div>
          <div className="flex items-center justify-between w-full mb-2 italic">
            <span className="text-gray-500">{edu.sub_title}</span>
            <span>{edu.date}</span>
          </div>
          <p>{edu.description}</p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 p-4 bg-white border border-gray-200 rounded-md sm:hidden">
        <div className="flex justify-between w-full gap-0">
          <div className="w-20">
            <Image
              src={`/logo/${edu.slug}.png`}
              alt={edu.name}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-end text-right">
            <h3
              className="font-semibold "
              as="a"
              href={edu.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {edu.name}
            </h3>
            <span className="text-sm">{edu.location}</span>
            <span className="text-sm italic ">{edu.date}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="mb-1 text-sm italic text-gray-500">
            {edu.sub_title}
          </span>
          <p className="">{edu.description}</p>
        </div>
      </div>
    </>
  );
}
