import Hero from "../components/Home/Hero";
import BestProjects from "../components/Home/BestProjects";
import BestPhotos from "../components/Home/BestPhotos";

export const Home = () => {

  return (
    <>
      <Hero />
      <div className="w-full p-4 bg-white border border-gray-200 rounded-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, necessitatibus! Amet esse cupiditate saepe tenetur possimus qui ab? Mollitia, aut.
      </div>
      <BestProjects />
      {/* <BestPhotos /> */}
    </>
  )
}
export default Home;