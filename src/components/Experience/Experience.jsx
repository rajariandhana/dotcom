import EducationCard from "./EducationCard";
import { useResume } from "../../hooks/resume";
import ExperienceCard from "./ExperienceCard";
import { Button, Skeleton } from "@heroui/react";
import { BsDownload } from "react-icons/bs";
import supabase from "../../libs/supabase/supabase";

export default function Experience() {
  const { data: resume, isPending } = useResume();

  const downloadCV = async () => {
    const file_name = "resume.pdf";
    const download_name = "Resume_Ralfazza Rajariandhana.pdf";

    try {
      const { data, error } = await supabase.storage
        .from("cv")
        .download(file_name);

      if (error) {
        console.log(error);
        return;
      }

      const url = window.URL.createObjectURL(data);

      const a = document.createElement("a");
      a.href = url;
      a.download = download_name;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  if (isPending || !resume.education)
    return (
      <>
        <section className="w-full">
          <div className="flex w-full justify-end">
            <Skeleton className="w-40 h-8 rounded-lg mb-2" />
          </div>
          <Skeleton className="w-40 h-6 rounded-lg mb-2" />
          <div className="flex flex-col gap-4 mb-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <EducationCard key={i} loading />
            ))}
          </div>
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
      <section className="flex w-full justify-end -mb-8">
        <Button
          variant="flat"
          endContent={<BsDownload />}
          color="primary"
          onPress={downloadCV}
        >
          Download my resume
        </Button>
      </section>
      <section className="w-full">
        <h2 className="mb-2 text-xl cursor-pointer">Education</h2>
        <div className="flex flex-col gap-4">
          {resume.education.map((edu) => (
            <EducationCard key={edu.key} education={edu} />
          ))}
        </div>
      </section>
      <section className="w-full">
        <h2 className="mb-2 text-xl cursor-pointer">Experience</h2>
        <div className="flex flex-col gap-4">
          {resume.experience.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </section>
    </>
  );
}
