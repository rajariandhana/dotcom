import { Image, Link, Skeleton } from "@heroui/react";

export default function EducationCard({ education, loading }) {
  if (loading) {
    return (
      <>
        <div className="hidden w-full gap-4 p-4 bg-white border border-gray-200 rounded-md sm:flex">
          <Skeleton className="w-40 h-32 rounded-xl" />
          <div className="text-sm w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <Skeleton className="w-32 h-4 rounded-full" />
              <Skeleton className="w-20 h-3 rounded-full" />
            </div>
            <div className="flex items-center justify-between w-full mb-4 italic">
              <Skeleton className="w-40 h-3 rounded-full" />
              <Skeleton className="w-24 h-3 rounded-full" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <Skeleton className="w-[90%] h-3 rounded-full" />
              <Skeleton className="w-[80%] h-3 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2 p-4 bg-white border border-gray-200 rounded-md sm:hidden">
          <div className="flex justify-between w-full gap-0">
            <Skeleton className="w-20 h-20 rounded-xl" />
            <div className="flex flex-col items-end text-right gap-1">
              <Skeleton className="w-32 h-4 rounded-full" />
              <Skeleton className="w-32 h-3 rounded-full" />
              <Skeleton className="w-20 h-3 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="mb-2 text-sm italic text-gray-500">
              <Skeleton className="w-16 h-3 rounded-full" />
            </span>
            <div className="flex flex-col w-full gap-2">
              <Skeleton className="w-[90%] h-3 rounded-full" />
              <Skeleton className="w-[80%] h-3 rounded-full" />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="hidden w-full gap-4 p-4 bg-white border border-gray-200 rounded-md sm:flex">
        <div className="w-40">
          <Image
            src={education.image_link}
            alt={education.name}
            className="object-cover funny-rotate"
          />
        </div>
        <div className="text-sm w-fit">
          <div className="flex items-center justify-between w-full">
            <Link
              underline="hover"
              color="foreground"
              className="text-lg font-semibold "
              as="a"
              href={education.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {education.name}
            </Link>
            <span>{education.location}</span>
          </div>
          <div className="flex items-center justify-between w-full mb-2 italic">
            <span className="text-gray-500">{education.sub_title}</span>
            <span>{education.date}</span>
          </div>
          <p>{education.description}</p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 p-4 bg-white border border-gray-200 rounded-md sm:hidden">
        <div className="flex justify-between w-full gap-0">
          <div className="w-20">
            <Image
              src={education.image_link}
              alt={education.name}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-end text-right">
            <h3
              className="font-semibold "
              as="a"
              href={education.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {education.name}
            </h3>
            <span className="text-sm">{education.location}</span>
            <span className="text-sm italic ">{education.date}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="mb-1 text-sm italic text-gray-500">
            {education.sub_title}
          </span>
          <p className="text-sm sm:text-md">{education.description}</p>
        </div>
      </div>
    </>
  );
}
