import EducationCard from "./EducationCard";
import { useResume } from "../../hooks/resume";
import { Spinner } from "@heroui/react";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
  const { data: resume, isPending } = useResume();

  if (isPending || !resume) return <Spinner />;

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
