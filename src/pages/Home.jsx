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
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laudantium aperiam velit error accusantium aliquid quod voluptates, natus eaque iure ducimus quis aut quisquam? Dolorum porro ullam et qui in autem deleniti aliquid, vero vel obcaecati enim fuga necessitatibus provident numquam omnis quaerat dignissimos distinctio error sunt at corrupti. Quod odio voluptate, dolor ipsam, ipsum nisi temporibus illum voluptatem fuga reprehenderit cumque obcaecati officiis harum aliquid ex sunt deleniti. Sint nulla animi ab magnam nam? Ab eligendi harum dignissimos? Ipsam ut quos nam harum, excepturi maxime ea aliquid iusto quibusdam impedit sint distinctio libero earum atque obcaecati natus nesciunt nobis!</p>
      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laudantium aperiam velit error accusantium aliquid quod voluptates, natus eaque iure ducimus quis aut quisquam? Dolorum porro ullam et qui in autem deleniti aliquid, vero vel obcaecati enim fuga necessitatibus provident numquam omnis quaerat dignissimos distinctio error sunt at corrupti. Quod odio voluptate, dolor ipsam, ipsum nisi temporibus illum voluptatem fuga reprehenderit cumque obcaecati officiis harum aliquid ex sunt deleniti. Sint nulla animi ab magnam nam? Ab eligendi harum dignissimos? Ipsam ut quos nam harum, excepturi maxime ea aliquid iusto quibusdam impedit sint distinctio libero earum atque obcaecati natus nesciunt nobis!</p> */}
      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laudantium aperiam velit error accusantium aliquid quod voluptates, natus eaque iure ducimus quis aut quisquam? Dolorum porro ullam et qui in autem deleniti aliquid, vero vel obcaecati enim fuga necessitatibus provident numquam omnis quaerat dignissimos distinctio error sunt at corrupti. Quod odio voluptate, dolor ipsam, ipsum nisi temporibus illum voluptatem fuga reprehenderit cumque obcaecati officiis harum aliquid ex sunt deleniti. Sint nulla animi ab magnam nam? Ab eligendi harum dignissimos? Ipsam ut quos nam harum, excepturi maxime ea aliquid iusto quibusdam impedit sint distinctio libero earum atque obcaecati natus nesciunt nobis!</p> */}
    </>
  )
}
export default Home;