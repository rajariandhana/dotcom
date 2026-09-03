import { Tooltip } from "@heroui/react";
import { useState } from "react";
import AppearSection from "../AppearSection";
import { Link } from "react-router";
import H2Drawably from "../H2Drawably";
import { DrawablyCircle } from "drawably/react";

export default function Skills() {
  const [hoveredTech, setHoveredTech] = useState();

  const arsenal = [
    {
      label: "TypeScript",
      icon: (
        <img
          className="size-8 object-contain"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
          alt=""
        />
      ),
      link: "https://www.typescriptlang.org/",
    },
    {
      label: "React.js",
      icon: (
        <img
          className="size-8 object-contain"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
          alt=""
        />
      ),
      link: "https://react.dev/",
    },
    {
      label: "Next.js",
      icon: (
        <img
          className="size-8 object-contain"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
          alt=""
        />
      ),
      link: "https://nextjs.org/",
    },
    {
      label: "TailwindCSS",
      icon: (
        <img
          className="size-8 object-contain"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
          alt=""
        />
      ),
      link: "https://tailwindcss.com/",
    },
    {
      label: "Express.js",
      icon: (
        <img
          className="size-8 object-contain"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
          alt=""
        />
      ),
      link: "https://expressjs.com/",
    },
    {
      label: "Supabase",
      icon: (
        <img
          className="size-8 object-contain"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg"
          alt=""
        />
      ),
      link: "https://supabase.com/",
    },
    {
      label: "Visual Studio Code",
      icon: (
        <img
          className="size-8 object-contain"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
          alt=""
        />
      ),
      link: "https://code.visualstudio.com/",
    },
    {
      label: "GitHub",
      icon: (
        <img
          className="size-8 object-contain"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
          alt=""
        />
      ),
      link: "https://github.com",
    },
    {
      label: "Vercel",
      icon: (
        <img
          className="size-8 object-contain"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg"
          alt=""
        />
      ),
      link: "https://vercel.com",
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
    <AppearSection className="w-full justify-center flex flex-col">
      {/* <H2Drawably label={"Technologies"} /> */}
      <h2 className="mb-2 text-xl cursor-pointer">Technologies</h2>

      <ul className="list-disc pl-4">
        <li>
          <h3 className="mb-1">Core technologies that I mainly use</h3>

          <div className="flex flex-wrap gap-3 p-2 w-fit h-fit rounded-sm">
            {arsenal.map((skill, index) => (
              <Tooltip
                key={skill.label}
                content={skill.label}
                showArrow
                placement="bottom"
								className="font-drawably"
              >
                <Link
                  to={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={skill.label}
                  className="size-12 flex items-center justify-center funny-rotate"
                  onMouseEnter={() => setHoveredTech(index)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onFocus={() => setHoveredTech(index)}
                  onBlur={() => setHoveredTech(null)}
                >
                  {hoveredTech === index ? (
                    <DrawablyCircle
                      style={{
                        "--drawably-stroke": "var(--color-red)",
                      }}
                    >
                      {skill.icon}
                    </DrawablyCircle>
                  ) : (
                    skill.icon
                  )}
                </Link>
              </Tooltip>
            ))}
          </div>
        </li>

        <li>
          <h3 className="mb-1">Full list of what I've used before</h3>

          <p className="p-2 bg-white border border-gray-200 rounded-sm text-sm text-justify">
            {allTechs.map((category, index) => (
              <span key={category.category}>
                <span className="font-semibold">{category.category}: </span>

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
        </li>
      </ul>
    </AppearSection>
  );
}
