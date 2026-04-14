import { Button, Tooltip } from "@heroui/react";

export default function Skills() {
  const arsenal = [
    {
      label: "React.js",
      icon: (
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
      ),
    },
    {
      label: "Next.js",
      icon: (
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
      ),
    },
    {
      label: "TailwindCSS",
      icon: (
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />
      ),
    },
    {
      label: "Express.js",
      icon: (
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" />
      ),
    },
    {
      label: "MongoDB",
      icon: (
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" />
      ),
    },
    {
      label: "Supabase",
      icon: (
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" />
      ),
    },
    {
      label: "GitHub",
      icon: (
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />
      ),
    },
    {
      label: "Visual Studio Code",
      icon: (
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />
      ),
    },
    {
      label: "Vercel",
      icon: (
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" />
      ),
    },
  ];

  const allTechs = [
    {
      category: "Languages",
      techs: [
        "C",
        "C++",
        "Python",
        "Java",
        "C#",
        "Go",
        "PHP",
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
      ],
    },
    {
      category: "Frontend",
      techs: [
        "React.js",
        "Next.JS",
        "TanStack Query",
        "TailwindCSS",
        "Livewire",
        "Alpine.js",
        "Bootstrap",
      ],
    },
    {
      category: "Backend",
      techs: ["Express.js", "Node.js", "Laravel", "Gin", "FastAPI"],
    },
    { category: "Game Engine", techs: ["Unity", "Godot"] },
    { category: "AI/LLM APIs", techs: ["Gemini API", "Ollama"] },
    {
      category: "Database",
      techs: ["MongoDB", "Supabase", "MySQL", "PostgreSQL", "SQLite"],
    },
    { category: "Tools", techs: ["Visual Studio Code", "GitHub", "Vercel"] },
  ];
  return (
    // <section className="flex flex-wrap w-full gap-4">
    //   {skillsCategory.map((category, index) => (
    //     <div
    //       key={index}
    //       className="flex flex-col gap-1 p-2 bg-white border border-gray-200 w-fit h-fit rounded-sm"
    //     >
    //       <h3 className="text-sm font-light">{category.category}</h3>
    //       <div className="flex gap-2">
    //         {category.skills.map((skill, index) => (
    //           <Tooltip key={index} content={skill.label} showArrow={true}>
    //             <Button isIconOnly variant="light" className="p-1 funny-rotate">
    //               {skill.icon}
    //             </Button>
    //           </Tooltip>
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </section>
    <section className="w-full">
      <h2 className="mb-2 text-xl cursor-pointer">
        🛠️ Current <span className="italic">"Tech Arsenal"</span>
      </h2>
      <div className="flex flex-wrap gap-2 p-2 bg-white border border-gray-200 w-fit h-fit rounded-sm">
        {arsenal.map((skill, index) => (
          <Tooltip key={index} content={skill.label} showArrow={true}>
            <Button isIconOnly variant="light" className="p-1 funny-rotate">
              {skill.icon}
            </Button>
          </Tooltip>
        ))}
      </div>
      <div>
        <h3>Full credit of what I've tried</h3>
        <p className="p-2 bg-white border border-gray-200 rounded-sm text-sm text-justify">
          {allTechs.map((category, index) => (
            <span key={category.category}>
              <span className="italic font-semibold">
                {category.category}:{" "}
              </span>
              {category.techs.map((tech, index) => (
                <span key={tech} className="font-light">
                  {tech}
                  {index !== category.techs.length - 1 && " · "}
                </span>
              ))}
              {index !== allTechs.length - 1 && " | "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
