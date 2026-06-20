import { addToast } from "@heroui/react";

export function slugToTitle(slug) {
  if (!slug) return "";

  return slug
    .replace(/[-_]+/g, " ") // replace - and _ with spaces
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize words
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pasteFromClipboard = async () => {
  try {
    return await navigator.clipboard.readText();
  } catch (err) {
    console.error("Failed to paste:", err);
    return "";
  }
};
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    addToast({
      title: "Copied to clipboard",
      color: "success",
      variant: "flat",
    });
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};
