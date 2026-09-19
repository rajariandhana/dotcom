import AppearSection from "../AppearSection";

export default function Languages() {
  const languages = [
    {
      label: "English",
      level: "IELTS General",
      score: "Band 8.0",
    },
    {
      label: "Indonesian",
      level: "Native speaker",
      score: null,
    },
    {
      label: "Japanese",
      level: "Duolingo Score",
      score: "99",
    },
  ];

  return (
    <AppearSection className="w-full">
      <h2 className="mb-2 text-xl cursor-pointer">Languages</h2>

      <ul className="grid gap-2 sm:grid-cols-3">
        {languages.map((language) => (
          <li
            key={language.label}
            className="flex flex-col gap-1 p-3 bg-white border border-gray-200 rounded-sm"
          >
            <span className="font-semibold">{language.label}</span>
            <span className="text-sm font-light text-gray-500">
              {language.level}
            </span>
            {language.score && (
              <span className="text-lg font-semibold">{language.score}</span>
            )}
          </li>
        ))}
      </ul>
    </AppearSection>
  );
}
