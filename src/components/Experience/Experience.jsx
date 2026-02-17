import EducationCard from "./EducationCard";
import { useResume } from "../../hooks/resume";
import ExperienceCard from "./ExperienceCard";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@heroui/react";
import { FaAngleDown } from "react-icons/fa";
import supabase from "../../libs/supabase/supabase";

export default function Experience() {
  const { data: resume, isPending } = useResume();

  const downloadCV = async (contact) => {
    if (!["AU", "ID"].includes(contact)) {
      return;
    }
    const file_name = `${contact}.pdf`;
    try {
      const { data, error } = await supabase.storage
        .from("cv")
        .download(file_name, { download: "CV_Ralfazza Rajariandhana" });
      if (error) {
        console.log(error);
        return;
      }

      const url = window.URL.createObjectURL(data);

      const a = document.createElement("a");
      a.href = url;
      a.download = file_name;
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
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat" endContent={<FaAngleDown />} color="primary">
              Download My CV
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="CV Versions"
            onAction={(key) => downloadCV(key)}
          >
            <DropdownItem key="AU">With Australian contact</DropdownItem>
            <DropdownItem key="ID">With Indonesian contact</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </section>
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
