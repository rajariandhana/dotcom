/**
 * Every technology I've used, carried over from the previous site's
 * "Technologies" section. The /tech-tree page grows one branch per category
 * (long categories are split over several branches) with a leaf per tech.
 *
 * Icons live in public/tech/<icon>.svg — mostly Devicon's "original" logos
 * (https://devicon.dev, MIT), plus the official marks for Gin, TanStack Query,
 * Gemini and Claude (via Lobe Icons) and Ollama.
 */

export type Tech = {
  name: string;
  /** File name in public/tech, without ".svg". */
  icon: string;
  url: string;
  /** One of the core tools I mainly use — drawn with an accent edge. */
  core?: boolean;
};

export type TechCategory = {
  name: string;
  techs: readonly Tech[];
};

export const techCategories: readonly TechCategory[] = [
  {
    name: "Languages",
    techs: [
      { name: "C", icon: "c", url: "https://en.cppreference.com/w/c" },
      { name: "C++", icon: "cplusplus", url: "https://isocpp.org/" },
      { name: "Python", icon: "python", url: "https://www.python.org/" },
      { name: "Java", icon: "java", url: "https://www.java.com/" },
      { name: "C#", icon: "csharp", url: "https://learn.microsoft.com/dotnet/csharp/" },
      { name: "Go", icon: "go", url: "https://go.dev/" },
      { name: "PHP", icon: "php", url: "https://www.php.net/" },
      { name: "HTML", icon: "html", url: "https://developer.mozilla.org/docs/Web/HTML" },
      { name: "CSS", icon: "css", url: "https://developer.mozilla.org/docs/Web/CSS" },
      { name: "JavaScript", icon: "javascript", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
      { name: "TypeScript", icon: "typescript", url: "https://www.typescriptlang.org/", core: true },
    ],
  },
  {
    name: "Frontend",
    techs: [
      { name: "React", icon: "react", url: "https://react.dev/", core: true },
      { name: "Next.js", icon: "nextjs", url: "https://nextjs.org/", core: true },
      { name: "TanStack Query", icon: "tanstack-query", url: "https://tanstack.com/query" },
      { name: "Tailwind CSS", icon: "tailwindcss", url: "https://tailwindcss.com/", core: true },
      { name: "Livewire", icon: "livewire", url: "https://livewire.laravel.com/" },
      { name: "Alpine.js", icon: "alpinejs", url: "https://alpinejs.dev/" },
      { name: "Bootstrap", icon: "bootstrap", url: "https://getbootstrap.com/" },
    ],
  },
  {
    name: "Backend",
    techs: [
      { name: "Express", icon: "express", url: "https://expressjs.com/", core: true },
      { name: "Node.js", icon: "nodejs", url: "https://nodejs.org/" },
      { name: "Laravel", icon: "laravel", url: "https://laravel.com/" },
      { name: "Gin", icon: "gin", url: "https://gin-gonic.com/" },
      { name: "FastAPI", icon: "fastapi", url: "https://fastapi.tiangolo.com/" },
    ],
  },
  {
    name: "Database",
    techs: [
      { name: "MongoDB", icon: "mongodb", url: "https://www.mongodb.com/" },
      { name: "Supabase", icon: "supabase", url: "https://supabase.com/", core: true },
      { name: "MySQL", icon: "mysql", url: "https://www.mysql.com/" },
      { name: "PostgreSQL", icon: "postgresql", url: "https://www.postgresql.org/" },
      { name: "SQLite", icon: "sqlite", url: "https://www.sqlite.org/" },
    ],
  },
  {
    name: "Tools",
    techs: [
      { name: "Visual Studio Code", icon: "vscode", url: "https://code.visualstudio.com/", core: true },
      { name: "GitHub", icon: "github", url: "https://github.com/", core: true },
      { name: "Vercel", icon: "vercel", url: "https://vercel.com/", core: true },
      { name: "Claude Code", icon: "claude-code", url: "https://claude.com/product/claude-code" },
      { name: "Figma", icon: "figma", url: "https://www.figma.com/" },
      { name: "Postman", icon: "postman", url: "https://www.postman.com/" },
    ],
  },
  {
    name: "Game Engine",
    techs: [
      { name: "Unity", icon: "unity", url: "https://unity.com/" },
      { name: "Godot", icon: "godot", url: "https://godotengine.org/" },
    ],
  },
  {
    name: "AI / LLM APIs",
    techs: [
      { name: "Gemini API", icon: "gemini", url: "https://ai.google.dev/" },
      { name: "Ollama", icon: "ollama", url: "https://ollama.com/" },
    ],
  },
];
