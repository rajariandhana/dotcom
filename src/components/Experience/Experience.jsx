import { useEffect, useState } from "react";
import EducationCard from "./EducationCard";

export default function Experience() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEducation = async () => {
    // simulate delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const res = await fetch("/education.json");
      const data = await res.json();
      setEducation(data);
    } catch (err) {
      console.error("Error fetching education:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  return (
    <>
      <section className="w-full">
        <h2 className="mb-2 text-xl cursor-pointer">🎓 Where I study</h2>
        <div className="flex flex-col gap-4">
          {(loading ? Array.from({ length: 2 }) : education).map(
            (edu, index) => (
              <EducationCard
                key={edu?.slug || index}
                edu={edu || {}}
                loading={loading}
              />
            )
          )}
        </div>
      </section>
      <section className="w-full">
        <h2 className="mb-2 text-xl cursor-pointer">💼 What I've done</h2>
        <ul>
          <li className="w-full p-4 bg-white border border-gray-200 rounded-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            necessitatibus! Amet esse cupiditate saepe tenetur possimus qui ab?
            Mollitia, aut.
          </li>
        </ul>
      </section>
    </>
  );
}
