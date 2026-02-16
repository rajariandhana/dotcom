import EducationCard from "./EducationCard";
import { useResume } from "../../hooks/resume";
import { Spinner } from "@heroui/react";

export default function Experience() {
  const { data: resume, isPending } = useResume();

  if (isPending || !resume) return <Spinner />;

  return (
    <>
      <section className="w-full">
        <h2 className="mb-2 text-xl cursor-pointer">🎓 Where I study</h2>
        <div className="flex flex-col gap-4">
          {resume.education.map((edu) => (
            <EducationCard
              key={edu.key}
              education={edu}
            />
          ))}
        </div>
      </section>
      <section className="w-full">
        <h2 className="mb-2 text-xl cursor-pointer">💼 What I've done</h2>
        <ul>
          <li className="w-full p-4 bg-white border border-gray-200 rounded-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            necessitatibus! Amet esse cupiditate saepe tenetur possimus qui ab?
            Mollitia, aut.
          </li>
        </ul>
      </section>
    </>
  );
}
