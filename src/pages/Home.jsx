import Hero from "../components/Home/Hero";
import BestProjects from "../components/Home/BestProjects";
import BestPhotos from "../components/Home/BestPhotos";
import Skills from "../components/Home/Skills";
import Medium from "../components/Home/Medium";
import { addToast } from "@heroui/react";
import { useEffect } from "react";
import { sleep } from "../utils/util";
import { Link } from "react-router";

export const Home = () => {
  const notifyBot = async () => {
    await sleep(10000);
    addToast({
      title: (
        <Link to={"/chatbot"} className="underline">
          Check out my chat bot here
        </Link>
      ),
    });
  };
  useEffect(() => {
    notifyBot();
  }, []);
  return (
    <>
      <Hero />
      {/* <div className="w-full p-4 bg-white border border-gray-200 rounded-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, necessitatibus! Amet esse cupiditate saepe tenetur possimus qui ab? Mollitia, aut.
      </div> */}
      {/* 
      gini kali ya, ada tab current tech stack, sama techs i used
      */}
      <BestProjects />
      <Skills />
      <Medium />
      {/* <BestPhotos /> */}
    </>
  );
};
export default Home;
