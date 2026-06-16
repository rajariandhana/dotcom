import { Button, Chip, Link } from "@heroui/react";
import { LuExternalLink } from "react-icons/lu";

export default function MediumArticle({ article }) {
  const truncateWords = (text, limit) => {
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-md">
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">{article.title}</h3>
        <div className="flex items-center gap-4">
          {article.published_date === "coming-soon" ? (
            <Chip color="primary" variant="flat" size="sm">
              Coming Soon
            </Chip>
          ) : (
            <span className="text-sm text-neutral-500">
              {article.published_date}
            </span>
          )}
          <Link
            variant="ghost"
            radius="full"
            className="text-xs pb-1"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            underline="always"
            showAnchorIcon
          >
            read it here
          </Link>
        </div>
      </div>
      <p className="items-center">{truncateWords(article.paragraph, 40)}</p>
    </div>
  );
}
