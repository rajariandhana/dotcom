export function slugToTitle(slug) {
  if (!slug) return "";

  return slug
    .replace(/[-_]+/g, " ") // replace - and _ with spaces
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize words
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
