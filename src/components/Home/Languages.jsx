import AppearSection from "../AppearSection";

// Wraps content in a link only when that language has one, so an unset URL
// degrades to plain content rather than an anchor that goes nowhere.
// `linkClassName` holds styling that only makes sense once it is a link.
function LanguageLink({
  language,
  label,
  className = "",
  linkClassName = "",
  children,
}) {
  if (!language.link) return <span className={className}>{children}</span>;

  return (
    <a
      href={language.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${className} ${linkClassName} transition-opacity hover:opacity-75`.trim()}
    >
      {children}
    </a>
  );
}

// Paste your Duolingo profile URL here to make the logo clickable.
// Leave it empty and the logo renders as a plain image, with no dead link.
const DUOLINGO_PROFILE_URL = "https://invite.duolingo.com/profile-share/Ralfazza?via=share_profile_qr";

export default function Languages() {
  const languages = [
		{
      label: "Indonesian",
      level: "Native speaker",
      score: null,
      logo: "/logo/indonesia.svg",
      logoAlt: "Flag of Indonesia",
    },
    {
      label: "English",
      level: "IELTS General",
      score: "Band 8.0",
      logo: "/logo/ielts.svg",
      logoAlt: "IELTS",
    },
    {
      label: "Japanese",
      level: "Duolingo Score",
      score: "99",
      logo: "/logo/duolingo.webp",
      logoAlt: "Duolingo",
      link: DUOLINGO_PROFILE_URL,
    },
  ];

  return (
    <AppearSection className="w-full">
      <h2 className="mb-2 text-xl cursor-pointer">
        I'm also learning human languages
      </h2>

      <ul className="grid gap-2 sm:grid-cols-3">
        {languages.map((language) => (
          <li
            key={language.label}
            className="flex flex-col gap-1 p-3 bg-white border border-gray-200 rounded-sm"
          >
            <span className="font-semibold">{language.label}</span>
            <span className="text-sm font-light flex items-center">
              <LanguageLink
                language={language}
                label={`${language.logoAlt} profile`}
                className="mr-2"
              >
                <img
                  src={language.logo}
                  alt={language.logoAlt}
                  className="rounded-lg size-10 ring-1 ring-gray-200"
                />
              </LanguageLink>
              {/* No aria-label here: the text is its own accessible name. */}
              <LanguageLink
                language={language}
                linkClassName="underline underline-offset-2 decoration-gray-300"
              >
                {language.level}
              </LanguageLink>
              {language.score && (
                <span className="font-semibold ml-1">{language.score}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </AppearSection>
  );
}
