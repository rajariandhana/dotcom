import resumeData from "../../public/resume.json";

/** public/resume.json, the same file the previous site's Experience page read. */
export type Education = {
  key: string;
  link: string;
  university: string;
  location: string;
  degree: string;
  gpa: string;
  date: string;
  coursework: string[];
};

export type Work = {
  company_key: string;
  company_site: string;
  company: string;
  position: string;
  date: string;
  location: string;
  description: string[];
};

export const education: readonly Education[] = resumeData.education;
export const work: readonly Work[] = resumeData.experience;

/** Logo for an organisation, served from public/experience/<key>.webp. */
export const logoPath = (key: string) => `/experience/${key}.webp`;

/** "January 2024 - June 2026" → "January 2024 – June 2026" (a proper range dash). */
export const formatRange = (date: string) => date.replace(/\s+-\s+/, " – ");
