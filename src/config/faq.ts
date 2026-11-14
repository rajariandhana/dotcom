import { site } from "./site";

/**
 * Questions and answers for /faq, shown in this order.
 *
 * Answers are plain text with Markdown-style links: "[label](url)". Use a path
 * ("/tech-tree") for a page on this site, a full "https://…" address for
 * another site (opens in a new tab), or "mailto:…" for an email address.
 */
export type Faq = {
  question: string;
  answer: string;
};

export const faqs: readonly Faq[] = [
  {
    question: "Who are you?",
    answer:
      "I'm Ralfazza, a software engineer from Indonesia, currently based in Brisbane, Australia. I mostly do full-stack web development and make games on the side. You can find my studies and work on the [Experience](/experience) page.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Mostly TypeScript, React and Next.js on the front end, with Go or Node.js for creating APIs in the back end. The [Tech Tree](/tech-tree) shows everything I've worked with, grouped by category.",
  },
	{
    question: "How do you use AI?",
    answer:
      "I use AI every day to build faster, but I treat it as a tool, not a replacement. I review everything it writes and make sure the details are right before anything ships. Huge no to AI-generated images.",
  },
  {
    question: "Do you have rights to work in Australia?",
    answer: "Yes, I studied at [UQ](https://uq.edu.au) and then got the [Temporary Graduate Visa (Subclass 485)](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485) valid until August 2028. This Visa allows me to have full working rights with unlimited working hours.",
  },
  {
    question: "How was this website built?",
    answer:
      "With Next.js, TypeScript, Tailwind CSS and HeroUI, deployed on [Vercel](https://vercel.com). I used [Claude Code](https://claude.com/product/claude-code) to help with the rewrite. The [Website History](/history) page shows every version of the site so far.",
  },
  {
    question: "Can I see your code?",
    answer:
      "Yes! Most of my projects are public on [GitHub](https://github.com/rajariandhana), and the [Projects](/projects) page has write-ups for the bigger ones.",
  },
  {
    question: "Are you open to work or collaboration?",
    answer: `I'm always happy to hear about interesting projects. Send me an email at [${site.email}](mailto:${site.email}) or reach out on [LinkedIn](https://linkedin.com/in/rajariandhana).`,
  },
  {
    question: "Does this website collect my data?",
    answer:
      "No. There are no accounts, cookies or tracking. The [Privacy Policy](/privacy-policy) has the details.",
  },
];
