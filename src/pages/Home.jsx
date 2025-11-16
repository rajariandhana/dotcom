import { addToast, Button } from "@heroui/react";
import instance from "../libs/axios/instance";
import { useQuery } from "@tanstack/react-query";

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
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      <Button
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
      </span>
    </>
  )
}
export default Home;