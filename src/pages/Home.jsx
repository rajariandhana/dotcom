import { addToast, Button } from "@heroui/react";
import instance from "../libs/axios/instance";
import { useQuery } from "@tanstack/react-query";

import Hero from "../components/Home/Hero";
import BestProjects from "../components/Home/BestProjects";
import BestPhotos from "../components/Home/BestPhotos";

export const Home = () => {

  const fetchPing = async () => {
    try {
      const response = await instance.get("/ping");
      return response.data.meta.message;
      // return response.data.data;
    } catch (error) {
      console.error("Error fetching ping:", error);
    } finally {
      console.log("Fetch ping attempt finished.");
    }
  }

  const { data: pingData, isLoading } = useQuery({
    queryKey: ['ping'],
    queryFn: fetchPing,
  })

  return (
    <>
      <Hero />
      <div className="w-full p-4 bg-white border border-gray-200 rounded-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, necessitatibus! Amet esse cupiditate saepe tenetur possimus qui ab? Mollitia, aut.
      </div>
      <BestProjects />
      <BestPhotos />
      {/* <Button
        color="primary"
        onPress={() => {
          addToast({
            title: "Toast Title",
          });
        }}
      >
        Default
      </Button>
      <span>
        {isLoading ? "Loading..." : `Ping Response: ${JSON.stringify(pingData)}`}
      </span> */}
    </>
  )
}
export default Home;