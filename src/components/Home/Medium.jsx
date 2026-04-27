import { useEffect, useState } from "react";
import MediumArticle from "./MediumArticle";

export default function Medium() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchMediumArticles = async () => {
      const res = await fetch("/medium.json");
      const data = await res.json();
      setArticles(data);
    };

    fetchMediumArticles();
  }, []);

  return (
    <section className="w-full">
      <div>
        <h2 className="mb-2 text-xl cursor-pointer">
          📚 I have a blog on{" "}
          <a
            href="https://medium.com/@rajariandhana"
            target="_blank"
            className="underline"
          >
            Medium
          </a>
        </h2>
      </div>
      <div className="flex flex-col items-center justify-between w-full gap-2 lg:gap-4">
        {articles.map((article, index) => (
          <MediumArticle article={article} key={index} />
        ))}
      </div>
    </section>
  );
}
