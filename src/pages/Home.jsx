import Hero from "../components/Home/Hero";
import BestProjects from "../components/Home/BestProjects";
import BestPhotos from "../components/Home/BestPhotos";
import Skills from "../components/Home/Skills";

export const Home = () => {

  return (
    <>
      <Hero />
      {/* <div className="w-full p-4 bg-white border border-gray-200 rounded-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, necessitatibus! Amet esse cupiditate saepe tenetur possimus qui ab? Mollitia, aut.
      </div> */}
      {/* 
      gini kali ya, ada tab current tech stack, sama techs i used
      */}
      {/* <Skills/> */}
      <BestProjects />
      {/* <BestPhotos /> */}
    </>
  )
}
export default Home;