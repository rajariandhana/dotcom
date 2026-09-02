import { Image } from "@heroui/react";

export default function ExperienceCard({ experience }) {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-md flex flex-col">
      <div className="flex w-full justify-between gap-4">
        <div className="w-20">
          <Image
            src={experience.image_link}
            className="object-cover funny-rotate"
          />
        </div>
        <div className="flex w-full text-sm">
          <div className="flex flex-col w-full">
            <span className="text-lg font-semibold">{experience.position}</span>
            <a className="italic text-gray-500 hover:underline" href={experience.company_site} target="_blank">{experience.company}</a>
          </div>
          <div className="sm:flex flex-col w-full items-end hidden">
            <span className="mb-2">{experience.location}</span>
            <span className="italic">
              {experience.date}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full sm:hidden text-sm">
        <span>{experience.location}</span>
        <span className="italic">
          {experience.date}
        </span>
      </div>
      <ul className="list-disc m-2 sm:m-4 text-sm">
        {experience.description.map((desc) => (
          <li className="text-justify ml-2">{desc}</li>
        ))}
      </ul>
    </div>
  );
}
