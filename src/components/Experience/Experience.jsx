import EducationCard from "./EducationCard";
import { useResume } from "../../hooks/resume";
import ExperienceCard from "./ExperienceCard";
import { Skeleton } from "@heroui/react";

export default function Experience() {
  const { data: resume, isPending } = useResume();

  if (isPending || !resume)
    return (
      <>
        <section className="w-full">
          <Skeleton className="w-40 h-6 rounded-lg mb-2" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <EducationCard key={i} loading />
            ))}
          </div>
        </section>
      </>
    );

  return (
    <>
      <section className="w-full">
        <h2 className="mb-2 text-xl cursor-pointer">🎓 Where I study</h2>
        <div className="flex flex-col gap-4">
          {resume.education.map((edu) => (
            <EducationCard key={edu.key} education={edu} />
          ))}
        </div>
      </section>
      <section className="w-full">
        <h2 className="mb-2 text-xl cursor-pointer">💼 What I've done</h2>
        <div className="flex flex-col gap-4">
          {resume.experience.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </section>
    </>
  );
}
