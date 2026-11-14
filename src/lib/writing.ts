import mediumData from "../../public/medium.json";

/**
 * My Medium articles, from public/medium.json, the same file the previous
 * site's home page read. Newest first, as listed there.
 *
 * `published_date` is a display date ("Nov 9, 2026"), or "coming-soon" for an
 * article that isn't out yet; those have no excerpt and link to my profile.
 */
export type Article = {
  title: string;
  published_date: string;
  paragraph: string;
  url: string;
};

export const articles: readonly Article[] = mediumData;

export const mediumProfile = "https://medium.com/@rajariandhana";

export const isComingSoon = (article: Article) => article.published_date === "coming-soon";
